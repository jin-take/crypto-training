import { ethers } from "ethers";
import dotenv from 'dotenv';
import path from "path";
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// setting values
const privateKey = process.env.PRIVATE_KEY_SENDER as string;
const validatorPublicKey = process.env.PUBLIC_KEY_VALIDATOR as string;
const amountInEther = '10'; // 10 Sepolia ETH

// Endpoint: Sepolia testnet
const sepoliaRpcUrl = process.env.RPC_TESTNET_URL;

async function main() {
    // setting provider
    const provider = new ethers.JsonRpcProvider(sepoliaRpcUrl)
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(wallet)

    // transaction infomration
    const tx = {
        to: validatorPublicKey,
        value: amountInEther
    };

    try {
        // send transaction
        const transaction = await wallet.sendTransaction(tx);
        console.log('Transaction hash:', transaction.hash);

        // wait to complete sent transaction
        const receipt = await transaction.wait();
        console.log('Transaction was mined in block:', receipt?.blockNumber);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

main();
