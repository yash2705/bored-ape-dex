import React from "react";
import AboutCard from "../components/AboutCard";

const Team = ({ teamRef }) => {
  return (
    <div className={styles.wrapper} ref={teamRef}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/team/bg.png`}
        alt=""
        className={styles.bgImage}
      />
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <img src={`${process.env.PUBLIC_URL}/assets/team/about.png`} alt="" />
        </div>
        <div className={styles.rightContainer}>
          <span className={styles.mediumText}>WHO WE'RE</span>
          <span className={styles.largeText}>
            Take a good look at what you can gaming here
          </span>
          <span className={styles.smallText}>
            Reprehenderit quibusdam curabitur. Mollis? Sollicitudin! Pharetra
            accumsan fugit. Ducimus animi aliqua. User support ridiculus mollis
            conubia justo. Voluptates mattis.
          </span>
          <div className={styles.aboutCardContainer}>
            {aboutCards.map((about) => {
              return (
                <AboutCard
                  key={about.id}
                  image={about.id}
                  title={about.title}
                  description={about.description}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: `md:h-screen w-full bg-black relative`,
  bgImage: `md:h-screen h-full w-full object-cover opacity-20 absolute`,
  container: `relative flex flex-col items-center justify-center w-full h-full space-y-4 md:flex-row md:px-6 py-6 md:py-0`,
  leftContainer: `bg-violet-600 p-2 w-4/5 md:w-2/5 rounded-xl max-w-md`,
  rightContainer: `flex flex-col text-white md:ml-12 space-y-4 md:w-2/5 px-4`,
  mediumText: `text-xl font-medium md:text-2xl xl:text-3xl`,
  largeText: `text-3xl font-bold md:text-4xl xl:text-6xl lg:text-5xl`,
  smallText: `font-lg lg:text-xl`,
  aboutCardContainer: `space-y-6 lg:space-y-8 pt-6 md:pt-0`,
};

const aboutCards = [
  {
    id: 1,
    title: "ONLINE TRANSFER",
    description:
      "Endisse hendrerit lacus, hic eos nec consectetur, tristique dapibus pharetra do sollicitudin adipiscing.",
  },
  {
    id: 2,
    title: "SECURE PAYMENT",
    description:
      "Endisse hendrerit lacus, hic eos nec consectetur, tristique dapibus pharetra do sollicitudin adipiscing.",
  },
];

export default Team;
