"use client";
import { useState } from "react";

export default () => {
  const [tab, setTab] = useState("Next Draw");
  const tabs = ["Next Draw", "Snowball Draw", "Info Centre"];

  function renderColor(currentTab: string) {
    if (currentTab !== tab) return "bg-gray-400";
    if (currentTab === "Next Draw") {
      return "bg-orange-500";
    } else if (currentTab === "Snowball Draw") {
      return "bg-yellow-500";
    } else if (currentTab === "Info Centre") {
      return "bg-blue-500";
    }
  }
  return (
    <div className="h-full w-80">
      <div className="h-10 w-full bg-gray-400 flex items-center justify-center text-xs font-bold">
        {tabs.map((element, index) => (
          <button
            key={index}
            className={`h-full w-1/3 ${renderColor(
              element
            )} flex items-center justify-center`}
            onClick={() => {
              setTab(element);
            }}
          >
            {element}
          </button>
        ))}
      </div>
      <div className="h-64 w-full bg-gray-300 flex items-center justify-center text-2xl font-bold">
        {tab}
      </div>
    </div>
  );
};
