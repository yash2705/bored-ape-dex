import React from "react";
import { useMoralis } from "react-moralis";

const ConnectWalletButton = ({ transferRef }) => {
  const { authenticate, isAuthenticated, isAuthenticating } = useMoralis();

  const login = async () => {
    if (!isAuthenticated && !isAuthenticating) {
      await authenticate({
        signingMessage: "Connect to the bsc using Metamask",
        chainId: 97,
      });
    }
  };

  const scrollToTranfser = () => {
    window.scrollTo({
      top: transferRef.current.offsetTop - 160,
      behavior: "smooth",
    });
  };
  return (
    <div
      className={styles.wrapper}
      onClick={!isAuthenticated ? login : scrollToTranfser}
    >
      {!isAuthenticated ? "Connect Wallet" : "Buy Tokens"}
    </div>
  );
};

const styles = {
  wrapper: `flex px-4 py-3 hover:cursor-pointer rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 text-white hover:from-red-500 hover:via-orange-500 hover:to-orange-600 duration-1000 ease-in-out lg:m-4 transition justify-center items-center space-x-2 w-36`,
};

export default ConnectWalletButton;
