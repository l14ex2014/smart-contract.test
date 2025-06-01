const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RewardDistribution", function () {
  let rewardContract, owner, whale, user;

  beforeEach(async () => {
    [owner, whale, user] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("RewardDistribution");
    rewardContract = await Contract.deploy();
    await rewardContract.deployed();
  });

  it("should assign 2x shares to Whale tier holders", async () => {
    await rewardContract.setNFTTier(whale.address, 2); // 2 = WHALE_TIER
    await rewardContract.deposit({ value: ethers.utils.parseEther("10") });
    const share = await rewardContract.calculateReward(whale.address);
    expect(share).to.be.above(ethers.utils.parseEther("1.5"));
  });

  it("should auto-compound 20% of rewards", async () => {
    await rewardContract.setNFTTier(user.address, 1);
    await rewardContract.deposit({ value: ethers.utils.parseEther("5") });
    const dist = await rewardContract.getDistribution(user.address);
    expect(dist.autoCompound).to.be.closeTo(ethers.utils.parseEther("1"), 1e15);
  });
});
