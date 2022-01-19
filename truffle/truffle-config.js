const HDWalletProvider = require("@truffle/hdwallet-provider");
const MNEMONIC = '';
const INFURA_API_KEY = '';
const FROM_ADDRESS = '';

module.exports = {

  networks: {
    node1: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "159999"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/"+INFURA_API_KEY)
      },
      from: FROM_ADDRESS,
      network_id: 3,
      gas: 4000000   //make sure this gas allocation isn't over 4M, which is the max
    },
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "1234"
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)

    }
  }

};
