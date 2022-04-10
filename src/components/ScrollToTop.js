import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  });

  if (!visible) {
    return false;
  }
  return (
    <div className={styles.wrapper} onClick={scrollToTop}>
      <AiOutlineArrowUp size={32} color={"white"} />
    </div>
  );
};

const styles = {
  wrapper: `fixed bottom-10 right-5 rounded-full p-2 bg-gradient-to-b from-orange-600 to-orange-400 z-50 animate-bounce hover:cursor-pointer`,
};

export default ScrollToTop;
