import React from "react";

const AboutCard = ({ name, description, role }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textContainer}>
        <div className={styles.nameRoleContainer}>
          <span className={styles.title}>{name}</span>
          <span className={styles.role}>{role}</span>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: `flex items-center`,
  textContainer: `w-3/4 space-y-2`,
  title: `text-lg lg:text-xl font-bold`,
  description: `lg:text-lg`,
  nameRoleContainer: `space-x-4`,
  role: `text-sm`,
};

export default AboutCard;
