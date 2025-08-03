"use client";

import { BGCOLORS, BORDERCOLORS } from "../utils/constants";
import { PastDraw } from "./interfaces";

export default ({ pastDraws }: { pastDraws: PastDraw[] }) => {
  function renderColor(index: number, type: string): string {
    if (type === "text") {
      return "text-white";
    } else if (type === "border") {
      return BORDERCOLORS[index % 8];
    } else if (type === "bg") {
      return BGCOLORS[index % 8];
    }
    return "";
  }

  function renderBall(ballNumber: number, index: number) {
    const text = renderColor(index, "text");
    const background = renderColor(index, "bg");
    const border = renderColor(index, "border");

    return (
      <div className="items-center font-bold" key={index}>
        <button
          className={`cursor-pointer rounded-full border-2 ${text} ${background} ${border} w-10 h-10 flex items-center justify-center font-bold text-xl transition duration-500 ease-in-out`}
          // onClick={handleClick}
        >
          {ballNumber}
        </button>
      </div>
    );
  }
  return (
    <div className="h-full flex-grow bg-red-300 overflow-auto">
      {
        <div>
          {pastDraws.map((pastDraw) => (
            <div className="flex" id={pastDraw.id}>
              <div>
                {pastDraw.year}-{pastDraw.month + 1}-{pastDraw.day}
              </div>
              <div className="flex">
                {pastDraw.numbers.map((ballNumber, idx) =>
                  renderBall(ballNumber, idx)
                )}
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};
// 2025-6-30
