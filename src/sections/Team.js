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
            Take a good look at the team behind BAT
          </span>
          <span className={styles.smallText}>
            The Bored Ape Token (BAT)'s team has proven capabilities and
            experience in software engineering, marketing, blockchain
            technologies, and business operations. We have a solid reputation in
            the industry, and a long work history together.
          </span>
          <div className={styles.aboutCardContainer}>
            {aboutCards.map((about) => {
              return (
                <AboutCard
                  key={about.id}
                  image={about.id}
                  name={about.name}
                  description={about.description}
                  role={about.role}
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
  wrapper: `h-full w-full bg-black relative`,
  bgImage: `h-full w-full object-cover opacity-20 absolute`,
  container: `relative flex flex-col items-center justify-center w-full h-full space-y-4 xl:flex-row xl:px-6 py-6 xl:py-0`,
  leftContainer: `bg-violet-600 p-2 w-4/5 xl:w-2/5 rounded-xl max-w-md`,
  rightContainer: `flex flex-col text-white xl:ml-12 space-y-4 xl:w-3/5 px-6`,
  mediumText: `text-xl font-medium md:text-2xl xl:text-3xl`,
  largeText: `text-3xl font-bold md:text-4xl xl:text-6xl lg:text-5xl`,
  smallText: `font-lg lg:text-xl`,
  aboutCardContainer: `space-y-6 lg:space-y-8 pt-6 md:pt-0`,
};

const aboutCards = [
  {
    id: 1,
    name: "Maxim Blagov",
    role: "CEO / Creative Director",
    description:
      "Co-founder of Bored Ape Token (BAT). A visionary and creative director with 15 years of expertise in creative direction, project management, and UX design. Expert in concept & strategy development for large interactive applications, specializing in the video gaming industry.",
  },
  {
    id: 2,
    name: "Witek Radomski",
    role: "CTO",
    description:
      "Co-founder of Bored Ape Token (BAT). Witek has overseen the technical engineering of Bored Ape Token (BAT) for nearly a decade. He champions best practices in software design, security, and testing. Leading the Bored Ape Token (BAT) Coin currency implementation and integration within the online gaming ecosystem.",
  },
];

export default Team;
