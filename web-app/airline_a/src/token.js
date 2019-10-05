import web3 from './web3';

const ADDRESS = "0x59d6fcc1e418b0122c21f0bbd4559ce65226743c";
const ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "addDeposit",
		"outputs": [
			{
				"name": "depositSuccess",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_productID",
				"type": "uint256"
			},
			{
				"name": "_seller",
				"type": "address"
			},
			{
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "buyProduct",
		"outputs": [
			{
				"name": "purchaseSuccess",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "registerUser",
		"outputs": [
			{
				"name": "registerSuccess",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "unregisterUser",
		"outputs": [
			{
				"name": "unregisterSuccess",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "viewBalance",
		"outputs": [
			{
				"name": "myBalance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

var myContract = web3.eth.contract(ABI);
const contract = myContract.at(ADDRESS);
export default contract;