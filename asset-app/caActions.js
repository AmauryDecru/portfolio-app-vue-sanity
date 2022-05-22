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
