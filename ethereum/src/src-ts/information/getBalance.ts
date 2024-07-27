// Get balance information on testnet
import { ethers } from 'ethers';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// RPC Provider on Seploia testnet
const sepoliaProvider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');

async function getBalance(): Promise<void> {
    // const walletAddress:ethers.AddressLike = "<enter sender address here>";
    const walletAddress:ethers.AddressLike = process.env.PUBLIC_KEY_SENDER as string;;

    // Get Balance from wallet address
    const balance = await sepoliaProvider.getBalance(walletAddress);

    // Change from wei to ETH
    const balanceInEther = ethers.formatEther(balance);

    console.log(`Address: ${walletAddress}`)
    console.log(`ETH Balanace on Sepolia Testnet: ${balanceInEther} ETH`);
}

// Execute
getBalance();