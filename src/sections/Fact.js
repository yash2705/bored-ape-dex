import React from "react";
import Card from "../components/Card";
const Fact = ({ factRef }) => {
  return (
    <div className={styles.wrapper} ref={factRef}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/fact/bg.png`}
        alt=""
        className={styles.bgImage}
      />
      <div className={styles.container}>
        {facts.map((fact) => {
          return (
            <Card
              key={fact.id}
              title={fact.title}
              description={fact.description}
              image={`${process.env.PUBLIC_URL}/assets/fact/${fact.id}.png`}
            />
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  wrapper: `items-center bg-[#090858] text-white md:h-fit relative my-0`,
  bgImage: `h-full w-full object-cover absolute opacity-10`,
  container: `md:grid md:grid-cols-3 space-y-6 py-12 lg:mx-auto lg:my-auto px-8 md:gap-4 lg:gap-8 items-center min-h-max md:space-y-0 max-w-6xl xl:px-0 md:px-4 md:py-24`,
};

const facts = [
  {
    id: 1,
    title: "4700+",
    description: "TOTAL REGISTERED USERS",
  },
  {
    id: 2,
    title: "2.5M+",
    description: "TOTAL MONEY WITHDRAWN",
  },
  {
    id: 3,
    title: "80+",
    description: "DAILY ACTIVE INVESTORS",
  },
];

export default Fact;
