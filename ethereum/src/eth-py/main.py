import argparse
from information.get_balance import get_balance
from account.generate_address import generate_address
from transfer.transfer import transfer

def main():
    parser = argparse.ArgumentParser(description='eth-py command line tool')
    parser.add_argument('-t', '--type', required=True, choices=['information', 'account', 'transfer'])
    parser.add_argument('-p', '--process', required=True, choices=['get_balance', 'generate_address', 'transfer'])

    args = parser.parse_args()

    if args.type == 'information' and args.process == 'get_balance':
        get_balance()
    elif args.type == 'account' and args.process == 'generate_address':
        generate_address()
    elif args.type == 'transfer' and args.process == 'transfer':
        transfer()
    else:
        print("Invalid command")

if __name__ == "__main__":
    main()
