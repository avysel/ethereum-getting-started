#!/bin/bash

# Init each node with genesis block file
geth init ethereum/genesis-node1.json --datadir="ethereum/ethereum-nodes/node1"

geth init ethereum/genesis-node2.json --datadir="ethereum/ethereum-nodes/node2"

geth init ethereum/genesis-node3.json --datadir="ethereum/ethereum-nodes/node3"