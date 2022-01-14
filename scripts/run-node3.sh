#!/bin/bash

# network id is specific to you private network. All your nodes must use the same.

geth \
--datadir "./ethereum/ethereum-nodes/node3" \
--networkid 159999 \
--port 30303 \
--http.port 8547 \
--nodiscover \
console