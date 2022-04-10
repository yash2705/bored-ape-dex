import React from "react";

const Card = ({ image, title, description }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: `space-y-2 p-4 hover:bg-gradient-to-b hover:from-orange-400 hover:via-orange-500 hover:to-orange-600 transition duration-200 ease-in-out rounded-2xl shadow-md h-full backdrop-blur-md text-white backdrop-filter drop-shadow-md border border-blue-700 hover:border-yellow-300`,
  image: `h-16 `,
  title: `text-2xl font-medium`,
};

export default Card;
