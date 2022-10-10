import type { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";
// import nft from '../web3/Thistle.json';
import { abi } from "./euroABI"

export default class EthereumRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  async getChainId(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      // Get the connected Chain's ID
      const networkDetails = await ethersProvider.getNetwork();
      return networkDetails.chainId;
    } catch (error) {
      return error;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      // Get user's balance in ether
      const balance = ethers.utils.formatEther(
        await ethersProvider.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async getEuroBalance(): Promise<string> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      // Get user's balance in ether
      // const balance = ethers.utils.formatEther(
      //   await ethersProvider.getBalance(address) // Balance is in wei
      // );

      const contract = new ethers.Contract("0x9d97e33C38396aea20E1ee8B9A2362632048C9a8", abi, signer)
      const myEuroBalance = await contract.balanceOf(address)
      // console.log("myEuroBalance:", myEuroBalance)

      return ethers.utils.formatEther(myEuroBalance);
    
    } catch (error) {
      return error as string;
    }
  }

  async sendTransaction(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const recipient = "0x02bC12dAc51024f330fc79bFD651f66946aeF974";

      const amount = ethers.utils.parseEther("0.000001");

      // Submit transaction to the blockchain
      const tx = await signer.sendTransaction({
        to: recipient,
        value: amount,
      });

      // Wait for transaction to be mined
      await tx.wait();
      console.log("sendTransaction tx: ", tx)
      
      return tx;
    } catch (error) {
      return error as string;
    }
  }

  async signMessage() {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const originalMessage = "YOUR_MESSAGE";

      // Sign the message
      const signedMessage = await signer.signMessage(originalMessage);

      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error as string;
    }
  }

  async getFreeMoney(faucet:any, userAddress:any): Promise<any> {
    try {
      console.log("getFreeMoney start");
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = new ethers.Wallet( faucet, ethersProvider );
      const amount = ethers.utils.parseEther("0.007");

      const tx = await signer.sendTransaction({
        to: userAddress,
        value: amount,
      });

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      console.log("getFreeMoney tx:", tx)
      return receipt;
    } catch (error) {
      return error as string;
    }
  }

  async mint(amount:number): Promise<any> {

    try {

      // console.log("step 1")
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();

      const contract = new ethers.Contract("0x9d97e33C38396aea20E1ee8B9A2362632048C9a8", abi, signer)

      const amountToMint = ethers.utils.parseEther(String(amount))

      const tx = await contract.mint(address, amountToMint);

      // console.log("provider.waitForTransaction :" + contract.address);
      // console.log("step 2")

      await tx.wait(1)


      return tx;

    } catch (error:any) {
      console.log("An error occured during the minting process.")
      console.error(`${error.message} ${error.error}`);
      return null;
    }
  }

  async getEuroTotalSupply(): Promise<any> {

    try {

      // console.log("step 1")
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const contract = new ethers.Contract("0x9d97e33C38396aea20E1ee8B9A2362632048C9a8", abi, signer)

      const supply = await contract.totalSupply();
      console.log("supply:", supply )

      return ethers.utils.formatEther(supply);;

    } catch (error:any) {
      console.log("An error occured during the minting process.")
      console.error(`${error.message} ${error.error}`);
      return null;
    }
  }

  async giveBack(): Promise<any> {

    console.log("hello")


    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner(0);

      const recipient = "0xA3706F7954Ed73e85482784EC65175866c8f68Db";
      console.log("signer", signer.getAddress())
      console.log("recipient", recipient)

      const bal = ethers.utils.parseEther("0.02052")
      const expectedGasFees = ethers.utils.parseEther("0.00006")

      const amountRaw = Number(bal) - Number(expectedGasFees)
      console.log("amount:", amountRaw)

      const amount = ethers.utils.parseEther("0.0135")
      console.log("amount:", amount)

      // Submit transaction to the blockchain
      const tx = await signer.sendTransaction({
        to: recipient,
        value: amount,
        
      });

      // Wait for transaction to be mined
      await tx.wait();
      // console.log("giveBack tx: ", tx)
      
      return tx;
    } catch (error) {
      return error as string;
    }

  }


}