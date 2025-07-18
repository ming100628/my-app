export interface BallSelection {
  id: string;
  numbers: number[];
}

export interface NumberSelectionProps {
  balls: BallSelection[];
  setBalls: (balls: BallSelection[]) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}
