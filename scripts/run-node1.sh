#!/bin/bash

# network id is specific to you private network. All your nodes must use the same.

geth \
--datadir "./ethereum/ethereum-nodes/node1" \
--networkid 159999 \
--http.port 8545 \
--http \
--http.addr localhost \
--http.api personal,eth,net,web3 \
--nodiscover \
--port 30301 \
--http.corsdomain "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn" \
--allow-insecure-unlock \
console




