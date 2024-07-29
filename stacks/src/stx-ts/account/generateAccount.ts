import {
    makeRandomPrivKey,
    privateKeyToString,
    getAddressFromPrivateKey,
    TransactionVersion,
    getPublicKey,
    StacksPrivateKey,
    StacksPublicKey,
    publicKeyToString,
} from "@stacks/transactions";
import { Buffer } from 'buffer';

const privateKey: StacksPrivateKey = makeRandomPrivKey();   // create private key
const publicKey: StacksPublicKey = getPublicKey(privateKey);    // create public key from above private key
const networkType: TransactionVersion = TransactionVersion.Testnet

// on testnet, create wallet address from private key
const stacksAddress: string = getAddressFromPrivateKey(
    privateKeyToString(privateKey),
    networkType     // You do not write this, if you generate address on mainnet
);

// show the address
console.log(`generated private key: ${privateKeyToString(privateKey)}`); // privateKey as string
console.log(`generated public key: ${publicKeyToString(publicKey)}`); // publicKey as string
console.log(`generated stacks address: ${stacksAddress}`); // stacks address
