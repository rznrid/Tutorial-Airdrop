const {
 Connection,
 PublicKey,
 clusterApiUrl,
 Keypair,
 LAMPORTS_PER_SOL,
 Transaction,
 Account,
} = require("@solana/web3.js");

// Step 1 - Generating new keypair
const newPair = new Keypair();
console.log(newPair);

// Step 2 : Storing public and private key

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey


//test the actual app


const getWalletBalance = async () => {
    try{
        // creates a connection to get balance
        const connection = new Connection (clusterApiUrl("devnet"),"confirmed");

        // Create a wallet object from key
        const myWallet = await Keypair.fromSecretKey(secretKey);

        // querying the balance from the wallet
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(`Wallet Balance: ${walletBalance}`);
        console.log(`=> For Wallet Address ${publicKey}`);
        console.log(`Wallet Balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL} SOL`);
    }catch(err) {
        console.log(err);
    }
};

const airDropSol = async () => {
    try{
    const connection = new Connection (clusterApiUrl("devnet"),"confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);

    const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(walletKeyPair.publicKey), 2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);

    }catch(err) {
        console.log(err);
    }
};

const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}
driverFunction();