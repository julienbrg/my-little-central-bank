/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useEffect } from "react";
import {
  PlasmicHeader,
  DefaultHeaderProps
} from "./plasmic/my_little_central_bank/PlasmicHeader";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import { useGlobalContext } from '../web3/Web3Context';
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import RPC from "../web3/ethersRPC";
import { shortenAddress } from '@usedapp/core'

export interface HeaderProps extends DefaultHeaderProps {}

function Header_(props: HeaderProps, ref: HTMLElementRefOf<"div">) {
  
  const clientId = String(process.env.REACT_APP_WEB3_AUTH_CLIENT_ID);
  const endpoint = String(process.env.REACT_APP_RPC_URL);

  // console.log("clientId:", clientId)
  // console.log("endpoint:", endpoint)
  // const faucet = String(process.env.REACT_APP_FAUCET_PRIVATE_KEY);

  const { 
    web3auth, setWeb3auth,
    provider, setProvider,
    setUserAddress,
    // setBal,
    userShortenAddr, setShortenAddr,
    etherscanLink, setEtherscanLink
    // etherscanLink, setEtherscanLink,
    // txHash, setTxHash,
    // net, setNet,
    // firstName, setFirstName,
    // pfp, setPfp
  } = useGlobalContext()
  
  useEffect(() => {
    const init = async () => {
      console.log("init")
      try {
  
        const web3auth = new Web3Auth({
          clientId: clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
            rpcTarget: endpoint,
            displayName: "Goerli Testnet",
            blockExplorer: "https://goerli.etherscan.io",
            ticker: "ETH",
            tickerName: "Ethereum",
          },
        });
  
      setWeb3auth(web3auth);

      console.log("web3auth:", web3auth)
  
      await web3auth.initModal();
  
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } catch (error) {
        console.error(error);
      }
    };
  
    init();
  }, []);

  useEffect(() => {
    getAccounts()
  }, [provider]);

  const toggle = async () => {
    if (provider) {
      await logout();
    } else {
      await login();
    }
  }
  
  const login = async () => {
    if (!web3auth) {
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  
    await getAccounts();
  };
  
  const logout = async () => {
    if (!web3auth) {
      return;
    }
    await web3auth.logout();
    setProvider(null);
    // setUserAddr("")
    // setShortenAddr("");
    // setEtherscanLink("");
    // setNet("");
    // setBal("");
    // setFirstName("anon")
    // setPfp("")
  };
  
  // const getChainId = async () => {
  //   if (!provider) {
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const chainId = await rpc.getChainId();
  //   if (chainId === 3) {
  //     // setNet("Ropsten Testnet");
  //   } else {
  //     // setNet(chainId);
  //   }
    
  // };
  
  const getAccounts = async () => {

    if (!provider) {
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    // setEtherscanLink("https://ropsten.etherscan.io/address/"+ address);
    console.log("address:", address)
    setUserAddress(address)
    setShortenAddr(shortenAddress(address))
    setEtherscanLink("https://goerli.etherscan.io/address/"+ address);
  
  };
  
  // const getBalance = async () => {
  //   if (!provider) {
  //     return;
  //   }
  //   // const rpc = new RPC(provider);
  //   // const balanceRaw = await rpc.getBalance();
  //   // const balanceFormatted = Number(balanceRaw).toFixed(5);
  //   // const balance = String(balanceFormatted) + " ETH"
  //   // setBal(balance);
  // };
  
  // const getUserInfo = async () => {
  //   if (!web3auth) {
  //     return;
  //   }
  //   const user = await web3auth.getUserInfo();
  //   if (user) {
  //     // const str = user.name as any
  //     // const first = str.split(' ')[0]
  //     // setFirstName(first)
  //     // setPfp(user.profileImage as any)
  //   }
  // };

  return <PlasmicHeader root={{ ref }} {...props} 
  
    login={{
      props: {
        children: (!provider ? "Login" : "Logout"),
        onClick: () => toggle()
      } as any
    }}

    userAddressBox={{
      props: {
        href: etherscanLink,
        children: (!provider ? "" : userShortenAddr)
      }
    }}

  />;
}

const Header = React.forwardRef(Header_);
export default Header;
