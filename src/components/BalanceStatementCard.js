import React from "react";

const BalanceStatementCard = ({
  icon,
  title,
  profit,
  loss,
  noOfTokens,
  total,
}) => {
  return (
    <div className={styles.wrapper}>
      <div>{icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {total !== undefined && !profit && !loss && (
          <>
            <div className="text-lg">Total = {noOfTokens} BAT </div>
            <div className="text-lg">Amount = {total} BNB</div>
          </>
        )}
        <div>
          {profit && (
            <>
              {total !== undefined && (
                <>
                  <div className="text-lg">
                    Total ={" "}
                    {parseFloat(noOfTokens) +
                      (parseFloat(noOfTokens) * parseFloat(profit)) / 100}{" "}
                    BAT{" "}
                  </div>
                  <div className="text-lg">
                    Amount ={" "}
                    {parseFloat(total) +
                      (parseFloat(total) * parseFloat(profit)) / 100}{" "}
                    BNB
                  </div>
                </>
              )}

              <span className="text-xl text-green-400 font-medium">
                +{profit}%
              </span>
            </>
          )}
          {loss && (
            <>
              {total !== undefined && (
                <>
                  <div className="text-lg">
                    Total ={" "}
                    {parseFloat(noOfTokens) -
                      (parseFloat(noOfTokens) * parseFloat(loss)) / 100}{" "}
                    BAT{" "}
                  </div>
                  <div className="text-lg">
                    Amount ={" "}
                    {parseFloat(total) -
                      (parseFloat(total) * parseFloat(loss)) / 100}{" "}
                    BNB
                  </div>
                </>
              )}
              <span className="text-xl text-red-500 font-medium">-{loss}%</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: `space-y-2 p-4 rounded-2xl shadow-md h-full backdrop-blur-md text-white backdrop-filter drop-shadow-md border`,
  title: `text-2xl font-medium`,
};

export default BalanceStatementCard;
