const path = require("path");
const fs = require("fs");

exports.buildCCPOrg1 = function()
{
    const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations',
        'peerOrganizations', 'org1.example.com', 'connection-org1.json');

    const fileExists = fs.existsSync(ccpPath);
    if(!fileExists)
    {
        throw new Error("Cannot find: ${ccpPath}");
    }

    const contents = fs.readFileSync(ccpPath, 'utf-8');

    const ccp = JSON.parse(contents);

    console.log("Loaded network config from: ${ccpPath}");

    return ccp;
}

exports.buildCCPOrg2 = function()
{
    const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations',
        'peerOrganizations', 'org2.example.com', 'connection-org2.json');

    const fileExists = fs.existsSync(ccpPath);
    if(!fileExists)
    {
        throw new Error("Cannot find: ${ccpPath}");
    }

    const contents = fs.readFileSync(ccpPath, 'utf8');

    const ccp = JSON.parse(contents);

    console.log("Loaded network config from: ${ccpPath}");

    return ccp;
}

exports.buildWallet = async function(Wallets, walletPath)
{
    let wallet;

    if(walletPath)
    {
        wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log('Built wallet from ${walletPath}');
    }
    else
    {
        wallet = await Wallets.newInMemoryWallet();
        console.log("Built in-memory wallet");
    }

    return wallet;
}

exports.prettyJSONString = function (inputString)
{
    return JSON.stringify(JSON.parse(inputString), null, 2);
}