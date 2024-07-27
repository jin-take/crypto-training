// transfer

import { ethers } from "ethers";
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

// Case: From .env file 
const senderPrivateKey = process.env.PRIVATE_KEY_SENDER as string;
const recipientAddress = process.env.PUBLIC_KEY_RECIPIENT as string;

// RPC Provider on Sepolia testnet
const sepoliaProvider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');

async function sendEth() {
    // Initialize provider and wallet
    const wallet = new ethers.Wallet(senderPrivateKey, sepoliaProvider);

    // Create transaction (recipient address and amount to send)
    const tx = {
        to: recipientAddress,
        value: ethers.parseEther("0.05") 
    };

    // Send transaction
    const txResponse = await wallet.sendTransaction(tx);
    console.log('Transaction hash:', txResponse.hash);

    // Confirm that the transaction has been mined
    const receipt = await txResponse.wait();
    console.log('Details of the successful transaction:', receipt);
}

sendEth();
