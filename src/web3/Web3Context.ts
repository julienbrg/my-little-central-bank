import { useContext, createContext } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { SafeEventEmitterProvider } from "@web3auth/base";

export type GlobalContent = {
    
    
    web3auth: Web3Auth | null
    setWeb3auth:(c: Web3Auth | null) => void
    provider: SafeEventEmitterProvider | null
    setProvider:(c: SafeEventEmitterProvider | null) => void
    userAddress: string
    setUserAddress:(c: string) => void
    bal: number
    setBal:(c: number) => void
    userShortenAddr: string
    setShortenAddr:(c: string) => void
    totalSupply: number
    setTotalSupply:(c: number) => void
    // etherscanLink: string
    // setEtherscanLink:(c: string) => void
    // txHash: string
    // setTxHash:(c: string) => void
    // net: string
    // setNet:(c: string) => void
    // firstName: string
    // setFirstName:(c: string) => void
    // pfp: string
    // setPfp:(c: string) => void
}
  
export const Web3Context = createContext<GlobalContent>({
    web3auth: null, 
    setWeb3auth: () => {},
    provider: null, 
    setProvider: () => {},
    userAddress: "",
    setUserAddress: () => {},
    bal: 0,
    setBal: () => {},
    totalSupply: 0,
    setTotalSupply: () => {},
    // etherscanLink: "",
    // setEtherscanLink: () => {},
    userShortenAddr: "", 
    setShortenAddr: () => {},
    // txHash: "",
    // setTxHash: () => {},
    // net: "",
    // setNet: () => {},
    // firstName: "",
    // setFirstName: () => {},
    // pfp: "",
    // setPfp: () => {}
})
  
export const useGlobalContext = () => useContext(Web3Context)
