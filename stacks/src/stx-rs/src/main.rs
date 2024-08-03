use clap::{App, Arg};
use tokio::runtime::Runtime;

mod account;

fn main() {
    let matches = App::new("Stacks Tool")
        .version("1.0")
        .about("Generates Stacks addresses and fetches balances")
        .arg(
            Arg::new("type")
                .short('t')
                .long("type")
                .takes_value(true)
                .required(true)
                .about("Type of the operation (account)"),
        )
        .arg(
            Arg::new("process")
                .short('p')
                .long("process")
                .takes_value(true)
                .required(true)
                .about("Process to execute (generate_address, get_balance)"),
        )
        .get_matches();

    let operation_type = matches.value_of("type").unwrap();
    let process = matches.value_of("process").unwrap();

    if operation_type == "account" {
        if process == "generate_address" {
            account::generateAddress::generate_stacks_address();
        } else if process == "get_balance" {
            let address = "SP2C2MJ4TZP9G1HHWXGABTWX0SMM8WHB6GV6DR4JM"; // Replace with the desired address
            let rt = Runtime::new().unwrap();
            rt.block_on(async {
                match account::getBalance::get_stacks_balance(address).await {
                    Ok(balance) => println!("Balance: {}", balance),
                    Err(e) => eprintln!("Error fetching balance: {}", e),
                }
            });
        } else {
            eprintln!("Unknown process: {}", process);
        }
    } else {
        eprintln!("Unknown type: {}", operation_type);
    }
}
