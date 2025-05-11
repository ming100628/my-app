"use client";

import { useEffect, useState } from "react";
import Account from "./account";
import Numbers from "./numbers";
import NumberSelection from "./numberSelection";

export default function Home() {
  const [balls, setBalls] = useState<number[][]>([]);
  const [firstLoad, setFirstLoad] = useState<Boolean>(true);
  const [cart, setCart] = useState<number[][]>([]);

  function getBallsFromLocalStorage(): number[][] {
    return JSON.parse(localStorage.getItem("balls") || "[]");
  }

  function getCartFromLocalStorage(): number[][] {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      setBalls(getBallsFromLocalStorage());
      setCart(getCartFromLocalStorage());
    } else {
      localStorage.setItem("balls", JSON.stringify(balls));
      localStorage.setItem("cart", JSON.stringify(cart));
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
          cart={cart}
          setCart={setCart}
          balls={balls}
          setBalls={setBalls}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
      <div className="lg:w-1/3">
        <Account cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}
