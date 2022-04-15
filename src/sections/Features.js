import React from "react";
import Card from "../components/Card";
const Features = ({ featuresRef }) => {
  return (
    <div className={styles.wrapper} ref={featuresRef}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/feature/bg.jpg`}
        alt=""
        className={styles.bgImage}
      />
      <div className={styles.largeFont}>FEATURES OF GAMING TOKEN</div>
      <div className={styles.smallFont}>
        Bored Ape Token (BAT) is one of the most popular and biggest
        cryptocurrency gaming tokens. BAT will develop tools that enable game
        publishers, game servers, and communities to manage virtual goods and
        in-game items across multiple platforms.
      </div>
      <div className={styles.cardContainer}>
        {features.map((feature) => {
          return (
            <Card
              key={feature.id}
              title={feature.title}
              description={feature.description}
              image={`${process.env.PUBLIC_URL}/assets/feature/${feature.id}.png`}
            />
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  wrapper: `items-center space-y-4 flex flex-col bg-[#090858] text-white md:h-screen justify-center relative `,
  bgImage: `h-full w-full object-cover absolute opacity-10`,
  cardContainer: `max-w-6xl p-4 lg:mx-auto lg:my-auto md:grid md:grid-cols-3 space-y-6 ml-8 mr-8 md:gap-4 lg:gap-8 items-center min-h-max md:space-y-0`,
  largeFont: `text-4xl font-medium text-center mt-6 relative lg:text-6xl md:text-5xl px-2`,
  smallFont: `w-11/12 text-center max-w-4xl relative md:text-lg`,
};

const features = [
  {
    id: 1,
    title: "Currency Conversion",
    description:
      "Buy in-game items using BAT. Convert in-game items back to BAT Coins.",
  },
  {
    id: 2,
    title: "Transparency",
    description:
      "Set up reports and commission systems that are completely transparent.",
  },
  {
    id: 3,
    title: "Gaming Machines",
    description:
      "Gamify your website and mobile community with custom Bored Ape Token (BAT) Coins.",
  },
  {
    id: 4,
    title: "Powerful Security",
    description: "No fraud, chargebacks, or cancellations.",
  },
  {
    id: 5,
    title: "100% Convenience",
    description:
      "Easily set up a site and mobile community with full virtual goods integration.",
  },
  {
    id: 6,
    title: "Support 24/7 Online",
    description: "Get in touch with  our team at any time on any day.",
  },
];

export default Features;
