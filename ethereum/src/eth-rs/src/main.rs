mod information;
mod account;
mod transfer;

use information::get_balance::get_balance;
use account::generate_address::generate_address;
use transfer::transfer::transfer;

use clap::{Parser, ValueEnum};

#[derive(Parser)]
#[clap(name = "eth-rs")]
struct Cli {
    #[clap(short, long, value_enum)]
    type_: Type, // `type` is a reserved keyword, so we use `type_`
    #[clap(short, long)]
    process: String,
}

#[derive(Copy, Clone, PartialEq, Eq, ValueEnum)]
enum Type {
    Information,
    Account,
    Staking,
    Transfer,
}

/**
 * commnad example:
 * cargo run -- --type <folder-name> --process <function-name>
 * (alias) cargo run -- -t <folder-name> -p <function-name>
 */
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();

    let result = match (cli.type_, cli.process.as_str()) {
        (Type::Information, "get_balance") => get_balance().await,
        (Type::Account, "generate_address") => generate_address().await,
        (Type::Transfer, "transfer") => transfer().await,
        _ => {
            eprintln!("Invalid command");
            return Ok(());
        }
    };

    if let Err(e) = result {
        eprintln!("Error: {}", e);
    } else {
        println!("Execution completed successfully.");
    }

    Ok(())
}
