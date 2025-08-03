export interface BallSelection {
  id: string;
  numbers: number[];
  ddate: Date;
}

export interface NumberSelectionProps {
  balls: BallSelection[];
  setBalls: (balls: BallSelection[]) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}
export type PastDraw = {
  id: string;
  year: number;
  month: number;
  day: number;
  numbers: number[];
};
