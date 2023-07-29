// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";
contract nature is ERC721A {
    address public owner;
    uint256 public maxQuantity = 5;

    string baseUrl =
        "https://gateway.pinata.cloud/ipfs//QmcwoeU22iX8czWqPwFsUMCtJ3K6xM9gcR2Eu5e5Y6jgeW/";

    string public prompt = "nature is beauty";

    constructor() ERC721A("nature", "NTR") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action!");
        _;
    }

    function mint(uint256 quantity) external payable onlyOwner {
        require(
            totalSupply() + quantity <= maxQuantity,
            "You can not mint more than 5"
        );
        _mint(msg.sender, quantity);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUrl;
    }

    function promptDescription() external view returns (string memory) {
        return prompt;
    }
}
