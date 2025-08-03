"use client";

import { PastDraw } from "./interfaces";

export default ({ pastDraws }: { pastDraws: PastDraw[] }) => {
  return (
    <div className="h-full flex-grow bg-red-300">
      {
        <div>
          {pastDraws.map((pastDraw) => (
            <div id={pastDraw.id}>
              {pastDraw.year}-{pastDraw.month + 1}-{pastDraw.day}
            </div>
          ))}
        </div>
      }
    </div>
  );
};
// 2025-6-30
