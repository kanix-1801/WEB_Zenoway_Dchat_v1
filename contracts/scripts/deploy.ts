import { ethers } from "hardhat";

async function main() {
  console.log("Deploying PostStorage contract...");

  const PostStorage = await ethers.getContractFactory("PostStorage");
  const postStorage = await PostStorage.deploy();

  await postStorage.waitForDeployment();

  const address = await postStorage.getAddress();
  console.log(`PostStorage deployed to: ${address}`);

  // Verify contract (optional)
  console.log("Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
    console.log("Contract verified successfully");
  } catch (error) {
    console.log("Verification failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});