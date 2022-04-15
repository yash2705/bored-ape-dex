import React, { useEffect, useRef, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Toast from "../components/Toast";
import { db } from "../firebase.config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import BalanceStatement from "./BalanceStatement";
import TransfersTable from "./TransfersTable";

const TransferEth = ({ transferRef }) => {
  const [showToast, setShowToast] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const [noOfTokens, setNoOfTokens] = useState(0);
  const [txHash, setTxHash] = useState(null);
  const [cost, setCost] = useState(0);
  const [costOfEachToken, setCostOfEachToken] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [minimumNumberOfTokens, setMinimumNumberOfTokens] = useState();
  const [userBnbBalance, setUserBnbBalance] = useState(0);
  const [isLoading, setIsLoading] = useState();
  const amountRef = useRef(0);
  const { Moralis, isAuthenticated, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
    Moralis.enableWeb3();
    getTokenDetails();
    getWalletAddress();
    if (isAuthenticated) getBnbBalance();
  }, []);

  useEffect(() => {
    if (user) {
      getBnbBalance();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    setCost(noOfTokens * costOfEachToken);
  }, [noOfTokens, costOfEachToken]);

  const getTokenDetails = async () => {
    const tokenRef = doc(db, "token", "enclWKQ6RuyNRyjZA5Of");
    const tokenDoc = await getDoc(tokenRef);
    setCostOfEachToken(tokenDoc.data().price);
    setMinimumNumberOfTokens(tokenDoc.data().minimumNumberOfTokens);
  };

  const getWalletAddress = async () => {
    const walletRef = doc(db, "wallet", "j4KR2dRtGwius5RYCUqa");
    const walletDoc = await getDoc(walletRef);
    setWalletAddress(walletDoc.data().walletAddress);
  };

  const getAmount = () => {
    amountRef.current = noOfTokens * costOfEachToken;
  };

  const getBnbBalance = async () => {
    const options = {
      chain: "bsc",
      address: user.get("ethAddress"),
    };
    const res = await Web3Api.account.getNativeBalance(options);
    setUserBnbBalance(Moralis.Units.FromWei(res.balance));
  };

  const transfer = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      getAmount();
      if (noOfTokens < minimumNumberOfTokens) {
        setType("ERROR");
        setMessage(`Minimum number of tokens = ${minimumNumberOfTokens}.`);
      } else if (noOfTokens === 0) {
        setType("ERROR");
        setMessage(`Number of tokens cannot be 0.`);
      } else {
        const options = {
          type: "native",
          amount: Moralis.Units.Token(amountRef.current, 18),
          receiver: walletAddress,
        };

        const tx = await Moralis.transfer(options);
        const result = await tx.wait();

        if (result) {
          setType("SUCCESS");
          setMessage(
            `Transaction successfull. Tokens transferred: ${noOfTokens}.Check out the transaction `
          );
          setTxHash(`https://bscscan.com/tx/${result.transactionHash}`);
          console.log(result);
          try {
            await addDoc(collection(db, "transactions"), {
              walletAddress: result.from.toLowerCase(),
              transactionHash: result.transactionHash,
              numberOfTokens: parseInt(noOfTokens),
              amount: amountRef.current,
              date: Timestamp.now(),
            });
          } catch (err) {
            setType("ERROR");
            setMessage(err.message);
          }
          try {
            const userRef = doc(db, "users", result.from.toLowerCase());
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              await updateDoc(userRef, {
                balance:
                  parseInt(userDoc.data().balance) + parseInt(noOfTokens),
                total:
                  parseFloat(userDoc.data().total) *
                  parseFloat(amountRef.current),
              });
            } else {
              await setDoc(userRef, {
                balance: parseInt(noOfTokens),
                total: parseFloat(noOfTokens * costOfEachToken),
              });
            }
          } catch (err) {
            setType("ERROR");
            setMessage(err.message);
          }
        }
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
    } finally {
      setShowToast(true);
      setIsLoading(false);
    }
  };

  const addTokenToWallet = async () => {
    const TOKEN_ADDRESS = "0xc27b2c87983d5b267eea064cd445b2c2335a135e";
    const TOKEN_SYMBOL = "BAT";
    const TOKEN_DECIMALS = parseInt(18);
    const TOKEN_IMAGE = "https://tokenboredape.com/assets/website-logo.png";

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: TOKEN_ADDRESS,
            symbol: TOKEN_SYMBOL,
            decimals: TOKEN_DECIMALS,
            image: TOKEN_IMAGE,
          },
        },
      });
    } catch (err) {
      setType("ERROR");
      setMessage(err.message);
      setShowToast(true);
    }
  };

  return (
    <div className={styles.wrapper} ref={transferRef}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/transfer/bg.jpg`}
        alt=""
        className={styles.bgImage}
      />
      <div className={styles.textContainer} onClick={addTokenToWallet}>
        <div className={styles.largeText}>Buy Tokens </div>
        <div className={styles.smallText}>
          Don't see BAT in your Metamask wallet?{" "}
          <span className={styles.link}>click here</span>
        </div>
      </div>
      <div className={styles.mediumText}>
        Current Market Price :{" "}
        <span className="text-green-400">{costOfEachToken} BNB</span>
      </div>
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
        {isLoading ? (
          <div className="text-center">
            <svg
              role="status"
              className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-violet-900"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          "Swap"
        )}
      </div>
      <div className={styles.smallText}>
        Approximate Cost : {cost || 0} BNB
        {user && <> | BNB Balance : {userBnbBalance}</>}
      </div>
      {isAuthenticated && (
        <>
          <BalanceStatement />
          <TransfersTable />
        </>
      )}
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
  wrapper: `flex flex-col justify-center items-center space-y-6 text-white relative bg-black pb-8`,
  bgImage: `h-full w-full object-cover absolute opacity-20 mt-24`,
  largeText: `text-3xl font-bold relative md:text-5xl lg:text-6xl`,
  mediumText: `text-xl font-bold relative md:text-2xl lg:text-4xl`,
  input: `bg-slate-100 border border-slate-400 py-2 focus:outline-none rounded-xl px-6 text-black relative w-1/2 max-w-md`,
  swapButton: `px-8 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-800 hover:cursor-pointer drop-shadow-sm shadow-md active:drop-shadow-none active:shadow-none w-1/2 max-w-md text-center text-2xl font-medium`,
  smallText: `text-slate-200 relative text-center text-sm font-thin`,
  link: `text-sm underline hover:cursor-pointer text-slate-200 underline-offset-4 hover:text-white`,
  textContainer: `flex flex-col justify-center items-center space-y-4`,
};

export default TransferEth;

// "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"

// const options = {
//   type: "erc20",
//   amount: Moralis.Units.Token(amountRef.current, 18),
//   receiver: walletAddress,
//   contractAddress: "0xc27b2c87983d5b267eea064cd445b2c2335a135e",
// };

// const tx = await Moralis.transfer(options);
// const result = await tx.wait();

// if (result) {
//   setType("SUCCESS");
//   setMessage(
//     `Transaction successfull. Tokens transferred: ${noOfTokens}.Check out the transaction `
//   );
//   setTxHash(`https://bscscan.com/tx/${result.transactionHash}`);
//   console.log(result);
//   try {
//     await addDoc(collection(db, "transactions"), {
//       walletAddress: result.from.toLowerCase(),
//       transactionHash: result.transactionHash,
//       numberOfTokens: parseInt(noOfTokens),
//       amount: amountRef.current,
//       date: Timestamp.now(),
//     });
//   } catch (err) {
//     setType("ERROR");
//     setMessage(err.message);
//   }
//   try {
//     const userRef = doc(db, "users", result.from.toLowerCase());
//     const userDoc = await getDoc(userRef);
//     if (userDoc.exists()) {
//       await updateDoc(userRef, {
//         balance:
//           parseInt(userDoc.data().balance) + parseInt(noOfTokens),
//         total:
//           parseFloat(userDoc.data().total) *
//           parseFloat(amountRef.current),
//       });
//     } else {
//       await setDoc(userRef, {
//         balance: parseInt(noOfTokens),
//         total: parseFloat(noOfTokens * costOfEachToken),
//       });
//     }
//   } catch (err) {
//     setType("ERROR");
//     setMessage(err.message);
//   }
// }
