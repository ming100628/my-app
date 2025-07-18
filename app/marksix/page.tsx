"use client";

import { useEffect, useState } from "react";
import Account from "./account";
import Numbers from "./numbers";
import NumberSelection from "./numberSelection";
export default function Home() {
  type BallSelection = { id: string; numbers: number[] };
  const [balls, setBalls] = useState<BallSelection[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [balance, setBalance] = useState(0);
  const [purchasedBalls, setPurchasedBalls] = useState<BallSelection[]>([]);

  const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("balls") || "[]");
  const getAccountBalance = () => {
    const balance = localStorage.getItem("account_balance");
    if (!balance) {
      localStorage.setItem("account_balance", "100");
      return 100;
    } else {
      return Number(balance);
    }
  };
  const getPurchasedBalls = () =>
    JSON.parse(localStorage.getItem("pballs") || "[]");

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      setBalls(getLocalStorage());
      setBalance(getAccountBalance());
      setPurchasedBalls(getPurchasedBalls());
    } else {
      localStorage.setItem("balls", JSON.stringify(balls));
      localStorage.setItem("pballs", JSON.stringify(purchasedBalls));
    }
  }, [firstLoad, balls, purchasedBalls]);

  const sharedProps = { balls, setBalls, selectedIndex, setSelectedIndex };
  const sharedPropsWithBalance = {
    balls,
    setBalls,
    selectedIndex,
    setSelectedIndex,
    balance,
    purchasedBalls,
    setPurchasedBalls,
    setBalance,
  };
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/3">
        <Numbers {...sharedProps} />
      </div>
      <div className="lg:w-1/3">
        <NumberSelection {...sharedProps} />
      </div>
      <div className="lg:w-1/3">
        <Account {...sharedPropsWithBalance} />
      </div>
    </div>
  );
}
