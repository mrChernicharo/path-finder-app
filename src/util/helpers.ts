import { GridNode, Pos } from "../redux/modules/world-map";

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

//heuristic we will be using - Manhattan distance
//for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
export function heuristic(pos0: Pos, pos1: Pos) {
  let d1 = Math.abs(pos1.x - pos0.x);
  let d2 = Math.abs(pos1.y - pos0.y);

  return d1 + d2;
}

export function determineNeighbors(pos: Pos, grid: GridNode[][]) {
  const neighbors = [];
  const top = grid?.[pos.y - 1]?.[pos.x];
  const right = grid?.[pos.y]?.[pos.x + 1];
  const bottom = grid?.[pos.y + 1]?.[pos.x];
  const left = grid?.[pos.y]?.[pos.x - 1];

  if (top && !top.blocked) neighbors.push(top);
  if (right && !right.blocked) neighbors.push(right);
  if (bottom && !bottom.blocked) neighbors.push(bottom);
  if (left && !left.blocked) neighbors.push(left);

  return neighbors;
}
