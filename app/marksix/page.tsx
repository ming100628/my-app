"use client";
import { useEffect, useState } from "react";
import Account from "./account";
import Announcements from "./announcements";
import Numbers from "./numbers";
import NumberSelection from "./numberSelection";
import { PastDraw } from "./interfaces";
import { generateQuickPick } from "./numberFunctions";
export default function Home() {
  type BallSelection = { id: string; numbers: number[]; ddate: Date };
  const [balls, setBalls] = useState<BallSelection[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [balance, setBalance] = useState(0);
  const [purchasedBalls, setPurchasedBalls] = useState<BallSelection[]>([]);
  const [pastDraws, setPastDraws] = useState<PastDraw[]>([]);

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
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    let pd = JSON.parse(
      localStorage.getItem("pastDraws") || JSON.stringify([])
    );
    if (pd === null || pd.length === 0) {
      const newDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      );
      pd = [];
      pd.push({
        id: crypto.randomUUID(),
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        day: newDate.getDate(),
        numbers: generateQuickPick(),
      });
    }
    while (
      new Date(
        pd[pd.length - 1].year,
        pd[pd.length - 1].month,
        pd[pd.length - 1].day
      ) <= now
    ) {
      const newDate = new Date(
        pd[pd.length - 1].year,
        pd[pd.length - 1].month,
        pd[pd.length - 1].day + 1
      );
      pd.push({
        id: crypto.randomUUID(),
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        day: newDate.getDate(),
        numbers: generateQuickPick(),
      });
    }
    localStorage.setItem("pastDraws", JSON.stringify(pd));
    setPastDraws(pd);
  }, []);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      setBalls(getLocalStorage());
      setBalance(getAccountBalance());
      setPurchasedBalls(getPurchasedBalls());
    } else {
      localStorage.setItem("balls", JSON.stringify(balls));
      localStorage.setItem("pballs", JSON.stringify(purchasedBalls));
      localStorage.setItem("pastDraws", JSON.stringify(pastDraws));
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
  const sharedPropsWithPastDraws = {
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
    <div>
      <Announcements pastDraws={pastDraws} />
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
    </div>
  );
}
