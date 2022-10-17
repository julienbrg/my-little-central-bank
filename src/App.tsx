// import React from "react";
import Homepage from "./components/Homepage";
import Print from "./components/Print";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useState } from "react";
import { Web3Context } from './web3/Web3Context'
import { Web3Auth } from "@web3auth/web3auth";
import { SafeEventEmitterProvider } from "@web3auth/base";

function Index() {

  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [userAddress, setUserAddress] = useState<string>("")
  const [bal, setBal] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<number>(0);

  const [userShortenAddr, setShortenAddr] = useState<string>("")
  const [etherscanLink, setEtherscanLink] = useState("");
  // const [txHash, setTxHash] = useState("");
  // const [net, setNet] = useState("");
  // const [firstName, setFirstName] = useState("anon");
  // const [pfp, setPfp] = useState(loader); 

  return (

    <Web3Context.Provider value={{
      web3auth, setWeb3auth,
      provider, setProvider,
      userAddress, setUserAddress,
      bal, setBal,
      userShortenAddr, setShortenAddr,
      totalSupply, setTotalSupply,
      etherscanLink, setEtherscanLink,
      // txHash, setTxHash,
      // net, setNet,
      // firstName, setFirstName,
      // pfp, setPfp
    }}>
      <Router basename={'/'}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/print" element={<Print />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </Web3Context.Provider>
  );
}

export default Index;