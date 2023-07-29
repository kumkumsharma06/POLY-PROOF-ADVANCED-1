const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../artifacts/FXRootContractAbi.js");
const ABI = require("../artifacts/contracts/nature.sol/nature.json");
require("dotenv").config();

async function main() {
  const networkAddress ="https://ethereum-goerli.publicnode.com";
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);
  const wallet = new ethers.Wallet(privateKey, provider);
  const [signer] = await ethers.getSigners();

  const NFT = await ethers.getContractFactory("nature");
  const nft = await NFT.attach("0x705b7491b125BDbfd9b59207dD4fb457B243Ec9d");

  const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
  const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  const tokenIds = [0, 1, 2, 3, 4];

  const approveTx = await nft.connect(signer).setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log("Approval confirmed");

  for (let i = 0; i < tokenIds; i++) {
    const depositTx = await fxRoot.connect(signer).deposit(nft.address, wallet.address, tokenIds[i], "0x6566");
    await depositTx.wait();
  }
  console.log("Approved and deposited");

  const balance = await nft.balanceOf(wallet.address);
  console.log("NFT wallet balance",wallet.address,"is: ",balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });