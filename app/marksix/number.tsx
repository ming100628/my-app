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

  function renderColor(index: number, type: string) {
    var color = type;
    if (index % 6 === 0) color += "-red-";
    else if (index % 6 === 1) color += "-blue-";
    else if (index % 6 === 2) color += "-pink-";
    else if (index % 6 === 3) color += "-yellow-";
    else if (index % 6 === 4) color += "-green-";
    else if (index % 6 === 5) color += "-orange-";
    if (type === "border") {
      color += "500";
    } else {
      if (!selected[index]) color += "0";
      else color += "500";
    }
    return color;
  }

  function saveConfig(numbers: number[]) {
    var temp2 = [...saved];
    temp2.push(numbers);
    setSaved(temp2);
  }

  return (
    <>
      <div className="px-50 py-8 flex h-full w-full justify-center bg-green-200 items-center">
        {Array.from({ length: 7 }).map((_, i) => (
          <div className="block items-center justify-center">
            {Array.from({ length: 7 }).map((_, j) => (
              <button
                className={`rounded-full ${renderColor(
                  i * 7 + j + 1,
                  "border"
                )} border-5 
                  
                  ${renderColor(
                    i * 7 + j + 1,
                    "bg"
                  )} w-10 h-10 flex items-center justify-center text-justify text-center font-bold`}
                onClick={() => {
                  const temp3 = [...selected];
                  var newSelectedCount = selectedcount;
                  if (temp3[i * 7 + j + 1]) {
                    newSelectedCount = selectedcount - 1;
                  } else {
                    newSelectedCount = selectedcount + 1;
                  }
                  if (newSelectedCount > 6) {
                    alert("You can only select 6 numbers.");
                    return;
                  } else {
                    temp3[i * 7 + j + 1] = !temp3[i * 7 + j + 1];
                  }
                  setSelectedCount(newSelectedCount);
                  setSelected(temp3);
                }}
              >
                {i * 7 + j + 1} &nbsp;
              </button>
            ))}
          </div>
        ))}
        <button
          className="rounded-md h-15 w-35 border-2 hover:bg-red-500 border-red-700"
          onClick={() => {
            var temp4 = [];
            for (var i = 0; i < selected.length; i++) {
              if (selected[i]) {
                temp4.push(i);
              }
            }
            if (temp4.length < 6) {
              alert("Please select 6 numbers.");
              return;
            }
            if (temp4.length > 6) {
              alert("You can only select 6 numbers.");
              return;
            }
            saveConfig(temp4 as number[]);
            var temp5 = [...selected];
            for (var i = 0; i < temp5.length; i++) {
              temp5[i] = false;
            }
            setSelected(temp5);
            setSelectedCount(0);
            alert("Selections saved!");
          }}
        >
          Add Selections
        </button>
        <div>
          <div className="flex items-center justify-center text-2xl font-bold">
            Saved Selections:
          </div>
          {saved.map((element, index) => {
            return (
              <>
                <div
                  key={index}
                  className="flex items-center justify-center text-2xl font-bold"
                >
                  {element.join(", ")}
                </div>
                <button
                  className="flex items-center justify-center text-2xl font-bold border-2 hover:bg-red-500 border-red-700"
                  onClick={() => {
                    var temp6 = [...saved];
                    temp6.splice(index, 1);
                    setSaved(temp6);
                  }}
                >
                  Delete
                </button>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
