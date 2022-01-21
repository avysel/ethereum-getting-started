#!/bin/bash

# network id is specific to you private network. All your nodes must use the same.

geth \
--datadir "./ethereum/ethereum-nodes/node2" \
--networkid 159999 \
--http \
--http.port 8546 \
--http.addr localhost \
--ipcpath geth2.ipc \
--port 30302 \
--nodiscover \
console