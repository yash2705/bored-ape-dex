import React, { useEffect, useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import Toast from "../components/Toast";
import axios from "axios";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";

const TransferEth = ({ transferRef }) => {
  const [showToast, setShowToast] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const [noOfTokens, setNoOfTokens] = useState(0);
  const [txHash, setTxHash] = useState(null);
  const [cost, setCost] = useState(0);
  const bnbRef = useRef();
  const amountRef = useRef();
  const { Moralis, authenticate, isAuthenticated } = useMoralis();

  useEffect(() => {
    Moralis.enableWeb3();
    getBnbPrice();
  }, []);

  useEffect(() => {
    setCost((noOfTokens * 0.5) / bnbRef.current);
  }, [noOfTokens]);

  const getAmount = async () => {
    await getBnbPrice();
    amountRef.current = (noOfTokens * 0.5) / bnbRef.current;
  };

  const transfer = async () => {
    try {
      await getAmount();
      if (amountRef.current !== 0) {
        const options = {
          type: "erc20",
          amount: Moralis.Units.Token(amountRef.current, 18),
          receiver: "0x5816f1b0A29d23E4524f2762324e1c9831F05936",
          contractAddress: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
        };

        const tx = await Moralis.transfer(options);
        const result = await tx.wait();
        if (result) {
          setType("SUCCESS");
          setMessage(
            `Transaction successfull. Tokens transferred: ${noOfTokens}.Check out the transaction `
          );
          setTxHash(`https://testnet.bscscan.com/tx/${result.transactionHash}`);
          console.log(result);
          try {
            const docRef = await addDoc(collection(db, "transactions"), {
              walletAddress: result.from,
              transactionHash: result.transactionHash,
              numberOfTokens: noOfTokens,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (err) {
            setType("ERROR");
            setMessage(err.message);
          }
        }
      } else {
        setType("ERROR");
        setMessage(`Number of coins cannot be 0.`);
      }
    } catch (err) {
      setType("ERROR");
      if (err.code === 4001) {
        setMessage(`User denied transaction signature.`);
      } else if (err.code === -32603) {
        setMessage(`Insufficient funds for transaction.`);
      } else {
        setMessage(err.message);
      }
    }
    setShowToast(true);
  };

  const getBnbPrice = async () => {
    const res = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT"
    );
    if (res.status === 200) {
      bnbRef.current = parseFloat(res.data.price);
    }
  };

  return (
    <div className={styles.wrapper} ref={transferRef}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/transfer/bg.jpg`}
        alt=""
        className={styles.bgImage}
      />
      <div className={styles.largeText}>Buy Tokens</div>
      <div className={styles.mediumText}>Current Market Price : 0.5 USDT</div>
      <input
        className={styles.input}
        value={noOfTokens}
        onChange={(e) => {
          setNoOfTokens(
            e.target.value < 0 ? e.target.value * -1 : e.target.value
          );
        }}
        placeholder="Number of coins"
        type="number"
      />

      <div
        onClick={() => {
          transfer();
        }}
        className={styles.swapButton}
      >
        Swap
      </div>
      <div className={styles.smallText}>Approximate Cost : {cost || 0} BNB</div>
      {message && showToast && (
        <Toast
          type={type}
          message={message}
          setShowToast={setShowToast}
          link={txHash}
        />
      )}
    </div>
  );
};

const styles = {
  wrapper: `flex flex-col justify-center items-center h-[500px] space-y-6 text-white relative bg-black`,
  bgImage: `h-full w-full object-cover absolute opacity-20`,
  largeText: `text-3xl font-bold relative md:text-5xl lg:text-6xl`,
  mediumText: `text-xl font-bold relative md:text-2xl lg:text-4xl`,
  input: `bg-slate-100 border border-slate-400 py-2 focus:outline-none rounded-xl px-6 text-black relative w-1/2 max-w-md`,
  swapButton: `px-8 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-800 hover:cursor-pointer drop-shadow-sm shadow-md active:drop-shadow-none active:shadow-none w-1/2 max-w-md text-center text-2xl font-medium`,
  smallText: `text-white relative text-center`,
};

export default TransferEth;
