import React from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";

const Banner = ({ bannerRef, transferRef }) => {
  return (
    <div className={styles.wrapper} ref={bannerRef}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/banner/bg.png`}
        alt=""
        className={styles.bgImage}
      />
      <div className={styles.container}>
        <div className={styles.largeText}>
          Best Investment For MetaVerse Gaming Token
        </div>
        <div className={styles.smallText}>
          Binance-based blockchain tokens power it – BATs and SLPs convertible
          coins and ensure financial gains.
        </div>
        <ConnectWalletButton transferRef={transferRef} />
      </div>
    </div>
  );
};

const styles = {
  wrapper: `h-screen w-full justify-center flex flex-col text-white`,
  bgImage: `h-screen w-full object-cover`,
  container: `px-8 lg:px-24 absolute space-y-10 md:pt-20`,
  largeText: `text-4xl font-semibold md:text-7xl w-4/5 lg:w-2/3`,
  smallText: `text-lg font-medium w-4/5 lg:w-2/3`,
};
export default Banner;
