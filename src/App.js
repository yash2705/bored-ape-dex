import React, { useRef } from "react";
import Banner from "./sections/Banner";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Fact from "./sections/Fact";
import Features from "./sections/Features";
import Team from "./sections/Team";
import TransferEth from "./sections/TransferEth";
import Footer from "./sections/Footer";

function App() {
  const bannerRef = useRef();
  const factRef = useRef();
  const transferRef = useRef();
  const featuresRef = useRef();
  const teamRef = useRef();
  return (
    <div>
      <Navbar
        bannerRef={bannerRef}
        factRef={factRef}
        transferRef={transferRef}
        featuresRef={featuresRef}
        teamRef={teamRef}
      />
      <Banner bannerRef={bannerRef} transferRef={transferRef} />
      <Fact factRef={factRef} />
      <TransferEth transferRef={transferRef} />
      <Features featuresRef={featuresRef} />
      <Team teamRef={teamRef} />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
