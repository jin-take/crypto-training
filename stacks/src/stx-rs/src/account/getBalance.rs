use reqwest::Error;
use serde::Deserialize;

#[derive(Deserialize)]
struct BalanceResponse {
    balance: String,
}

pub async fn get_stacks_balance(address: &str) -> Result<String, Error> {
    let url = format!("https://stacks-node-api.mainnet.stacks.co/v1/address/{}/balances", address);
    let response = reqwest::get(&url).await?;

    if response.status().is_success() {
        let balance_response: BalanceResponse = response.json().await?;
        Ok(balance_response.balance)
    } else {
        Err(reqwest::Error::new(reqwest::StatusCode::INTERNAL_SERVER_ERROR, "Failed to get balance"))
    }
}
