import { Node, Pos } from "../redux/modules/world-map";

const ID_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";

export const idMaker = (length = 12) =>
  Array(length)
    .fill(0)
    .map(
      (item) => ID_CHARS.split("")[Math.round(Math.random() * ID_CHARS.length)]
    )
    .join("");

//heuristic we will be using - Manhattan distance
//for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
function heuristic(pos0: Pos, pos1: Pos) {
  let d1 = Math.abs(pos1.x - pos0.x);
  let d2 = Math.abs(pos1.y - pos0.y);

  return d1 + d2;
}

//constructor function to create all the grid points as objects containind the data for the points
class GridPoint {
  x: number;
  y: number;
  f: number;
  g: number;
  h: number;
  neighbors: GridPoint[];
  parent: GridPoint | undefined;
  blocked: boolean;
  constructor(x: number, y: number, blocked = false) {
    this.x = x; //x location of the grid point
    this.y = y; //y location of the grid point
    this.f = 0; //total cost function
    this.g = 0; //cost function from start to the current grid point
    this.h = 0; //heuristic estimated cost function from current grid point to the goal
    this.neighbors = []; // neighbors of the current grid point
    this.parent = undefined; // immediate source of the current grid point
    this.blocked = blocked;
  }

  // update neighbors array for a given grid point
  updateNeighbors(grid: GridPoint[][]) {
    let i = this.x;
    let j = this.y;
    if (i < grid.length - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < grid[0].length - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  }
}

export function* pathGenerator(nodeGrid: Node[][], startPos: Pos, endPos: Pos) {
  try {
    const grid: GridPoint[][] = [];
    const [cols, rows] = [nodeGrid[0].length, nodeGrid.length];

    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = new GridPoint(i, j);
      }
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].updateNeighbors(grid);
      }
    }

    const start = grid[startPos.x][startPos.y];
    const end = grid[endPos.x][endPos.y];

    let openSet: GridPoint[] = [start];
    let closedSet: GridPoint[] = [];
    const path: GridPoint[] = [];

    //do search!
    while (openSet.length > 0) {
      //assumption lowest index is the first one to begin with
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      let current = openSet[lowestIndex];

      if (current.x === end.x && current.y === end.y) {
        let temp = current;
        path.push(temp);
        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }
        console.log("DONE!");
        // return the traced path
        // return path.reverse();
        yield { current, neighbors: [], openSet, closedSet, path: path.reverse() };
      }

      //remove current from openSet
      openSet.splice(lowestIndex, 1);
      //add current to closedSet
      closedSet.push(current);

      let neighbors = current.neighbors;

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (!closedSet.includes(neighbor)) {
          let possibleG = current.g + 1;

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          } else if (possibleG >= neighbor.g) {
            continue;
          }

          neighbor.g = possibleG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
      yield { current, neighbors, openSet, closedSet, path: [] };
    }

    //no solution by default
    yield { current: null, neighbors: [], openSet, closedSet, path: [] };
  } catch (err) {
    console.warn(err);
    yield { current: null, neighbors: [], openSet: [], closedSet: [], path: [] };
  }
}
