import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config";

const TransfersTable = () => {
  const [txns, setTxns] = useState([]);
  const { isAuthenticated, user } = useMoralis();

  useEffect(() => {
    const findUser = async () => {
      const walletAddress = user.get("ethAddress").toString().toLowerCase();
      const q = query(
        collection(db, "transactions"),
        where("walletAddress", "==", walletAddress)
      );

      const querySnapshot = await getDocs(q);
      setTxns(querySnapshot.docs);
    };
    if (isAuthenticated) {
      findUser();
    }
  }, [isAuthenticated, user]);

  return txns.length > 0 ? (
    <>
      <div className="p-5 overflow-y-auto pb-12 relative text-gray-700">
        <h1 className="text-3xl mb-2 text-white">Your Transactions</h1>
        <div className="overflow-auto rounded-lg shadow hidden lg:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Transaction Hash
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Date
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  No. of Tokens
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {txns.map((txn, i) => {
                const txnData = txn.data();
                txnData.date =
                  ("0" + txnData.date.toDate().getDate()).slice(-2) +
                  "-" +
                  ("0" + (txnData.date.toDate().getMonth() + 1)).slice(-2) +
                  "-" +
                  txnData.date.toDate().getFullYear();
                txnData.link = `https://bscscan.com/tx/${txnData.transactionHash}`;
                return (
                  <tr className="bg-white" key={txnData.transactionHash}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span>{i + 1}</span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span className="font-bold text-blue-500 hover:underline cursor-pointer">
                        <a href={txnData.link} target="blank">
                          {txnData.transactionHash}
                        </a>
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {txnData.date}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {txnData.numberOfTokens}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {txnData.amount} BNB
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {txns.map((txn) => {
            const txnData = txn.data();
            txnData.date =
              ("0" + txnData.date.toDate().getDate()).slice(-2) +
              "-" +
              ("0" + (txnData.date.toDate().getMonth() + 1)).slice(-2) +
              "-" +
              txnData.date.toDate().getFullYear();
            txnData.link = `https://bscscan.com/tx/${txnData.transactionHash}`;
            return (
              <div
                className="bg-white space-y-3 p-4 rounded-lg shadow"
                key={txnData.transactionHash}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <div className="text-gray-500">{txnData.date}</div>
                </div>
                <div className="text-blue-500 font-bold hover:underline w-full truncate hover:cursor-pointer">
                  <a
                    className="decoration-none"
                    href={txnData.link}
                    target="blank"
                  >
                    {txnData.transactionHash}
                  </a>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-black">
                    {txnData.numberOfTokens} Tokens
                  </div>
                  <div className="text-sm text-black font-medium">
                    {txnData.amount} BNB
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <div className="text-3xl relative text-center text-slate-200">
      No Transactions. Buy your first tokens now!
    </div>
  );
};

export default TransfersTable;
