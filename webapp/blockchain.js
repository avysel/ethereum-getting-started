const contractAddress = "0xb44ba588af5140cbd07a19a584fa4ae4ab1083cd"; // On Ropsten testnet
const abi = contractDefinition.abi; // Contract ABI (Application Binary Interface, the smart contract methods definition)
let contract; // The object that will be the contract, after loading

/**
* Init connections and display data when page is loaded.
*/
window.addEventListener('load', async() => {
    /* Create connection to blockchain */
    initWeb3();

    /* Load the contract */
    loadContract();
    
    /* Display data read from blockchain */
    displayBlockchainInfo();

    /* Display data from smart contract */
    displayName();
});

/**
* Create a Web3 object to connect to blockchain
*/
async function initWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
        ethereum.autoRefreshOnNetworkChange = true;
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            //await ethereum.enable();
            await window.ethereum.send('eth_requestAccounts');
            console.log("Ethereum enabled with account : "+ethereum.selectedAddress);
        } catch (error) {
            console.error("Access denied for metamask by user");
        }

        // refresh page on account change
        ethereum.on("accountsChanged", (accounts) => { document.location.reload(true); });

    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    console.log("web3 : "+web3.version);
}

/**
* Retrieve and basic info from blockchain node
*/
async function displayBlockchainInfo() {
    $('#web3Version').text(web3.version);
    $('#nodeInfo').text(await web3.eth.getNodeInfo());
    $('#blockNumber').text(await web3.eth.getBlockNumber());

    web3.eth.getAccounts()
    .then( async (accounts) => {

        let account = accounts[0];
        console.log("Account : "+account);
        $('#account').text(account);

        let balance = await web3.eth.getBalance(account);
        let balanceInEth = web3.utils.fromWei(balance);
        console.log("Balance : "+balanceInEth);
        $('#balance').text(balanceInEth);
    })
    .catch( (error) => {
        console.error("Error getting accounts : "+error);
    });

}

/**
* Init the contract objects
*/
async function loadContract() {
    if(contractAddress) {
        console.log("Load contract at : "+contractAddress);
        try {
            contract =  new web3.eth.Contract(abi, contractAddress);
        }
        catch(error) {
            console.error("Error loading contract : "+error);
        }
    }
}

/**
 * Read data from smart contract
 */
async function displayName() {

	contract.methods.getName().call()
	.then( (name) => {
			$('#name').text("Hello "+name);
		}
	)
	.catch( (error) => {
		console.error("Error reading name : "+error);
	});
}

/**
 * Call smart contract function to update name
 */
async function updateName() {

    // Get name from form
    const newName = $("#nameInput").val();
	console.log("Set new name : "+newName);

    // Get connected account from Metamask, to be the transaction sender
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];

	// First, estimate gas cost
	contract.methods.setName(newName).estimateGas({from: account})
	.then( (gasAmount) => {

		console.log("Estimated gas : "+gasAmount);

		// Then, send a transaction to setName using previously estimated gas amount
		contract.methods.setName(newName).send({from: account, gas: gasAmount})
        .on('sending', (payload) => {
            console.log("Sending: "+JSON.stringify(payload));
        })
        .on('sent', (payload) => {
            console.log("Sent: "+JSON.stringify(payload));
        })
		.on('transactionHash', (hash) => {
            // When transaction is created, we get the hash
			console.log("Tx created "+hash);
			$('#txLink').html("<a target='_blank' href='https://ropsten.etherscan.io/tx/"+hash+"'>"+hash+"</a>");
		})
		.on('receipt', (receipt) => {
            // When transaction is validated, we get the receipt
			console.log("Tx validated in block "+receipt.blockNumber);
            displayName();
		})
		.on('confirmation', (confirmationNumber, receipt) => {
            // For each confirmation (new bloc upon the tx's block)
			console.log("New confirmation "+confirmationNumber);
		})
		.on('error',(error) => {
			console.error("Error : "+error);
		});

	})
	.catch((error) => {console.error(error);});
}