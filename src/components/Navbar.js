import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import ConnectWalletButton from "./ConnectWalletButton";
import Navlink from "./Navlink";
import { useMoralis } from "react-moralis";

const Navbar = ({ bannerRef, factRef, featuresRef, transferRef, teamRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isAuthenticated } = useMoralis();
  return (
    <div className={styles.wrapper}>
      <div>
        <img
          src={process.env.PUBLIC_URL + "/assets/logo.png"}
          alt={"Bored Apes"}
          className={styles.logo}
        />
      </div>
      <div className={styles.container}>
        <ConnectWalletButton transferRef={transferRef} />
        <div className={styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu size={30} color={"white"} />
        </div>
        <div
          className={`${styles.optionsContainer} ${
            !isOpen ? "hidden" : "flex"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <Navlink title={"Home"} link={bannerRef} extraOffset={0} />
          <Navlink title={"Facts"} link={factRef} extraOffset={-200} />
          <a
            href="https://tokenboredape.com/whitepaper/v1.pdf"
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            Whitepaper
          </a>
          <Navlink title={"Tokenomics"} link={featuresRef} extraOffset={-55} />
          <Navlink title={"Team"} link={teamRef} extraOffset={-40} />
          {isAuthenticated && (
            <div onClick={logout} className={styles.link}>
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: `flex justify-between items-center py-2 px-4 bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 lg:justify-around fixed w-full z-50`,
  logo: `w-40 lg:w-48`,
  container: `flex space-x-4 items-center lg:flex-row-reverse relative`,
  menuIcon: `lg:hidden hover:cursor-pointer`,
  optionsContainer: `lg:flex lg:flex-row lg:space-x-4 bg-purple-700 space-y-4 absolute top-16 w-full flex-col items-center rounded-2xl right-0 lg:bg-transparent lg:static lg:w-fit lg:space-y-0`,
  link: `text-white text-lg hover:text-red-600 transition-all duration-300 hover:cursor-pointer`,
};

export default Navbar;
