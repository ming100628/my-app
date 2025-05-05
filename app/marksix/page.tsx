"use client";

import { useEffect, useState } from "react";
import Account from "./account";
import Numbers from "./numbers";
import NumberSelection from "./numberSelection";

export default function Home() {
  const [balls, setBalls] = useState<number[][]>([]);
  const [firstLoad, setFirstLoad] = useState<Boolean>(true);

  function getLocalStorage(): number[][] {
    return JSON.parse(localStorage.getItem("balls") || "[]");
  }

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      setBalls(getLocalStorage());
    } else {
      localStorage.setItem("balls", JSON.stringify(balls));
    }
  }, [firstLoad, balls]);
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/3">
        <Numbers
          balls={balls}
          setBalls={setBalls}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
      <div className="lg:w-1/3">
        <NumberSelection
          balls={balls}
          setBalls={setBalls}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
      <div className="lg:w-1/3">
        <Account />
      </div>
    </div>
  );
}
