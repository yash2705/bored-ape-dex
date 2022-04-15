import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import BalanceStatementCard from "../components/BalanceStatementCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { FaAngleDoubleUp, FaAngleDoubleDown, FaEquals } from "react-icons/fa";

const BalanceStatement = () => {
  const [noOfTokens, setNoOfTokens] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState();
  const { isAuthenticated, user } = useMoralis();

  useEffect(() => {
    const findUser = async () => {
      const walletAddress = user.get("ethAddress").toString().toLowerCase();
      const userRef = doc(db, "users", walletAddress);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const details = userSnap.data();
        setAmount(parseFloat(details.total));
        setNoOfTokens(parseInt(details.balance));
      }
    };

    if (isAuthenticated && user) {
      setIsLoading(true);
      findUser();
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  return (
    !isLoading && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <BalanceStatementCard
            icon={<FaAngleDoubleUp color="green" size={36} />}
            title="Total Investment"
            noOfTokens={noOfTokens}
            total={amount}
          />
          <BalanceStatementCard
            icon={<FaAngleDoubleUp color="green" size={36} />}
            title="Daily P&L"
            profit="18"
          />
          <BalanceStatementCard
            icon={<FaAngleDoubleUp color="green" size={36} />}
            title="Total P&L"
            noOfTokens={noOfTokens}
            total={amount}
            profit="28"
          />
        </div>
      </div>
    )
  );
};

const styles = {
  wrapper: `items-center text-white relative w-full`,
  container: `md:grid md:grid-cols-3 space-y-6 lg:mx-auto lg:my-auto px-8 md:gap-4 lg:gap-8 items-center min-h-max md:space-y-0 max-w-6xl xl:px-0 md:px-4`,
};

export default BalanceStatement;
