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
    provider,
    setTotalSupply,
    bal, setBal
  } = useGlobalContext()

  const [amount, setAmount] = useState<any>(0)
  const [euroBalance, setEuroBalance] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>("")

  useEffect(() => {
    getEuroBalance();
    getEuroTotalSupply();
  }, [provider, euroBalance]);

  const print = async () => {

    console.log("minting...")

    // if ()

    setLoading(true)

    if (!provider) {
      console.log("provider not initialized yet");
      setMsg("Please login first.")
      setLoading(false)
      return;

    }

    // console.log("bal:", bal)
    if (bal === "0.00000 ETH") {
      setMsg("Please get yourself a handful of Goerli ETH at https://goerlifaucet.com")
      setLoading(false)
      return;
    }

    if (amount === 0) {
      setMsg("Please type in an amount.")
      setLoading(false)
      return;
    }

    setMsg("")

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

  const getEuroTotalSupply = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const supply = await rpc.getEuroTotalSupply();
    const rounded = Number(supply).toFixed(2)
    setTotalSupply(Number(rounded))
    console.log("getEuroTotalSupply done")
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
        children: <p style={{color:"red", fontWeight: 'bold'}}>{msg}</p>
      }
    }}

  />;
}

const Print = React.forwardRef(Print_);
export default Print;
