"use client";
import { AnimatePresence, motion } from "framer-motion";
import { NumberSelectionProps } from "./interfaces";
import { generateQuickPick, renderBall } from "./numberFunctions";

export default function NumberSelection({
  balls,
  setBalls,
  selectedIndex,
  setSelectedIndex,
}: NumberSelectionProps) {
  const handleQuickPick = () => {
    const quickPick = generateQuickPick();
    setBalls([...balls, quickPick]);
  };

  const handleDeleteRow = (rowIndex: number) => {
    const updatedBalls = balls.filter((_, i) => i !== rowIndex);
    setSelectedIndex(0);
    setBalls(updatedBalls);
  };

  return (
    <div className="w-full">
      <div className="h-12 bg-gray-400 flex items-center justify-center text-xl font-bold w-full">
        Number Selection
      </div>
      <div className="font-bold lg:h-[calc(100vh-24rem)] overflow-auto">
        <AnimatePresence>
          {balls.map((selection, rowIndex) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              key={rowIndex}
              className={`flex space-x-4 items-center justify-between rounded-md bg-gray-100 h-12 m-2 ${
                selectedIndex === rowIndex && "bg-gray-200"
              }`}
              onClick={() => setSelectedIndex(rowIndex)}
            >
              <div className="h-full space-x-4 flex items-center font-bold pl-8">
                <AnimatePresence>
                  {selection.map((number) =>
                    renderBall(
                      balls,
                      setBalls,
                      selectedIndex,
                      setSelectedIndex,
                      rowIndex,
                      number,
                      false
                    )
                  )}
                </AnimatePresence>
              </div>
              <button
                className="cursor-pointer p-2 m-8 rounded-md bg-red-500 text-white"
                onClick={() => handleDeleteRow(rowIndex)}
              >
                Delete
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="text-right p-4">
          <button
            onClick={handleQuickPick}
            className="bg-green-500 text-white p-2 mr-6 rounded-md cursor-pointer"
          >
            Quick +
          </button>
        </div>
      </div>
    </div>
  );
}
