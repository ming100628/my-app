export interface NumberSelectionProps {
  balls: number[][];
  setBalls: (balls: number[][]) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}
