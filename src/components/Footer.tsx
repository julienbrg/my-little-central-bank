/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useEffect } from "react";

import {
  PlasmicFooter,
  DefaultFooterProps
} from "./plasmic/my_little_central_bank/PlasmicFooter";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import { useGlobalContext } from '../web3/Web3Context';
import RPC from "../web3/ethersRPC";

export interface FooterProps extends DefaultFooterProps {
  // text?:string
}

function Footer_(props: FooterProps, ref: HTMLElementRefOf<"div">) {

  const { 
    // web3auth, setWeb3auth,
    provider,
    // setUserAddress,
    // setBal,
    // userShortenAddr, setShortenAddr,
    totalSupply, setTotalSupply,
    // etherscanLink, setEtherscanLink,
    // txHash, setTxHash,
    // net, setNet,
    // firstName, setFirstName,
    // pfp, setPfp
  } = useGlobalContext()

  useEffect(() => {
    getEuroTotalSupply();
  }, [provider, totalSupply]);

  // getEuroTotalSupply

  const getEuroTotalSupply = async () => {
    if (!provider) {
      console.log(" [footer // getEuroTotalSupply] provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const supply = await rpc.getEuroTotalSupply();
    const rounded = Number(supply).toFixed(2)
    setTotalSupply(Number(rounded))
    console.log("getEuroTotalSupply done")
  };

  return <PlasmicFooter root={{ ref }} {...props} 

    supplyBox={{
        
      props: {
        children: totalSupply
      }
    }}

    

  />;
}

const Footer = React.forwardRef(Footer_);
export default Footer;
