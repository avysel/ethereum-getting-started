# Setup an Ethereum private network

We are going to see how set up a private Ethereum network with 3 nodes. We will learn how to manage an Ethereum node and deal with Ether (ETH), the Ethereum cryptocurrency.

The steps :
1. Install Geth (Ethereum client)
2. Create directories for all nodes' data
3. Create an Ethereum account for each node
4. Init each node with the same *genesis* data and provide initial crypto to our account
5. Start a node and check it
6. Connect our 3 nodes together
7. Send our first transactions

## Scripts

Some scripts and files are provided for all of it. Running them in the right order will create the network in a directory named `ethereum` at the root of the project directory. To start the project from scratch, juste remove this directory.

- Step 1: `1-install-geth.sh`

- Steps 2 & 3: `2-init-private-network.sh`

- Step 4: `3-update-genesis.txt` (manual operation as described in the file) and `4-init-nodes.sh`

- Step 5: `run-nodeX.sh`

- Step 6 and 7: manual commands as described bellow.

- `genesis.json` provides a template of genesis file that will be copied for each node, to be manually updated.

Or just follow instructions bellow.

--------

## 1) Install Ethereum (Geth client) (`1-install-geth.sh`)

```sh
# Install geth from repository

sudo add-apt-repository -y ppa:ethereum/ethereum

sudo apt-get update
sudo apt-get install ethereum
```

## 2) Create private Ethereum network (`2-init-private-network.sh`)

See official documentation: 

https://geth.ethereum.org/docs/getting-started/private-net

https://geth.ethereum.org/docs/interface/private-network



### a. Initialize the private network

We are going to create a private network with 3 nodes. First, we will create directories for nodes' data. Then we will create an account for each node.

The genesis template file will be copied in each nodes directories.

Have a look at you console, you'll be prompt to set password for all accounts. Keep these password in memory !

```sh
#!/bin/bash

# Create dir for ethereum files
mkdir ethereum

# Create directory for nodes data
mkdir ethereum/ethereum-nodes

# Create one directory for each node, to make them independant from each other
mkdir ethereum/ethereum-nodes/node1
mkdir ethereum/ethereum-nodes/node2
mkdir ethereum/ethereum-nodes/node3

# Creates a first Ethereum account for all nodes
echo "========== Create account for node 1 =========="
geth --datadir="ethereum/ethereum-nodes/node1" account new

echo "========== Create account for node 2 =========="
geth --datadir="ethereum/ethereum-nodes/node2" account new

echo "========== Create account for node 3 =========="
geth --datadir="ethereum/ethereum-nodes/node3" account new

# A file will be created in ethereum/ethereum-nodes/nodeX/keystore with account's address.
# Use this address in genesis.json file to init each node with it's first account ("alloc" field of genesis.json) and provide it initial ethers

```

### b. Update genesis with new accounts (`3-update-genesis.txt`)

Blockchain is composed of blocks that are strongly linked to each other. Any block is linked to the previous one thanks to hashing. The only block that does not follow that rule is, of course, the first block, called **genesis block**.

Our private network will start from a genesis block. We can define it in the `genesis.json` file.

We find a `genesis.json` file for each node. There is a common part, to set the same configuration for all of them. 
But each node will also start with an account provided with initial Ethers (ETH). We created these account in previous step. We can now set their initial balance in the genesis file.

Update ethereum/genesis.json with the given Ethereum accounts address provided by previous step.

1 - Go to ethereum-nodes/nodeX/keystore
2 - Open the file named "UTC-....."
3 - Copy the value of 'address' field
4 - Paste it in 'alloc' section of genesis.json, and provide it initial balance.

The initial Ether value is provided in Wei. 

1 Ether = 1 000 000 000 Gwei (10⁹ Gwei) = 1 000 000 000 000 000 000 Wei (10¹⁸ Wei)

Example: we have create 3 accounts and we want to initialize its balance with 100 Ethers.
```json
{
  "config": {
    "chainId": 15,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "ethash": {}
  },
  "difficulty": "1",
  "gasLimit": "8000000",
  "alloc": {
    "0x0f2496916364956674fA44efE2b35120c326af75": { "balance": "100000000000000000000" },
    "0x2B6C7ddD92Af855B54d157D41c895bB495d1d90E": { "balance": "100000000000000000000" },
    "0xE12d22A64F3F7bD8F7340BCD24Cb5666C53688a7": { "balance": "100000000000000000000" }    
  }
}
```

### c. Initialize nodes with their genesis (`4-init-nodes.sh`)

```sh
#!/bin/bash

# Init each node with genesis block file
geth init genesis.json --datadir="ethereum/ethereum-nodes/node1"

geth init genesis.json --datadir="ethereum/ethereum-nodes/node2"

geth init genesis.json --datadir="ethereum/ethereum-nodes/node3"
```

### d. Start the nodes (`run-nodeX.sh`)

Now we can use `geth` to run the 3 nodes.

The must have all 3 the same `networkid` to be able to be connected together.

