"use client";
import { get } from "http";
import { useEffect, useState } from "react";
export default () => {
  const [balance, setBalance] = useState<number>(getBalance());
  const [tickets, setTickets] = useState<number[][]>(getTickets());
  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [balance, tickets]);
  function getBalance(): number {
    return JSON.parse(localStorage.getItem("balance") || "300");
  }
  function getTickets(): number[][] {
    console.log(JSON.parse(localStorage.getItem("tickets") || "[][]"));
    return JSON.parse(localStorage.getItem("tickets") || "[][]");
  }

  function purchase() {
    const ticket = tickets.find((ticket) => ticket.length < 6);
    if (ticket) {
      setTickets(tickets.filter((t) => t !== ticket));
      setBalance(balance - 10);
    } else {
      alert("No tickets available for purchase.");
    }
  }
  return (
    <>
      <div className="grow-3">
        Balance: {balance}
        <button className="h-4 w-130 bg-red-100">Add Selections</button>
        <button className="h-4 w-10 bg-red-100">Buy</button>
      </div>
      {getTickets().map((ticket, index) => (
        {ticket.map((ball, index) => (
          <div
            key={index}
            className={`rounded-full border-4 bg-red-100 w-12 h-12 flex items-center justify-center font-bold text-xl`}
          >
            {ball}
          </div>
        ))}
        }
      ))}
    </>
  );
};
