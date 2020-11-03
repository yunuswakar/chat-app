
const fs = require('fs');

let contractABI =     [{"constant":true,"inputs":[{"name":"_fromUserId","type":"string"}],"name":"getAllDetails","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_fromUserId","type":"string"}],"name":"getDetails","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fromUserId","type":"string"},{"name":"_transactionId","type":"string"}],"name":"setDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fromUserId","type":"string"},{"name":"_toUserId","type":"string"},{"name":"_amount","type":"string"},{"name":"_msg","type":"string"},{"name":"_transactionId","type":"string"}],"name":"setAllDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
// const contractABI = JSON.parse(detail, 'utf-8');
var web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/1c7b730f883e44f39134bc8a680efb9f'));
// var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'));

contractAddress = '0x033d734b3A7004cfEd4Eaec53754E2Af65fbe457'

//contract = new web3.eth.Contract(contractABI, contractAddress);

//gasPrice=web3.utils.toHex(60000000);
//gasLimit=web3.utils.toHex(410000);

//from address - 0x6c5f8879eab4e73b92cc4bc89d364c381cb69145
module.exports = {

    web3:web3,
    //contract : contract,
    contractAddress: contractAddress,
    contractABI: contractABI,
  //  gasPrice : gasPrice,
  //  gasLimit : gasLimit
};




