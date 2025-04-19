"use client";
import { useState } from "react";

export default () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[][]>([]);

  function handleBallClick(index: number, pos: boolean) {
    if (pos) return;
    const temp2 = [...selected];

    if (temp2.includes(index)) {
      temp2.splice(temp2.indexOf(index), 1);
    } else {
      temp2.push(index);
    }
    temp2.sort((a, b) => a - b);
    setSelected(temp2);
    if (temp2.length >= 6) {
      const temp3 = [...saved];

      temp3.push(temp2);
      setSaved(temp3);
      setSelected([]);
    }
  }

  function renderColor(index: number, type: string, position: boolean) {
    const bgcolors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-pink-500",
      "bg-yellow-900",
      "bg-green-500",
      "bg-orange-500",
      "bg-gray-500",
      "bg-purple-500",
    ];
    const bordercolors = [
      "border-red-500",
      "border-blue-500",
      "border-pink-500",
      "border-yellow-900",
      "border-green-500",
      "border-orange-500",
      "border-gray-500",
      "border-purple-500",
    ];
    if (position) {
      if (type == "text") return "text-black";
      if (type == "border") return bordercolors[index % 8];
      if (type == "bg") return "bg-white";
    }

    if (type === "text") {
      if (selected.includes(index)) return "text-white";
      return "text-black";
    }
    if (type === "border") {
      return bordercolors[index % 8];
    } else {
      if (selected.includes(index)) return bgcolors[index % 8];
      return "bg-white";
    }
  }

  function renderBall(index: number, pos: boolean, pos2: number = -1) {
    if (pos2 !== -1) {
      return (
        <button
          key={index}
          className={`rounded-full ${renderColor(
            index,
            "border",
            pos
          )} border-4 ${renderColor(index, "bg", pos)} ${renderColor(
            index,
            "text",
            pos
          )} w-16 h-16 flex items-center justify-center font-bold text-2xl`}
          onClick={() => selected.splice(pos2, 1)}
        >
          {index}
        </button>
      );
    }
    return (
      <button
        key={index}
        className={`rounded-full ${renderColor(
          index,
          "border",
          pos
        )} border-4 ${renderColor(index, "bg", pos)} ${renderColor(
          index,
          "text",
          pos
        )} w-16 h-16 flex items-center justify-center font-bold text-2xl`}
        onClick={() => handleBallClick(index, pos)}
      >
        {index}
      </button>
    );
  }

  function renderSelected() {
    if (selected.length > 0) {
      return (
        <div
          key={saved.length}
          className={`flex space-x-4 items-center justify-center rounded-md border-8 ${renderColor(
            saved.length,
            "border",
            false
          )}`}
        >
          {selected.map((number, index) => renderBall(number, true, index))}
        </div>
      );
    } else return <div></div>;
  }
  return (
    <div className="flex h-full w-full bg-grey-100">
      <div className="w-[35%] h-full bg-red-300 border-8 rounded-md border-gray-500 flex-col-2 items-center justify-center ">
        <div className="w-full h-full items-center justify-center flex flex-col">
          {Array.from({ length: 7 }).map((_, i) => (
            <div className="flex space-x-3 space-y-3" key={i}>
              {Array.from({ length: 7 }).map(
                (_, j) => renderBall(i * 7 + j + 1, false) // Adjust the index to start from 1
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[65%] h-full bg-blue-300 border-8 rounded-md border-purple-500 flex-col-2 items-center justify-center">
        <div className="w-[100%] h-[10%] bg-gray-400 flex items-center justify-center text-xl font-bold">
          Saved Selections
        </div>
        <div className="w-full h-[90%] items-center justify-center text-2xl font-bold ">
          {saved.map((selection, index) => (
            <div
              key={index}
              className={`flex space-x-4 items-center justify-center rounded-md border-8 ${renderColor(
                index,
                "border",
                false
              )}`}
            >
              <div className="h-full w-[80%] space-x-4 flex items-center justify-center text-2xl font-bold">
                {selection.map((number) => renderBall(number, true))}
              </div>
              <button
                className="h-full w-[20%]"
                onClick={() => saved.splice(index, 1)}
              >
                Delete
              </button>
            </div>
          ))}
          {renderSelected()}
        </div>
      </div>
    </div>
  );
};
