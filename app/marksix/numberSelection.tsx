"use client";
import { AnimatePresence, motion } from "framer-motion";
import { NumberSelectionProps } from "./interfaces";
import { generateQuickPick, renderBall } from "./numberFunctions";

export default function NumberSelection(props: NumberSelectionProps) {
  const { balls, setBalls, selectedIndex, setSelectedIndex } = props;
  const handleQuickPick = () => {
    const quickPick = generateQuickPick();
    setBalls([...balls, { id: crypto.randomUUID(), numbers: quickPick }]);
  };

  const handleDeleteRow = (rowId: string) => {
    const updatedBalls = balls.filter((b) => b.id !== rowId);
    setSelectedIndex(0);
    setBalls(updatedBalls);
  };

  // DRY: Helper to render a single number ball in a row
  const renderNumberBall = (selection: any, number: number) => (
    <motion.div
      key={`selection-${selection.id}-ball-${number}`}
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      {renderBall(
        balls,
        setBalls,
        selectedIndex,
        setSelectedIndex,
        selection.id,
        number,
        false
      )}
    </motion.div>
  );

  // DRY: Helper to render a row
  const renderRow = (selection: any, rowIndex: number) => {
    const rowKey = selection.id;
    const rowClass = [
      "flex space-x-4 items-center justify-between rounded-md bg-gray-100 h-12 mb-2",
      selectedIndex === rowIndex ? "bg-gray-200" : "",
    ].join(" ");
    const sortedNumbers = [...selection.numbers].sort((a, b) => a - b);
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        key={rowKey}
        className={rowClass}
        onClick={() => setSelectedIndex(rowIndex)}
      >
        <div className="h-full space-x-2 flex items-center font-bold pl-8">
          <AnimatePresence mode="popLayout">
            {sortedNumbers.map((number) => renderNumberBall(selection, number))}
          </AnimatePresence>
        </div>
        <button
          className="transition-all hover:scale-105 cursor-pointer p-2 mx-4 rounded-md bg-red-500 text-white"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteRow(selection.id);
          }}
        >
          Delete
        </button>
      </motion.div>
    );
  };

  return (
    <div className="w-full">
      <div className="h-12 bg-gray-400 flex items-center justify-center text-xl font-bold w-full">
        Number Selection
      </div>
      <div className="font-bold lg:h-[calc(100vh-24rem)] overflow-auto p-2">
        <AnimatePresence mode="popLayout">
          {balls.map(renderRow)}
        </AnimatePresence>
        <button
          onClick={handleQuickPick}
          className="transition-all hover:scale-105 bg-green-500 text-white p-2 rounded-md cursor-pointer float-right mt-2"
        >
          Quick +
        </button>
      </div>
    </div>
  );
}
