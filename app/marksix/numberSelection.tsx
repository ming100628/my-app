"use client";
import { AnimatePresence, motion } from "framer-motion";
import { NumberProps, CartProps } from "./interfaces";
import { generateQuickPick, renderBall } from "./numberFunctions";

export default function NumberSelection({
  balls,
  setBalls,
  cart,
  setCart,
  selectedIndex,
  setSelectedIndex,
}: NumberProps & CartProps) {
  const handleQuickPick = () => {
    const quickPick = generateQuickPick();
    setBalls([...balls, quickPick]);
  };

  const handleDeleteRow = (rowIndex: number) => {
    const updatedBalls = balls.filter((_, i) => i !== rowIndex);
    setSelectedIndex(0);
    setBalls(updatedBalls);
  };

  function addToCart(rowIndex: number) {
    const selectedBalls: number[] = [...balls[rowIndex]];
    handleDeleteRow(rowIndex);
    setCart([...cart, selectedBalls]);
  }

  return (
    <div className="w-full">
      <div className="h-12 bg-gray-400 flex items-center justify-center text-xl font-bold w-full">
        Number Selection
      </div>
      <div className="font-bold lg:h-[calc(100vh-24rem)] overflow-auto">
        <div className="text-right p-2 w-full">
          <button
            onClick={handleQuickPick}
            className="bg-green-500 text-white p-1 rounded-md cursor-pointer w-full"
          >
            Quick +
          </button>
        </div>
        {balls.map((selection, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex space-x-4 items-center justify-between rounded-md bg-gray-100 h-12 m-2 ${
              selectedIndex === rowIndex && "bg-gray-200"
            }`}
            onClick={() => setSelectedIndex(rowIndex)}
          >
            <div className="h-full space-x-4 flex items-center font-bold pl-8">
              {selection.map((number) =>
                renderBall(
                  balls,
                  setBalls,
                  selectedIndex,
                  setSelectedIndex,
                  rowIndex,
                  number,
                  false
                )
              )}
            </div>
            <div className="space-x-2">
              <button
                className="text-white bg-green-500 p-2 rounded-md"
                onClick={() => addToCart(rowIndex)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
              <button
                className="cursor-pointer p-2 rounded-md bg-red-500 text-white"
                onClick={() => handleDeleteRow(rowIndex)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
