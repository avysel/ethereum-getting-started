#!/bin/bash

# network id is specific to you private network. All your nodes must use the same.

geth \
--datadir "./ethereum/ethereum-nodes/node2" \
--networkid 159999 \
--port 30302 \
--http.port 8546 \
--nodiscover \
console