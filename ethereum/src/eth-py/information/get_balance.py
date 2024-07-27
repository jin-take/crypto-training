import os
from web3 import Web3
from dotenv import load_dotenv

def get_balance():
    load_dotenv()
    provider_url = os.getenv('ENDPOINT_TESTNET')
    address = os.getenv('PUBLIC_KEY_SENDER')

    web3 = Web3(Web3.HTTPProvider(provider_url))
    balance = web3.eth.get_balance(address)
    
    print(f"Balance: {web3.fromWei(balance, 'ether')} ETH")
