# Build a DApp

> **DApp = Decentralized Application**

A Dapp is a webapp linked to a smart contract.

Users can read data from smart contract and update data by sending transaction using their blockchain account, through a wallet.

## De-cen-tra-li-zed !

As indicated in its name, a DApp is decentralized. It means that the business rules have to be in the smart contract deployed on the blockchain.

It also means that such an app is unstoppable. 

No Single Point Of Failure because it's deployed across all network nodes.

No administrator because the smart contract belongs to the network once deployed. So nobody can uninstall it.

We can develop a web interface to help users interacting with it. But this webapp should only be an easier way to call smart contract functions. No business code should be placed in it.

Actually, when exposing a smart contract, anyone should be able to develop he's own webapp to use it. Nothing should be different between using smart contract from a webapp or another webapp.


## Tools

- [Web3.js](https://web3js.readthedocs.io/en/v1.5.2/): the most commonly used Javascript framework to deal with smart contracts.