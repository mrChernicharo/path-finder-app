import { GridNode } from "../redux/modules/world-map";

export function createGrid(w: number, h: number) {
  const grid: GridNode[][] = [];
  for (let i = 0; i < h; i++) {
    grid[i] = [];
    for (let j = 0; j < w; j++) {
      grid[i][j] = {
        x: j,
        y: i,
        f: 0,
        g: 0,
        h: 0,
        blocked: false,
        neighbors: [],
      };
    }
  }
  return grid;
}
