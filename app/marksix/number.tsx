"use client";
import { useState } from "react";
import { BGCOLORS, BORDERCOLORS } from "../utils/constants";

export default () => {
  const [balls, setBalls] = useState<number[][]>([[]]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  function searchEmptyArray() {
    if (balls.find((arr) => arr.length === 0)) {
      return true;
    } else {
      return false; // Return -1 if no empty array is found
    }
  }

  function handleBallClick(index: number) {
    const temp2 = [...balls];

    if (temp2[selectedIndex].includes(index)) {
      temp2[selectedIndex].splice(temp2[selectedIndex].indexOf(index), 1);
    } else if (temp2[selectedIndex].length < 6) {
      temp2[selectedIndex].push(index);
    }
    temp2[selectedIndex].sort((a, b) => a - b);
    setBalls(temp2);
    if (balls[selectedIndex].length >= 6) {
      const temp3 = [...balls];

      if (!searchEmptyArray()) temp3.push([]);
      setSelectedIndex(temp3.length - 1);
      setBalls(temp3);
    }
  }

  function renderColor(index: number, type: string) {
    if (type === "text") {
      return "text-white";
    }

    if (type === "border") {
      return BORDERCOLORS[index % 8];
    }

    return BGCOLORS[index % 8];
  }

  function renderBall(index: number, left: boolean) {
    return (
      <button
        key={index}
        className={`rounded-full ${
          !left && renderColor(index, "border")
        } border-4 ${!left && renderColor(index, "bg")} ${
          !left && renderColor(index, "text")
        } w-16 h-16 flex items-center justify-center font-bold text-2xl`}
        onClick={left ? () => {} : () => handleBallClick(index)}
      >
        {index}
      </button>
    );
  }

  return (
    <div className="flex h-full w-full bg-grey-100">
      <div className="w-[35%] h-full bg-red-300 border-8 rounded-md border-gray-500 flex-col-2 items-center justify-center ">
        <div className="w-full h-full items-center justify-center flex flex-col">
          {Array.from({ length: 7 }).map((_, i) => (
            <div className="flex space-x-3 space-y-3" key={i}>
              {Array.from({ length: 7 }).map((_, j) =>
                renderBall(i * 7 + j + 1, false)
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[65%] h-full bg-blue-300 border-8 rounded-md border-purple-500 flex-col-2 items-center justify-center">
        <div className="w-[100%] h-[10%] bg-gray-400 flex items-center justify-center text-xl font-bold">
          balls Selections
        </div>
        <div className="w-full h-[90%] items-center justify-center text-2xl font-bold ">
          {balls.map((selection, index) => (
            <div
              key={index}
              className={`flex space-x-4 items-center justify-center rounded-md border-8`}
            >
              <div className="h-full w-[80%] space-x-4 flex items-center justify-center text-2xl font-bold">
                {selection.map((number) => renderBall(number, false))}
              </div>
              <button
                className="h-full w-[20%]"
                onClick={() => setBalls(balls.filter((_, i) => i !== index))}
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
