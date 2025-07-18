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

export function selectBallIndex(
  balls: { id: string; numbers: number[] }[]
): number {
  const index = balls.findIndex((group) => group.numbers.length < 6);
  return index === -1 ? balls.length : index;
}

export function addOrRemoveBall(
  balls: { id: string; numbers: number[] }[],
  setBalls: (balls: { id: string; numbers: number[] }[]) => void,
  selectedIndex: number,
  setSelectedIndex: (index: number) => void,
  ballNumber: number
) {
  const updatedBalls = [...balls];
  const currentSelection = updatedBalls[selectedIndex]?.numbers || [];

  // If the ball already exists in the current selection, remove it
  if (currentSelection.includes(ballNumber)) {
    updatedBalls[selectedIndex] = {
      ...updatedBalls[selectedIndex],
      numbers: currentSelection.filter((number) => number !== ballNumber),
    };
    setBalls(updatedBalls.filter((group) => group.numbers.length > 0)); // Remove empty groups
    return;
  }

  // If the current selection has less than 6 numbers, add the ball
  if (currentSelection.length < 6) {
    updatedBalls[selectedIndex] = {
      ...updatedBalls[selectedIndex],
      numbers: [...currentSelection, ballNumber].sort((a, b) => a - b),
    };
    setBalls(updatedBalls);
    return;
  }

  // If the current selection is full, find or create a new group
  const newIndex = selectBallIndex(updatedBalls);
  // If a new group is needed, create it with a unique id
  if (newIndex === updatedBalls.length) {
    updatedBalls.push({ id: crypto.randomUUID(), numbers: [] });
  }
  setSelectedIndex(newIndex);
  if (selectedIndex !== newIndex) {
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
  balls: { id: string; numbers: number[] }[],
  setBalls: (balls: { id: string; numbers: number[] }[]) => void,
  rowIndex: number,
  ballNumber: number
) {
  const updatedBalls = [...balls];
  const currentSelection = updatedBalls[rowIndex]?.numbers || [];

  // Prevent adding more than 6 numbers to a row
  if (currentSelection.length >= 6) {
    return;
  }

  if (!currentSelection.includes(ballNumber)) {
    updatedBalls[rowIndex] = {
      ...updatedBalls[rowIndex],
      numbers: [...currentSelection, ballNumber].sort((a, b) => a - b),
    };
    setBalls(updatedBalls);
  }
}

export function removeBall(
  balls: { id: string; numbers: number[] }[],
  setBalls: (balls: { id: string; numbers: number[] }[]) => void,
  id: string,
  ballNumber: number
) {
  const updatedBalls = balls.map((group) =>
    group.id === id
      ? {
          ...group,
          numbers: group.numbers.filter((number) => number !== ballNumber),
        }
      : group
  );
  setBalls(updatedBalls.filter((group) => group.numbers.length > 0));
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
  balls: { id: string; numbers: number[] }[],
  setBalls: (balls: { id: string; numbers: number[] }[]) => void,
  selectedIndex: number,
  setSelectedIndex: (index: number) => void,
  id: string,
  ballNumber: number,
  left: boolean
) {
  const currentBalls = balls[selectedIndex]?.numbers;
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
      removeBall(balls, setBalls, id, ballNumber);
    }
  };

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      className={`cursor-pointer rounded-full border-2 ${text} ${background} ${border} w-10 h-10 flex items-center justify-center font-bold text-xl`}
    >
      {ballNumber}
    </motion.button>
  );
}
