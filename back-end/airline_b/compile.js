const path = require('path');
const fs   = require('fs');
const solc = require('solc');
const Web3 = require('web3'); // if web3 gives problem install specific version of it 

const helloPath = path.resolve(__dirname, 'contracts', 'AirlineConsortium.sol');
const source = fs.readFileSync(helloPath, 'UTF-8');
var contract={};
var accounts=[];
const address = '0x6b50010975258d39c0e89adac8c652582d54f4c2';

exports.compileAndConnect = async() =>{
	//console.log(solc.compile(source, 1)); //This is async task. removing console.log() will make the next things fail
	web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); //testprc from Ganache 
	if (typeof web3 !== 'undefined')
		web3.eth.defaultAccount = web3.eth.accounts[0];

	var myContract= web3.eth.contract([
	{
		"constant": false,
		"inputs": [],
		"name": "register",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "Airline",
				"type": "address"
			},
			{
				"name": "hashOfDetails",
				"type": "uint256"
			}
		],
		"name": "request",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "Airline",
				"type": "address"
			},
			{
				"name": "hashOfDetails",
				"type": "uint256"
			},
			{
				"name": "cost",
				"type": "uint256"
			}
		],
		"name": "response",
		"outputs": [
			{
				"name": "done",
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
				"name": "Airline",
				"type": "address"
			}
		],
		"name": "settlePayment",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "airlineAddress",
				"type": "address"
			}
		],
		"name": "unregister",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
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
				"name": "Airline",
				"type": "address"
			}
		],
		"name": "getAirlineEscrew",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "Airline",
				"type": "address"
			}
		],
		"name": "getAirlineStatus",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);
	console.log("Account[0]: "+web3.eth.accounts[0])
	contract = await myContract.at(address);
	return contract;
}