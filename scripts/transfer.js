const { network, web3 } = require("hardhat");
const { abi } = require("../artifacts/contracts/PERC20Sample.sol/PERC20Sample.json");
const { SwisstronikPlugin } = require("@swisstronik/web3-plugin-swisstronik");

async function main() {
    web3.registerPlugin(new SwisstronikPlugin(network.config.url));
    const contractAddress = "0x3b4472BA566608E2aD479A0F4F691018DF2bD0E5";
    const recipient_wallet_address = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";
    const send_amount = 1 * 10 ** 18;
    const [from] = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(abi, contractAddress);
    const transfer_TokensTx = await contract.methods.transfer(recipient_wallet_address, send_amount).send({ from });
    console.log("Transaction hash:", transfer_TokensTx.transactionHash);
    console.log("Transaction submitted! Transaction details:", transfer_TokensTx);
    console.log(`Transaction completed successfully! ✅  Token transferred to ${recipient_wallet_address}`);
    console.log("Transaction hash:", transfer_TokensTx.transactionHash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});