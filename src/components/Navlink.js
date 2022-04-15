import React from "react";

const Navlink = ({ title, link, extraOffset }) => {
  const scrollToTop = () => {
    if (link) {
      window.scrollTo({
        top: link.current.offsetTop + extraOffset,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={styles.wrapper} onClick={scrollToTop}>
      {title}
    </div>
  );
};

const styles = {
  wrapper: `text-white text-lg hover:text-red-600 transition-all duration-300 hover:cursor-pointer`,
};

export default Navlink;
