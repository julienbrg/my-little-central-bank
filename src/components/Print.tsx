import * as React from "react";
import { useState } from "react";

import {
  PlasmicPrint,
  DefaultPrintProps
} from "./plasmic/my_little_central_bank/PlasmicPrint";
import { HTMLElementRefOf } from "@plasmicapp/react-web";


export interface PrintProps extends DefaultPrintProps {}

function Print_(props: PrintProps, ref: HTMLElementRefOf<"div">) {

  const [balance, setBalance] = useState<number>(0)
  const [amount, setAmount] = useState<any>(0)

  const increment = async (amount:number) => {

    console.log("amount:", amount)
    setBalance(+balance + +amount);

  }
 
  return <PlasmicPrint root={{ ref }} {...props} 
  
    textBox={{
      props: {
        children: "Your wallet is currently holding " + balance + " EUR."
      }
    }}

    amountInput={{
      props: {
        onChange: (value) => setAmount(value.target.value)
      }
    }}
    
    print={{
      props: {
        onClick: () => increment(amount)
      }
    }}

  />;
}

const Print = React.forwardRef(Print_);
export default Print;
