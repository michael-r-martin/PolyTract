const hre = require("hardhat");

const ContractJson = require("../artifacts/contracts/Greeter.sol/Greeter.json");

const abi = ContractJson.abi;

async function main() {
    const alchemy = new hre.ethers.providers.AlchemyProvider(
        "maticmum",
        process.env.ALCHEMY_API_KEY
    );

    const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy);

    const Greeter = new hre.ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        abi,
        userWallet
    )

    const setTx2 = await Greeter.setGreeting("web3 is big!");
    await setTx2.wait();
    console.log("after:" + await Greeter.greet());
}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.error(err);
    process.exit(1);
});