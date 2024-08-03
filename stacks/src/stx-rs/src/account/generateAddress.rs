use bitcoin::util::key::PrivateKey;
use bitcoin::network::constants::Network;
use bitcoin::util::address::Address;
use bitcoin::secp256k1::Secp256k1;
use hex::encode;

pub fn generate_stacks_address() {
    // Initialize Secp256k1 context
    let secp = Secp256k1::new();

    // Generate a random private key
    let (private_key, _) = PrivateKey::new(&secp, Network::Bitcoin);

    // Get the WIF format of the private key
    let wif = private_key.to_wif();
    println!("Private Key (WIF): {}", wif);

    // Get the public key
    let public_key = private_key.public_key(&secp);

    // Get the compressed format of the public key
    let pubkey_compressed = public_key.to_bytes();
    println!("Public Key (Compressed): {}", encode(pubkey_compressed.clone()));

    // Generate the Stacks address
    let stacks_address = Address::p2pkh(&public_key, Network::Bitcoin);
    println!("Stacks Address: {}", stacks_address);
}
