// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

contract Hello {

    string private name;

    constructor() {
        name = "nobody";
    }

    function setName(string memory newName) public {
        name = newName;
    }

    function getName() public view returns (string memory) {
        return name;
    }

}