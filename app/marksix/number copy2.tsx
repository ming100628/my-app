"use client";
import { useState } from "react";

export default () => {
  var temp = [];
  for (var i = 0; i < 50; i++) {
    temp.push(false);
  }
  const [selected, setSelected] = useState<boolean[]>(temp);
  const [selectedcount, setSelectedCount] = useState<number>(0);
  const [saved, setSaved] = useState<number[][]>([]);

  function resetSelected() {
    var temp = [];
    for (var i = 0; i < 50; i++) {
      temp.push(false);
    }
    setSelected(temp);
  }

  function saveConfig(numbers: number[]) {
    var temp2 = [...saved];
    temp2.push(numbers);
    setSaved(temp2);
  }
  function handleBallClick(index: number) {
    const temp3 = [...selected];
    var newSelectedCount = selectedcount;
    // if (temp3[index]) {
    //   newSelectedCount = selectedcount - 1;
    // } else {
    //   newSelectedCount = selectedcount + 1;
    // }
    // selected.filter((element) => element).length;
    // if (selected.filter((element) => element).length > 6) {
    //   alert("You can only select 6 numbers.");
    //   return;
    // } else {
    // }
    temp3[index] = !temp3[index];
    setSelectedCount(selected.filter((element) => element).length);
    setSelected(temp3);
    saveAndReset();
  }

  function saveAndReset() {
    console.log(selected.filter((element) => element).length);
    if (selectedcount < 6) return;

    setSelectedCount(0);
    resetSelected();
  }

  function renderColor(index: number, type: string) {
    const bgcolors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-pink-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-orange-500",
      "bg-gray-500",
      "bg-purple-500",
    ];
    const bordercolors = [
      "border-red-500",
      "border-blue-500",
      "border-pink-500",
      "border-yellow-500",
      "border-green-500",
      "border-orange-500",
      "border-gray-500",
      "border-purple-500",
    ];

    if (type === "text") {
      if (selected[index]) return "text-white";
      else return "text-black";
    }
    if (type === "border") {
      return bordercolors[index % 8];
    } else {
      if (selected[index]) {
        return bgcolors[index % 8];
      } else return "bg-white";
    }
  }

  function renderBall(index: number) {
    return (
      <button
        key={index}
        className={`rounded-full ${renderColor(index, "border")} border-2
      
      ${renderColor(index, "bg")}
      
      ${renderColor(
        index,
        "text"
      )} w-10 h-10 flex items-center justify-center font-bold`}
        onClick={() => handleBallClick(index)}
      >
        {index}
      </button>
    );
  }

  return (
    <div className="px-50 py-8 h-full w-full justify-center bg-green-200 items-center">
      <div className="flex flex-col items-center justify-center space-y-2 bg-white p-4 rounded-lg shadow-lg">
        {Array.from({ length: 7 }).map((_, i) => (
          <div className="flex space-x-2" key={i}>
            {Array.from({ length: 7 }).map(
              (_, j) => renderBall(i * 7 + j + 1) // Adjust the index to start from 1
            )}
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-center space-x-2">
        <div className="w-full">
          <div className="text-left text-2xl font-bold">Saved Selections:</div>
          {saved.map((element, index) => {
            return (
              <div key={index}>
                {renderBall(index)}
                <button
                  key={index}
                  className="flex items-center justify-center text-2xl font-bold border-2 hover:bg-red-500 border-red-700"
                  onClick={() => {
                    var temp6 = [...saved];
                    temp6.splice(index, 1);
                    setSaved(temp6);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
          <div className="flex">
            {selected.map((element, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center justify-center text-2xl font-bold">
                    {element ? index : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
