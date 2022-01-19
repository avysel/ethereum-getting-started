# First steps with Ethereum smart contracts

## Tools

- [Truffle](https://trufflesuite.com/index.html): to test and deploy smart contracts
- [Ganache](https://trufflesuite.com/ganache/): an Ethereum blockchain simulator for smart contract development.
- [Remix](https://remix.ethereum.org/): online smart contract IDE. Allows to write, test and deploy smart contracts.
- [Metamask](https://metamask.io/): browser extension to manage accounts from any Ethereum network
- [Cryptozombies](https://cryptozombies.io/): online tool to learn Solidity by developping a small game.
- [Solidity documentation](https://docs.soliditylang.org/en/latest/)


## Build with Truffle

Truffle is a Javascript command line tool used to compile, test and deploy smart contracts.

### 1. Install and init Truffle: 

https://trufflesuite.com/docs/truffle/quickstart.html

```
npm install -g truffle
```

```
truffle init
```

Some directories are created:
- contracts/:  for smart contracts
- migrations/: deployment files
- test/: test files
- truffle-config.js: Truffle configuration file


### 2. Configure Truffle to used the network you want: 

https://trufflesuite.com/docs/truffle/reference/configuration


To use our `node1`:

```javascripr
module.exports = {

  networks: {
    node1: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "159999"
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11"
    }
  }

};
```

Use `--allow-insecure-unlock` with your Geth command to allow accounts of your local node to be unlocked event when RCP is activated on your node.

###  3. Create a deployment file for you contract (Migration file): 

https://trufflesuite.com/docs/truffle/getting-started/running-migrations.html

To deploy our Hello contracts, create a file `2_Hello_migration.js` in `migrations`:

```javascript
const Hello = artifacts.require("Hello");

module.exports = function (deployer) {
  deployer.deploy(Hello);
};

```

###  4. Write smart contract and compile: 

https://trufflesuite.com/docs/truffle/getting-started/compiling-contracts.html

```
truffle compile
```

### 5. Test your smart contract: 

https://trufflesuite.com/docs/truffle/testing/testing-your-contracts.html

### 6. Deploy on blockchain: 

https://trufflesuite.com/docs/truffle/getting-started/running-migrations.html

To deploy or countract on `node1`:

```javascript
truffle migrate --network node1
```


Look for `contract address` in the result output.


## Build with Remix

Remix is an online IDE to develop and deploy smart contracts.

Easier to deploy, but not as strong as Truffle to create build process.

http://remix.ethereum.org/