Try to use a random big number, to avoid using an already taken number.
(A short list of already used networks id is available here: https://ethereum.stackexchange.com/questions/17051/how-to-select-a-network-id-or-is-there-a-list-of-network-ids)

Here's the command to rune the `node1`. Just change `datadir` and `(http.)port` to run the other nodes.


```sh
#!/bin/bash

geth \
--datadir "./ethereum/ethereum-nodes/node1" \
--networkid 159999 \
--http \
--http.port 8545 \
--http.addr localhost \
--http.api personal,eth,net,web3 \
--ipcpath geth.ipc \
--nodiscover \
--port 30301 \
--http.corsdomain "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn" \
--allow-insecure-unlock \
console
```

Mandatory parameters:
- `datadir` specifiy the directory of given node's data
- `networkid` is the id of network to connect to
- `port` is the running port for Geth process
- `http` to activate RPC endpoint
- `http.port` and `http.addr` is the RPC address:port, to be used by development tools to communicate with blockchain

Optional parameters:
- `http.api` to select which set of console api is available
- `ipcpath` to specify the name of IPC file
- `nodiscover` to make the node not discoverable by other networks'nodes
- `http.corsdomain` to allow Metamask brownser extension to connect to the node (to be updated with ths extensions id in you browser)
- `allow-insecure-unlock` in production, accounts are locked to avoir security weakness. For test purpose, we can turn off this lock
- `console` starts a console to manage the node (should always be the last parameter)

> **Warning 1:** All your nodes must have the same `networkid`
> At least on of your nodes must have the `http*` parameters to open RPC endpoint. Not mandatory for all nodes.
> `http.corsdomain` and `allow-insecure-unlock` are usefull only when RPC is open on the node.

> **Warning 2:** on Linux or Mac, the `.ipc` file, used to attach console, is created in each node's `datadir`, so there is no naming conflict.
> On Windows, the files are created in the same IPC pipe. So each node must set it's own IPC file name using `--ipcpath`. Or disable it's own IPC with `--ipcdisable`. If you don't do this, all nodes are going to use the same IPC name. It's going to abort because of naming conflict.

All options are described here: https://geth.ethereum.org/docs/interface/command-line-options

It is possible to run the node and the console in 2 separate terminals using the `attach` command: https://geth.ethereum.org/docs/interface/javascript-console


In the `scripts` example:
- Node 1 opens IPC on default `geth.ipc` because no `ipcpath` is defined.
- Node 2 opens IPC on `geth2.ipc` as set with `ipcpath`.
- Node 3 does not open IPC with `ipcdisable`.

### e. Check it !

To check if everything is ok, we can do some tests:

We can use some commands of the javascript node's console. (https://geth.ethereum.org/docs/interface/javascript-console)

Check that our first account is ok:
```
> eth.accounts
["0x849fc9517b8b35710357a90c4e2f57522f0d5485"]
```
Great, we get an array with all existing accounts. Only one for instance.


Get the balance of our first account:
```
> eth.getBalance("0x849fc9517b8b35710357a90c4e2f57522f0d5485")
100000000000000000000
```

Oops, it's in Wei. Let's convert it in Ether:
```
> web3.fromWei(eth.getBalance("0x849fc9517b8b35710357a90c4e2f57522f0d5485"))
100
```

So now, we have one or several nodes, with an account provided with some Ethers.

### f. Connect nodes together

Our 3 nodes are running separately for instance. We need to connect them to create a network.

On a node's console, run this:

```javascript
admin.nodeInfo.enode
```

We get the `enode`. The id and ip/port to connect to it. It looks like:
```javascript
enode://a725d853939231bc8c6befc959b634eefde0ba5e8bf7aa20c451bb4fe57710b25fea6cdd1281fa7801e9fbb005eb1e473a70e9fb9fb468165c60bf17e3b8e358@127.0.0.1:30301
```
Now, on other node's console :
```javascript
admin.addPeer("enode://a725d853939231bc8c6befc959b634eefde0ba5e8bf7aa20c451bb4fe57710b25fea6cdd1281fa7801e9fbb005eb1e473a70e9fb9fb468165c60bf17e3b8e358@127.0.0.1:30301")
```
That's it, the 2 other nodes are connected to the first one. Repeat the operation to create all connections you need.

To check that nodes are connected together, we can simply try to check the balance of the account initialized in the genesis of another node.

## 3) Use our network

### a. We need a miner

We can now use our network. First, we need to have a miner. Everything that will happen on the network will create transactions. We need a miner to validate the transactions and make their result to be applied.

We can have 1 or more miner, your call.

On the miner node's console:
```javascript
miner.start()
```

You will see the mining activity starting on logs. Buy the way, mining a block brings a reward to the miner.

We don't precise what is the account that will be used as miner account. By default, it will be the first created account.

This account's balance will then increase at every new mined block thanks to the mining rewards.

You can find the mining account with:

```javascript
eth.coinbase
```

And follow its enrichment:
```javascript
web3.fromWei(eth.getBalance(eth.coinbase))
```
> Miner will be mining new blocks continuously. When there are no transactions to validate, the blocks will be empty.

### b. Create a new account

We will create a second account:
```javascript
personal.newAccount()
```
We are prompted for the password, then the new account's address appears !

```javascript
> eth.accounts
["0x849fc9517b8b35710357a90c4e2f57522f0d5485", "0x5957cf50f748af5ef68bc777af8833ba5ab2a29b"]
```
Our 2 accounts are displayed.

### c. Send a transaction

We can now send 1 Ether from our first to our second account.

```javascript
eth.sendTransaction(
{
    from: '0x849fc9517b8b35710357a90c4e2f57522f0d5485',
    to: '0x5957cf50f748af5ef68bc777af8833ba5ab2a29b',
    value: '1000000000000000000'
});
```

Oh ! An error occured, asking us to unlock our account. Any new account has to be unlocked before being used to send transaction.

```javascript
personal.unlockAccount("0x849fc9517b8b35710357a90c4e2f57522f0d5485", "toto", 0)
```
2 possibilities for this call:
- Provide only account address as parameter. You will be prompted for the password, and the account will be unlocked for 300 seconds.
- Provide account address, password and duration (in seconds). The account will be unlocked for the given duration (set 0 for a permanent unlock).

Then it's unlocked. So we can try to send our transaction again.

```javascript
> eth.sendTransaction(
{
    from: '0x849fc9517b8b35710357a90c4e2f57522f0d5485',
    to: '0x5957cf50f748af5ef68bc777af8833ba5ab2a29b',
    value: '1000000000000000000'
});

0x2c96b84caae5f822a05cc5e319c57bd29266bc1ebf3a31c706e9f9963df38529
```

As result, we get an hexadecimal string that is the **transaction hash** (the identifier of the transaction). We can have a look on it: 


```javascript
> eth.getTransaction("0x2c96b84caae5f822a05cc5e319c57bd29266bc1ebf3a31c706e9f9963df38529")

{
  blockHash: "0x3f5565a49c1b40654015925eb22c375769c2152fd443956f279cb89f11ead225",
  blockNumber: 22,
  from: "0x849fc9517b8b35710357a90c4e2f57522f0d5485",
  gas: 21000,
  gasPrice: 1000000000,
  hash: "0x2c96b84caae5f822a05cc5e319c57bd29266bc1ebf3a31c706e9f9963df38529",
  input: "0x",
  nonce: 0,
  r: "0x9e9f7773f681a0026d328cbd92e6cbddfadacdbfc3ca009625c1dd7e8d2e7eb0",
  s: "0xe4aacb70c0321d2495d197e8d9a20592175afcb6f059e1ed897425fbf09d164",
  to: "0x5957cf50f748af5ef68bc777af8833ba5ab2a29b",
  transactionIndex: 0,
  type: "0x0",
  v: "0x41",
  value: 1000000000000000000
}
```

We have the detail of the transaction. If fields `blockHash` and `blockNumber` are undefined, it means that it has not been validated (mined) yet. Else, we can conclude that transaction was validated and applied. 

> When a user sends a transaction, it's sent to the whole network. So anyone can see it.
>
> Miners are competiting to create the next block. To do it, a miner selects some of the pending transactions, gather them in a block and try to create a block hash corresponding to the Proof of Work problem.
>
> When a block that respects PoW conditions has been created, the miner sends it to the network. All miners that were also working on the same block (block with the same number in the blockchain) stop their work and strart trying to mine the next block with other pendings transactions.
>
> All transactions that were included in the mined block are considerer as validated so their result is applied on every netwok nodes. For exemple, a transaction sending 2 ETH from A to B is in a block that a node received, it will automatically applied on his personal copy of the blockchain the new balances for A and B.

**All nodes on the network should now be able to see this transaction.**

Now check the new balances:

```javascript
> web3.fromWei(eth.getBalance("0x5957cf50f748af5ef68bc777af8833ba5ab2a29b"))
1
```

```javascript
> web3.fromWei(eth.getBalance("0x849fc9517b8b35710357a90c4e2f57522f0d5485"))
98.9999
```

Note that if an account has 100 ETH and sends 1 ETH to another account. The balance of the first account will not be 99 ETH, but something like 98.9999 ETH

This is because any transaction should pay some transaction fees to the miner that will validate it in a block. The sender pays it. So, sending 1 ETH will cost you a little more than 1 ETH.

The transactions fees are the **gas**. Any instruction to be executed in a transaction has a price expressed in gas. The cost of transaction is the sum of all instructions price.
And the sender can set a **gasPrice** to tel how much he can accept to pay for each gas unit.

As we can see on the previous transaction:
```javascript
  gas: 21000,
  gasPrice: 1000000000,
```

It means that our transaction costs 21000 gas and we accept to pay 1000000000 wei for 1 gas. So, the price of our transaction is 21000 * 1000000000 = 21000000000000 wei (0,000021 ETH).

When a transaction is mined in a block, the miner can keep the transactions fees as a reward for his work.

