// generate address
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

// generate puclic key(address) and private key
function generateEthereumAddress() {
  const wallet = ethers.Wallet.createRandom();

  console.log(`public key (address): ${wallet.address}`);
  console.log(`private key: ${wallet.privateKey}`);   

  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

// create .env.testnet file
function createEnvFile(publicKey: string, privateKey: string) {
  const envContent = `PUBLIC_KEY='${publicKey}'\nPRIVATE_KEY='${privateKey}'\n`;
  const fileName = '.env.testnet'
  const envPath = path.join("./", fileName);

  fs.writeFileSync(envPath, envContent, { encoding: 'utf8', flag: 'w' });
  console.log("==============================================");
  console.log(`${fileName} file created with keys information`);
}


function main() {
  // Execute function to generate Ethereum address
  const newAddress = generateEthereumAddress();
  // Create the .env file and keep keys information
  createEnvFile(newAddress.address, newAddress.privateKey);
}

main()


