package main

import (
	// internal package
	"eth-go/account"
	"eth-go/information"
	"eth-go/staking"
	"eth-go/transfer"

	"flag"
	"fmt"
	"os"
)

func main() {
	// command example: go run main.go -t <directory-name> -p <function-name>
	var execType string
	var process string

	// options
	flag.StringVar(&execType, "t", "", "Type of execution: enter directory-name")
	flag.StringVar(&process, "p", "", "Process to execute: enter function-name")

	flag.Parse()

	// function
	switch execType {
	case "account":
		switch process {
		case "generateAddress":
			account.GenerateAddress()
		default:
			fmt.Printf("Unknown process: %s for type: %s\n", process, execType)
			os.Exit(1)
		}
	case "information":
		switch process {
		case "get_balance":
			information.GetBalance()
		default:
			fmt.Printf("Unknown process: %s for type: %s\n", process, execType)
			os.Exit(1)
		}
	case "staking":
		switch process {
		case "stake":
			staking.Stake()
		case "unstake":
			staking.Unstake()
		default:
			fmt.Printf("Unknown process: %s for type: %s\n", process, execType)
			os.Exit(1)
		}
	case "transfer":
		switch process {
		case "transfer":
			transfer.Transfer()
		default:
			fmt.Printf("Unknown process: %s for type: %s\n", process, execType)
			os.Exit(1)
		}
	default:
		fmt.Printf("Unknown type: %s\n", execType)
		os.Exit(1)
	}
}
