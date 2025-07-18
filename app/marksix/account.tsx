"use client";
import { AnimatePresence, motion } from "framer-motion";
import { renderBall } from "./numberFunctions";
export default ({
  balance,
  setBalance,
  balls,
  setBalls,
  selectedIndex,
  setSelectedIndex,
  purchasedBalls,
  setPurchasedBalls,
}: {
  balance: number;
  setBalance: (amount: number) => void;
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
  setPurchasedBalls: (
    balls: {
      id: string;
      numbers: number[];
    }[]
  ) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  purchasedBalls: {
    id: string;
    ddate: Date;
    numbers: number[];
  }[];
}) => {
  const renderNumberBall = (selection: any, number: number) => (
    <motion.div
      key={`selection-${selection.id}-ball-${number}`}
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      {renderBall(
        balls,
        setBalls,
        selectedIndex,
        setSelectedIndex,
        selection.id,
        number,
        false
      )}
    </motion.div>
  );

  function purchase(
    balls: { id: string; numbers: number[] }[],
    balance: number
  ) {
    const completeSets = balls
      .filter((el) => el.numbers.length === 6)
      .map((el) => {
        return {
          ddate: new Date(Date.now() + 24 * 60 * 60 * 1000),
          ...el,
        };
      });
    if (balance < completeSets.length * 10) {
      alert("You don't have enough money.");
    } else {
      setBalance(balance - completeSets.length * 10);
      setPurchasedBalls(purchasedBalls.concat(completeSets));
      setBalls(balls.filter((el) => el.numbers.length !== 6));
    }
  }

  const renderRow = (selection: any, rowIndex: number) => {
    const rowKey = selection.id;
    const rowClass = [
      "flex space-x-4 items-center justify-between rounded-md bg-gray-100 h-12 mb-2",
      selectedIndex === rowIndex ? "bg-gray-200" : "",
    ].join(" ");
    const sortedNumbers = [...selection.numbers].sort((a, b) => a - b);
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        key={rowKey}
        className={rowClass}
      >
        <div className="h-full space-x-2 flex items-center font-bold pl-8">
          {selection.ddate && (
            <span className="text-sm text-gray-600">
              {selection.ddate.toLocaleDateString()}
            </span>
          )}
          <AnimatePresence mode="popLayout">
            {sortedNumbers.map((number) => renderNumberBall(selection, number))}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };
  return (
    <div className="h-full">
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
        {purchasedBalls.map(renderRow)}
      </div>
    </div>
  );
};
