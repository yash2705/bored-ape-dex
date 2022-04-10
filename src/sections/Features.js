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
        Cubilia dui pretium inventore ab atque aliquid mollit aliquid laborum?
        Congue dicta! Laboriosam aliqua nulla dictum egestami sapiente! Nisi
        vivamus nostrud
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
    title: "Curreny Conversion",
    description: "Cdipiscing provident! Cras molestie odit dolores facilis",
  },
  {
    id: 2,
    title: "Transparency",
    description: "Cdipiscing provident! Cras molestie odit dolores facilis",
  },
  {
    id: 3,
    title: "Gaming Machines",
    description: "Cdipiscing provident! Cras molestie odit dolores facilis",
  },
  {
    id: 4,
    title: "Powerful Security",
    description: "Cdipiscing provident! Cras molestie odit dolores facilis",
  },
  {
    id: 5,
    title: "100% Convinience",
    description: "Cdipiscing provident! Cras molestie odit dolores facilis",
  },
  {
    id: 6,
    title: "Support 24/7 Online",
    description: "Cdipiscing provident! Cras molestie odit dolores facilis",
  },
];

export default Features;
