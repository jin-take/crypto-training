package information

import (
	"context"
	"fmt"
	"log"
	"math"
	"math/big"
	"os"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/joho/godotenv"
)

func GetBalance() {
	fmt.Println("Execute Get Balance Information Processing")
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	// Endpoint: Sepolia testnet
	client, err := ethclient.Dial("https://rpc.sepolia.org")
	if err != nil {
		log.Fatalf("Failed to connect to the Ethereum client: %v", err)
	}

	// address
	addressStr := os.Getenv("PUBLIC_KEY_SENDER")
	if addressStr == "" {
		log.Fatalf("PUBLIC_KEY_SENDER environment variable not set")
	}

	address := common.HexToAddress(addressStr)
	balance, err := client.BalanceAt(context.Background(), address, nil)
	if err != nil {
		log.Fatalf("Failed to retrieve the balance: %v", err)
	}

	// 残高をETHに変換（WeiからEtherに変換）
	ethValue := new(big.Float).SetInt(balance)
	ethValue = new(big.Float).Quo(ethValue, big.NewFloat(math.Pow10(18)))

	fmt.Printf("Balance: %s ETH\n", ethValue.Text('f', 18))
}
