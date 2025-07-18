import { motion } from "framer-motion";
import { BGCOLORS, BORDERCOLORS } from "../utils/constants";

export function generateQuickPick(): number[] {
  const quickPick: number[] = [];
  while (quickPick.length < 6) {
    const random = Math.floor(Math.random() * 49) + 1;
    if (!quickPick.includes(random)) {
      quickPick.push(random);
    }
  }

  return quickPick.sort((a, b) => a - b);
}

export function selectBallIndex(balls: number[][]): number {
  const index = balls.findIndex((group) => group.length < 6);
  return index === -1 ? balls.length : index;
}

export function addOrRemoveBall(
  balls: number[][],
  setBalls: (balls: number[][]) => void,
  selectedIndex: number,
  setSelectedIndex: (index: number) => void,
  ballNumber: number
) {
  const updatedBalls = [...balls];
  const currentSelection = updatedBalls[selectedIndex] || [];

  // If the ball already exists in the current selection, remove it
  if (currentSelection.includes(ballNumber)) {
    updatedBalls[selectedIndex] = currentSelection.filter(
      (number) => number !== ballNumber
    );
    setBalls(updatedBalls.filter((group) => group.length > 0)); // Remove empty groups
    return;
  }

  // If the current selection has less than 6 numbers, add the ball
  if (currentSelection.length < 6) {
    updatedBalls[selectedIndex] = [...currentSelection, ballNumber].sort(
      (a, b) => a - b
    );
    setBalls(updatedBalls);
    return;
  }

  // If the current selection is full, find or create a new group
  const newIndex = selectBallIndex(updatedBalls);
  setSelectedIndex(newIndex);
  if (selectedIndex != newIndex) {
    addOrRemoveBall(
      updatedBalls,
      setBalls,
      newIndex,
      setSelectedIndex,
      ballNumber
    );
  } else {
    setBalls(updatedBalls);
  }
}

export function addBall(
  balls: number[][],
  setBalls: (balls: number[][]) => void,
  rowIndex: number,
  ballNumber: number
) {
  const updatedBalls = [...balls];
  updatedBalls[rowIndex] = updatedBalls[rowIndex] || [];
  const currentSelection = updatedBalls[rowIndex];

  // Prevent adding more than 6 numbers to a row
  if (currentSelection.length >= 6) {
    return;
  }

  if (!currentSelection.includes(ballNumber)) {
    currentSelection.push(ballNumber);
    updatedBalls[rowIndex] = [...currentSelection].sort((a, b) => a - b);
    setBalls(updatedBalls);
  }
}

export function removeBall(
  balls: number[][],
  setBalls: (balls: number[][]) => void,
  rowIndex: number,
  ballNumber: number
) {
  const updatedBalls = [...balls];
  updatedBalls[rowIndex] = updatedBalls[rowIndex].filter(
    (number) => number !== ballNumber
  );
  setBalls(updatedBalls.filter((group) => group.length > 0));
}

export function renderColor(index: number, type: string): string {
  if (type === "text") {
    return "text-white";
  } else if (type === "border") {
    return BORDERCOLORS[index % 8];
  } else if (type === "bg") {
    return BGCOLORS[index % 8];
  }
  return "";
}

export function renderBall(
  balls: number[][],
  setBalls: (balls: number[][]) => void,
  selectedIndex: number,
  setSelectedIndex: (index: number) => void,
  rowIndex: number,
  ballNumber: number,
  left: boolean
) {
  const currentBalls = balls[selectedIndex];
  const selected = currentBalls?.includes(ballNumber);

  const text = ((left && selected) || !left) && renderColor(ballNumber, "text");
  const background =
    ((left && selected) || !left) && renderColor(ballNumber, "bg");
  const border = renderColor(ballNumber, "border");

  const handleClick = () => {
    if (left) {
      addOrRemoveBall(
        balls,
        setBalls,
        selectedIndex,
        setSelectedIndex,
        ballNumber
      );
    } else {
      removeBall(balls, setBalls, rowIndex, ballNumber);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, rotate: left ? 0 : 360, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="items-center font-bold"
      key={`${rowIndex}-${ballNumber}`}
    >
      <button
        className={`cursor-pointer rounded-full border-2 ${text} ${background} ${border} w-10 h-10 flex items-center justify-center font-bold text-xl transition duration-500 ease-in-out`}
        onClick={handleClick}
      >
        {ballNumber}
      </button>
    </motion.div>
  );
}
