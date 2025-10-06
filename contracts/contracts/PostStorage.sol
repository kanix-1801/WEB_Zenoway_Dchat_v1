// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PostStorage {
    struct Post {
        address author;
        string content;
        string ipfsHash;
        string arweaveId;
        uint256 timestamp;
        uint256 id;
    }

    mapping(uint256 => Post) public posts;
    uint256 public postCount;
    
    event PostCreated(
        uint256 indexed id,
        address indexed author,
        string content,
        string ipfsHash,
        string arweaveId,
        uint256 timestamp
    );

    function createPost(
        string memory _content,
        string memory _ipfsHash,
        string memory _arweaveId
    ) public {
        require(bytes(_content).length > 0, "Content cannot be empty");
        
        postCount++;
        posts[postCount] = Post(
            msg.sender,
            _content,
            _ipfsHash,
            _arweaveId,
            block.timestamp,
            postCount
        );

        emit PostCreated(
            postCount,
            msg.sender,
            _content,
            _ipfsHash,
            _arweaveId,
            block.timestamp
        );
    }

    function getPost(uint256 _id) public view returns (
        address author,
        string memory content,
        string memory ipfsHash,
        string memory arweaveId,
        uint256 timestamp
    ) {
        require(_id > 0 && _id <= postCount, "Post does not exist");
        Post memory post = posts[_id];
        return (
            post.author,
            post.content,
            post.ipfsHash,
            post.arweaveId,
            post.timestamp
        );
    }

    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](postCount);
        for (uint256 i = 1; i <= postCount; i++) {
            allPosts[i - 1] = posts[i];
        }
        return allPosts;
    }
}