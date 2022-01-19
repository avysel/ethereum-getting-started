# Plug local private network accounts to Metamask

[Metamask](https://metamask.io/) is a cryptocurency wallet. It's used as a browser extension.

It will be used to manager user's address and private key, in order to send transactions on behalf of user but also to identify user by it's address in browser.

Then, any web app linked to the blockchain can call smart contracts for a given user, if he grants access.

Metamask will also be used to manage accounts and cretae transactions in a more friendly way than in node's console.

To import accounts created in a private Ethereum network, read the [official documentation](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account) or read bellow.

## 1. Ethereum accounts
When creating an account on an Ethereum node with `geth account new` or `personel.createAccount()`, a private key and a public key are created. Then, user account's address is derivated from public key.

Private key are stored in files in the node's directory: `NODE_DATADIR/keystore`.

The address is the user identifier on blockchain. It's also the user "bank account number" to receive cryptocurrencies.

Private key is the secret the user needs to prove he owns the given address. It's the only way to claim property of assets and be able to use or transfer it.

In an Ethereum console, the private key is protected by a password provided by user when created account.

## 2. Install Metamask

First, [download Metamask](https://metamask.io/download.html) extension for your browser.

Then open Metamask. When using it the first time, a first account will be created. To protect this account a **12 or 24 words passphrase** will be given. This passphrase is the only way to generate account's private key.
If you want to really use this account, be sure to write down this passphrase on a paper (not in a file on computer, many malwares are looking for this pattern of data to steel accounts and their cryptocurrencies).

## 3. Load accounts in Metamask

Open Metamask, then click on the colored circle on top right.

You have the list of all available accounts.

Bellow this list, click on "Import account".

In **type of account** select **JSON file**. Then select the file of account in node `DATADIR/keystore`, enter the password you typed when you create the account, and confirm.

It'll take several minutes. Browser may prompt you many time to know if you want to wait of abort.

Once imported, this account appears in accounts list with a tag "imported".

## 4. Use accounts