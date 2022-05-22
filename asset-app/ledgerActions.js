const helper = require('./helper');
const path = require('path');
const { Gateway, Wallets } = require('fabric-network');

const walletPath = path.join(__dirname, 'wallet');

const channelName = 'channel1';
const chaincodeName = 'basic';

const org1UserId = 'org1UserId';


async function main() {
    try {
        const ccp = helper.buildCCPOrg1();

        const wallet = await helper.buildWallet(Wallets, walletPath);

        const gateway = new Gateway();

        await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: { enabled: true, asLocalhost: true }
        });

        const network = await gateway.getNetwork(channelName);

        const contract = network.getContract(chaincodeName);

        console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');

        console.log('*** Result: committed');

        let args = process.argv
        if (args[2] === 'GetAllAssets') {
            let result = await contract.evaluateTransaction('GetAllAssets');
            console.log(helper.prettyJSONString(result.toString()));

        } else if (args[2] === 'ReadAsset') {
            let asset = args[3];
            let result = await contract.evaluateTransaction('ReadAsset', asset);
            console.log(helper.prettyJSONString(result.toString()));
        } else if (args[2] === 'CreateAsset') {
            let r = await contract.submitTransaction('CreateAsset', 'asset101', 'violet', '5', 'Snnorre 3', '1300');
            console.log(" -> Committed: ", r.toString());

        } else {
            console.error("Bad command: ", args[2]);
        }

        gateway.disconnect();

    } catch (error) {
        console.log(error);
    }
};

main();