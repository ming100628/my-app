"use client";
import { renderBall } from "./numberFunctions";
import { NumberProps } from "./interfaces";

export default function Numbers({
  balls,
  setBalls,
  selectedIndex,
  setSelectedIndex,
}: NumberProps) {
  return (
    <div className="h-full">
      <div className="h-12 bg-gray-400 flex items-center justify-center text-xl font-bold w-full">
        Numbers
      </div>
      <div className="lg:h-[calc(100%-3rem)] flex items-center justify-center">
        <div>
          {Array.from({ length: 7 }).map((_, rowIndex) => (
            <div className="flex space-x-2 space-y-2" key={rowIndex}>
              {Array.from({ length: 7 }).map((_, colIndex) =>
                renderBall(
                  balls,
                  setBalls,
                  selectedIndex,
                  setSelectedIndex,
                  rowIndex,
                  rowIndex * 7 + colIndex + 1,
                  true
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
