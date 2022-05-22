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

