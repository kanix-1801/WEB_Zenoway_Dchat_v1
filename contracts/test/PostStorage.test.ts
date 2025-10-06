import { expect } from "chai";
import { ethers } from "hardhat";
import { PostStorage } from "../typechain-types";

describe("PostStorage", function () {
  let postStorage: PostStorage;

  beforeEach(async function () {
    const PostStorage = await ethers.getContractFactory("PostStorage");
    postStorage = await PostStorage.deploy();
    await postStorage.waitForDeployment();
  });

  it("Should create a post", async function () {
    const [owner] = await ethers.getSigners();
    
    await expect(
      postStorage.createPost("Hello World", "QmHash123", "ArweaveId456")
    ).to.emit(postStorage, "PostCreated");

    const post = await postStorage.getPost(1);
    expect(post.content).to.equal("Hello World");
    expect(post.ipfsHash).to.equal("QmHash123");
  });

  it("Should get all posts", async function () {
    await postStorage.createPost("First post", "hash1", "id1");
    await postStorage.createPost("Second post", "hash2", "id2");

    const allPosts = await postStorage.getAllPosts();
    expect(allPosts.length).to.equal(2);
    expect(allPosts[0].content).to.equal("First post");
  });
});