#!/bin/bash

# network id is specific to you private network. All your nodes must use the same.

geth \
--datadir "./ethereum/ethereum-nodes/node1" \
--networkid 159999 \
--port 30301 \
--http.port 80801 \
console