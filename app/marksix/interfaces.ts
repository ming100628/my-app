export interface NumberProps {
  balls: number[][];
  setBalls: (balls: number[][]) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export interface CartProps {
  cart: number[][];
  setCart: (balls: number[][]) => void;
}
