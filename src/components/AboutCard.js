import React from "react";

const AboutCard = ({ image, title, description }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/team/${image}.png`}
          alt=""
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: `flex items-center`,
  imageContainer: `bg-violet-800 w-16 h-16 flex items-center justify-center rounded-lg`,
  image: `w-10`,
  textContainer: `w-3/4 ml-6 space-y-2`,
  title: `text-lg lg:text-xl font-bold`,
  description: `lg:text-lg`,
};

export default AboutCard;
