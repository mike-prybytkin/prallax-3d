export type RainDropsType = {
  x: number;
  y: number;
  endy: number;
  velocity: number;
  opacity: number;
  draw(): void;
  update(): void;
};
