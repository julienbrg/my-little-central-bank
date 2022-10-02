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

  const [userAddr, setUserAddr] = useState<string>("")
  const [userShortenAddr, setShortenAddr] = useState<string>("")
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [etherscanLink, setEtherscanLink] = useState("");
  const [txHash, setTxHash] = useState("");
  const [net, setNet] = useState("");
  const [bal, setBal] = useState("");
  const [firstName, setFirstName] = useState("anon");
  const [pfp, setPfp] = useState(""); 

  return (
    <Router basename={'/'}>
      <Web3Context.Provider value={{
          userAddr, setUserAddr,
          userShortenAddr, setShortenAddr,
          web3auth, setWeb3auth,
          provider, setProvider,
          etherscanLink, setEtherscanLink,
          txHash, setTxHash,
          net, setNet,
          bal, setBal,
          firstName, setFirstName,
          pfp, setPfp
        }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/print" element={<Print />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </Web3Context.Provider> 

    </Router>
  );
}

export default Index;