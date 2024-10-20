const { network, web3 } = require("hardhat");
const { abi } = require("../artifacts/contracts/PERC20Sample.sol/PERC20Sample.json");
const { SwisstronikPlugin } = require("@swisstronik/web3-plugin-swisstronik");

async function main() {
    web3.registerPlugin(new SwisstronikPlugin(network.config.url));
    const contractAddress = "0x3b4472BA566608E2aD479A0F4F691018DF2bD0E5";
    const [from] = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(abi, contractAddress);
    const mint100TokensTx = await contract.methods.mint().send({ from });
    console.log("Transaction hash:", mint100TokensTx.transactionHash);
    console.log("Transaction submitted! Transaction details:", mint100TokensTx);
    console.log(`Transaction completed successfully! ✅  Tokens minted to ${from}`);
    console.log("Transaction hash:", mint100TokensTx.transactionHash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});