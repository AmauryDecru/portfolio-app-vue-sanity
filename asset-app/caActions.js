const path = require('path');
const helper = require('./helper');

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');

const adminUserId = 'admin';
const adminUserPasswd = 'adminpw';

const walletPath = path.join(__dirname, 'wallet');

function buildCAClient(FabricCACServices, ccp, caHostName)
{
    const caInfo = ccp.certificateAuthorities[caHostName];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const caClient = new FabricCACServices(caInfo.url, {
        trustedRoots: caTLSCACerts, verify: false
    }, caInfo.caName);

    console.log("Built a CA client named: ${caInfo.caName}");
    return caClient;
}

async function enrollAdmin(caClient, wallet, orgMspId)
{
    try
    {
        const identity = await wallet.get(adminUserId);
        if(identity)
        {
            console.log('An identity for admin already exists');
            return;
        }
        const enrollment = await caClient.enroll({
            enrollmentID: adminUserId,
            enrollmentSecret: adminUserPasswd
        });

        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes()
            },
            mspId: orgMspId,
            type: 'X.509'
        };

        await wallet.put(adminUserId, x509Identity);
    }
    catch(error)
    {
        console.log('Failed to enroll admin: ${error}');
    }
}

async function registerAndEnrollUser(caClient, wallet, orgMspId, userId, affiliation){
    try {
        const userIdentity = await wallet.get(userId);
        if (userIdentity) {
            console.log(`An identity for the user ${userId} already exists in the wallet`);
            return;
        }

        const adminIdentity = await wallet.get(adminUserId);
        if (!adminIdentity) {
            console.log('An identity for the admin user does not exist in the wallet');
            console.log('Enroll the admin user before retrying');
            return;
        }

        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, adminUserId);

        const secret = await caClient.register({
            enrollmentID: userId,
            role: 'client'
        }, adminUser);
        const enrollment = await caClient.enroll({
            enrollmentID: userId,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: orgMspId,
            type: 'X.509',
        };
        await wallet.put(userId, x509Identity);
        console.log(`Successfully registered and enrolled user ${userId} and imported it into the wallet`);
    } catch (error) {
        console.error(`Failed to register user : ${error}`);
    }
}

async function getAdmin() {
    let ccp = helper.buildCCPOrg1();

    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

    const wallet = await helper.buildWallet(Wallets, walletPath);

    await enrollAdmin(caClient, wallet, 'Org1Msp');
}

async function getUser(org1UserId)
{
    let ccp = helper.buildCCPOrg1()

    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

    const wallet = await helper.buildWallet(Wallets, walletPath);

    await registerAndEnrollUser(caClient, wallet, 'Org1MSP', org1UserId, 'org1.department');
}