'use strict';
const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// tạo keypair và nhập private key xuống dưới
const myKey = ec.keyFromPrivate(
  ''
);
// lưu địa chỉ của người dùng là public key
const myWalletAddress = myKey.getPublic('hex');

// tạo một đối tượng mới cho blockchain
const qCoin = new Blockchain();

// thực hiện đào với địa chỉ gửi về là khóa public
qCoin.minePendingTransactions(myWalletAddress);
console.log();
console.log(
  'Số dư trong ví của Quân là: ', qCoin.getBalanceOfAddress(myWalletAddress)
);


// thực hiện giao dịch gửi 100 coin đến address nào đó
console.log();
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.sign(myKey);
qCoin.addTransaction(tx1);

// tiếp tục đào kiếm thêm coin
console.log();
qCoin.minePendingTransactions(myWalletAddress);
console.log();
console.log(
  'Số dư trong ví của Quân là: ', qCoin.getBalanceOfAddress(myWalletAddress)
);