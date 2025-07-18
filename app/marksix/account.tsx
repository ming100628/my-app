"use client";
import { NumberSelectionProps } from "./interfaces";
import { purchase } from "./numberFunctions";

export default ({
  balance,
  balls,
  setBalls,
  selectedIndex,
  setSelectedIndex,
}: {
  balance: number;
  balls: {
    id: string;
    numbers: number[];
  }[];
  setBalls: (
    balls: {
      id: string;
      numbers: number[];
    }[]
  ) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}) => {
  return (
    <div className="h-full">
      <div className="h-12 bg-gray-400 flex items-center justify-center text-xl font-bold w-full">
        Account
      </div>
      <div className="items-center justify-center flex flex-col">
        <div className="h-12 bg-gray-400 flex items-center justify-center text-xl font-bold w-full">
          Account Balance: {balance}
        </div>
        <button
          className="h-12 bg-red-400 flex items-center justify-center text-l font-bold w-full rounded-md"
          onClick={() => purchase(balls, balance)}
        >
          Buy Tickets
        </button>
      </div>
    </div>
  );
};
