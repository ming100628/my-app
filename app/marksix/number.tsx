"use client";
import { useEffect, useState } from "react";
import { BGCOLORS, BORDERCOLORS } from "../utils/constants";

export default () => {
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

  function selectBallIndex() {
    const index = balls.findIndex((group) => group.length < 6);
    return index === -1 ? balls.length : index;
  }

  function addOrRemoveBall(rowIndex: number, ballNumber: number) {
    const currentSelection = balls[rowIndex] || [];

    if (currentSelection.includes(ballNumber)) {
      removeBall(rowIndex, ballNumber);
    } else {
      const index =
        currentSelection.length < 6 ? selectedIndex : selectBallIndex();
      setSelectedIndex(index);
      addBall(index, ballNumber);
    }
  }

  function addBall(rowIndex: number, ballNumber: number) {
    const updatedBalls = [...balls];
    updatedBalls[rowIndex] = updatedBalls[rowIndex] || [];
    const currentSelection = updatedBalls[rowIndex];

    if (!currentSelection.includes(ballNumber)) {
      currentSelection.push(ballNumber);
      currentSelection.sort((a, b) => a - b);
      updatedBalls[rowIndex] = currentSelection;
      setBalls(updatedBalls);
    }
  }

  function removeBall(rowIndex: number, ballNumber: number) {
    const newBalls = [...balls];
    newBalls[rowIndex] = newBalls[rowIndex].filter(
      (number) => number !== ballNumber
    );
    setBalls(newBalls.filter((group) => group.length !== 0));
  }

  function renderColor(index: number, type: string) {
    if (type === "text") {
      return "text-white";
    } else if (type === "border") {
      return BORDERCOLORS[index % 8];
    } else if (type === "bg") {
      return BGCOLORS[index % 8];
    }
  }

  function renderBall(rowIndex: number, ballNumber: number, left: boolean) {
    const currentBalls = balls[selectedIndex];
    const selected =
      currentBalls && currentBalls.find((number) => number === ballNumber);

    const text =
      ((left && selected) || !left) && renderColor(ballNumber, "text");
    const background =
      ((left && selected) || !left) && renderColor(ballNumber, "bg");
    const border = renderColor(ballNumber, "border");

    return (
      <button
        key={`${rowIndex}-${ballNumber}`}
        className={`cursor-pointer rounded-full border-4 ${text} ${background} ${border} w-12 h-12 flex items-center justify-center font-bold text-xl`}
        onClick={
          left
            ? () => addOrRemoveBall(selectedIndex, ballNumber)
            : () => removeBall(rowIndex, ballNumber)
        }
      >
        {ballNumber}
      </button>
    );
  }

  function addToCart(selectionIndex: number) {
    var currentTickets = JSON.parse(localStorage.getItem("tickets") || "[][]");
    currentTickets.push(balls[selectionIndex]);
    localStorage.setItem("tickets", JSON.stringify(currentTickets));
    const newBalls = [...balls].filter((_, i) => i !== selectionIndex);
    setSelectedIndex(0);
    setBalls(newBalls);
  }

  return (
    <div className="flex h-full bg-grey-100">
      <div className="w-1/2 p-8 h-full bg-red-300 border-8 rounded-md border-gray-500 flex-col-2 items-center justify-center ">
        <div className="w-full h-full items-center justify-center flex flex-col">
          {Array.from({ length: 7 }).map((_, rowIndex) => (
            <div className="flex space-x-3 space-y-3" key={rowIndex}>
              {Array.from({ length: 7 }).map((_, colIndex) =>
                renderBall(rowIndex, rowIndex * 7 + colIndex + 1, true)
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 h-full bg-blue-300 border-8 rounded-md border-purple-500 flex-col-2 items-center justify-center">
        <div className="h-10 bg-gray-400 flex items-center justify-center text-xl font-bold">
          Balls Selections
        </div>
        <div className="font-bold">
          {balls.map((selection, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex space-x-3 items-center justify-between rounded-md bg-amber-100 h-16 m-2 ${
                selectedIndex === rowIndex && "bg-amber-200"
              }`}
              onClick={() => setSelectedIndex(rowIndex)}
            >
              <div className="h-full space-x-3 flex items-center font-bold pl-8">
                {selection.map((number) => renderBall(rowIndex, number, false))}
              </div>
              <button
                className="cursor-pointer p-2 m-8 rounded-md bg-green-500 text-white"
                onClick={() => {
                  addToCart(rowIndex);
                }}
              >
                Add to Cart
              </button>

              <button
                className="cursor-pointer p-2 m-8 rounded-md bg-red-500 text-white"
                onClick={() => {
                  const newBalls = [...balls].filter((_, i) => i !== rowIndex);
                  setSelectedIndex(0);
                  setBalls(newBalls);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
