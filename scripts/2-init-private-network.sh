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