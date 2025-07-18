"use client";
import { AnimatePresence } from "framer-motion";
import { renderBall } from "./numberFunctions";
import { NumberSelectionProps, BallSelection } from "./interfaces";

export default function Numbers(props: NumberSelectionProps) {
  const { balls, setBalls, selectedIndex, setSelectedIndex } = props;
  // DRY: Helper to render a single grid ball
  const renderGridBall = (number: number) => (
    <div key={`grid-ball-wrapper-${number}`}>
      {renderBall(
        balls,
        setBalls,
        selectedIndex,
        setSelectedIndex,
        `grid-${number}`,
        number,
        true
      )}
    </div>
  );

  return (
    <div className="h-full">
      <div className="h-12 bg-gray-400 flex items-center justify-center text-xl font-bold w-full">
        Numbers
      </div>
      <div className="flex justify-center py-2">
        <div className="grid grid-cols-7 gap-2">
          <AnimatePresence mode="popLayout">
            {Array.from({ length: 49 }, (_, i) => renderGridBall(i + 1))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
