import Web3 from 'web3';
//const Web3 = require('web3');
console.log("in Web3.js")
var web3 = new Web3();

//if (typeof web3 !== 'undefined') {
console.log('Web3 found');
web3 = new Web3(web3.currentProvider);
//web3.eth.defaultAccount = web3.eth.accounts[0];
//  } else {
//     console.error('web3 was undefined');
//  }
export default web3;