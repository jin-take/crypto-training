import { StacksTestnet } from '@stacks/network';
import {
    makeSTXTokenTransfer,
    broadcastTransaction,
    AnchorMode,
} from '@stacks/transactions';
import { BigNumber } from 'bignumber.js';

const API_URL: string = 'https://stacks-node-api.testnet.stacks.co';
const senderKey: string = '4b6094aeed2a0e57be6210f61e390118b426d34288ba2b151f92a9676ff50da801';
const recipient: string = 'STD03R5CVX6M54DGVTFZKKDZB7T39BFEJZDCY2WD';
const amountToSend: BigNumber = new BigNumber(5000);   // 送金額をここに。ただし、1 STX = 1,000,000 microstacksなので、マイクロスタックの単位で考える。
const network = new StacksTestnet();


async function createAndBroadcastTransaction() {
    try {
        // create transaction
        const txOptions = {
            recipient,
            amount: amountToSend.toString(),
            senderKey,
            network,
            anchorMode: AnchorMode.Any,
            memo: 'Test transaction',
        };
    
        // sign transaction
        const transaction = await makeSTXTokenTransfer(txOptions);
    
        // broadcast
        const broadcastResponse = await broadcastTransaction(transaction, network);
        console.log('broadcasting transaction response:', broadcastResponse);
        if (broadcastResponse.hasOwnProperty('error')) {
            throw new Error(`Transaction operation is FAILED:: ${broadcastResponse.error}`);
        }
        
        return broadcastResponse;
    } catch (error) {
        console.error('Transaction operation is FAILED:', error);
        throw error;
    }
}

// Use the function
createAndBroadcastTransaction()
    .then(response => console.log('=== broadcasting SUCCESS!! ===', response))
    .catch(error => console.error(error));
