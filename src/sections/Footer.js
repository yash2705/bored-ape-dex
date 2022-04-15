import React from "react";
import { FiInstagram, FiTwitter } from "react-icons/fi";
import { AiOutlineReddit } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons//fa";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconsContainer}>
        <a href="https://instagram.com/bored_ape_token" target="blank">
          <FiInstagram className={styles.icon} />
        </a>
        <a href="https://twitter.com/boredapecoins" target="blank">
          <FiTwitter className={styles.icon} />
        </a>
        <a href="https://www.reddit.com/u/BoredApeToken" target="blank">
          <AiOutlineReddit className={styles.icon} />
        </a>
        <a href="https://t.me/BoredApeTokens" target="blank">
          <FaTelegramPlane className={styles.icon} />
        </a>
      </div>
      <div className="text-center text-slate-300 w-full text-sm">
        © 2022 Bored Ape Token. All Rights Reserved.
      </div>
    </div>
  );
};

const styles = {
  wrapper: `w-full bg-black pb-8 lg:pt-8`,
  icon: `text-slate-400 hover:text-white w-12 h-6 hover:scale-125 transition duration-500 ease-in-out hover:cursor-pointer`,
  iconsContainer: `flex p-4 w-1/2 lg:w-1/3 items-center justify-around mx-auto`,
};

export default Footer;
