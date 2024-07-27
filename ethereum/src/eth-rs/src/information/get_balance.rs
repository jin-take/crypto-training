use ethers::prelude::*;
use std::convert::TryFrom;
use dotenv::dotenv;
use std::env;

pub async fn get_balance() -> Result<(), Box<dyn std::error::Error>> {
    // .envファイルを読み込む
    dotenv().ok();

    // 環境変数からEthereumアドレスとプロバイダーURLを取得
    let address = env::var("PUBLIC_KEY_SENDER")?;
    let provider_url = env::var("ENDPOINT_TESTNET")?;
    let address = address.parse::<Address>()?;

    // プロバイダを作成し、残高を取得
    let provider = Provider::<Http>::try_from(provider_url)?;
    let balance = provider.get_balance(address, None).await?;
    
    // 残高を表示
    println!("Balance: {:?}", balance);
    Ok(())
}
