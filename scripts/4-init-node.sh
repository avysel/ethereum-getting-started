#!/bin/bash

# Init each node with genesis block file
geth init genesis.json --datadir="ethereum/ethereum-nodes/node1"

geth init genesis.json --datadir="ethereum/ethereum-nodes/node2"

geth init genesis.json --datadir="ethereum/ethereum-nodes/node3"