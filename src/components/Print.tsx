/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect } from "react";
import RPC from "../web3/ethersRPC";
import loader from './loader.svg';

import {
  PlasmicPrint,
  DefaultPrintProps
} from "./plasmic/my_little_central_bank/PlasmicPrint";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import { useGlobalContext } from '../web3/Web3Context';

export interface PrintProps extends DefaultPrintProps {}

function Print_(props: PrintProps, ref: HTMLElementRefOf<"div">) {

  const { 
    provider
  } = useGlobalContext()

  const [amount, setAmount] = useState<any>(0)
  const [euroBalance, setEuroBalance] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getEuroBalance();
  }, [provider, euroBalance]);

  const print = async () => {

    console.log("minting...")

    setLoading(true)

    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);

    const receipt = await rpc.mint(amount);
    console.log("your tx: ", receipt)

    await getEuroBalance()
    setLoading(false)

  }

  const getEuroBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getEuroBalance();
    const rounded = Number(balance).toFixed(2)
    setEuroBalance(Number(rounded))
    console.log("getEuroBalance done")
  };
 
  return <PlasmicPrint root={{ ref }} {...props} 
  
    textBox={{
      props: {
        children: "Your wallet is currently holding " + euroBalance + " EUR."
      }
    }}

    amountInput={{
      props: {
        onChange: (value) => setAmount(value.target.value)
      }
    }}
    
    print={{
      props: {
        children: (loading ? <img style = {{maxHeight:26}} alt = "loader" src={loader} /> : "Print"),
        onClick: () => print()
      },
    }}

    msgBox={{
      props: {
        children: ""
      }
    }}

  />;
}

const Print = React.forwardRef(Print_);
export default Print;
