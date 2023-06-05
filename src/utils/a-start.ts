import { Node, Pos } from "../redux/modules/world-map/world-map";

//heuristic we will be using - Manhattan distance
//for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
export function heuristic(pos0: Pos, pos1: Pos) {
  let d1 = Math.abs(pos1.x - pos0.x);
  let d2 = Math.abs(pos1.y - pos0.y);

  return d1 + d2;
}

//constructor function to create all the grid points as objects containind the data for the points
export class GridPoint {
  id: string;
  x: number;
  y: number;
  f: number;
  g: number;
  h: number;
  neighbors: GridPoint[];
  parent: GridPoint | undefined;
  blocked: boolean;
  constructor(row: number, col: number, blocked = false) {
    this.id = `${row}-${col}`;
    this.x = col; //x location of the grid point
    this.y = row; //y location of the grid point
    this.f = 0; //total cost function
    this.g = 0; //cost function from start to the current grid point
    this.h = 0; //heuristic estimated cost function from current grid point to the goal
    this.neighbors = []; // neighbors of the current grid point
    this.parent = undefined; // immediate source of the current grid point
    this.blocked = blocked;
  }

  // update neighbors array for a given grid point
  updateNeighbors(grid: GridPoint[][]) {
    let row = this.y;
    let col = this.x;
    // top
    if (row > 0) {
      this.neighbors.push(grid[row - 1][col]);
    }
    // bottom
    if (row < grid.length - 1) {
      this.neighbors.push(grid[row + 1][col]);
    }
    // left
    if (col > 0) {
      this.neighbors.push(grid[row][col - 1]);
    }
    // right
    if (col < grid[0].length - 1) {
      this.neighbors.push(grid[row][col + 1]);
    }
  }
}

export function generatePath(nodeGrid: Node[][], startPos: Pos, endPos: Pos) {
  try {
    // initialize grid
    const grid: GridPoint[][] = [];
    const [rows, cols] = [nodeGrid.length, nodeGrid[0].length];

    for (let row = 0; row < rows; row++) {
      grid[row] = new Array(cols);
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid[row][col] = new GridPoint(row, col, nodeGrid[row][col].blocked);
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid[row][col].updateNeighbors(grid);
      }
    }

    const start = grid[startPos.y][startPos.x];
    const end = grid[endPos.y][endPos.x];

    let openSet: GridPoint[] = [];
    let closedSet: GridPoint[] = [];
    const path: GridPoint[] = [];
    openSet.push(start);

    // // search!
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

        const pathObj: Record<string, Node> = {};
        path.reverse().forEach((gridPoint) => {
          const { id, x, y, f, g, h, blocked } = gridPoint;
          pathObj[id] = { id, x, y, f, g, h, blocked };
        });
        const closedSetObj: Record<string, Node> = {};
        closedSet.forEach((gridPoint) => {
          const { id, x, y, f, g, h, blocked } = gridPoint;
          closedSetObj[id] = { id, x, y, f, g, h, blocked };
        });
        return { pathObj, closedSetObj };
      }

      //remove current from openSet
      openSet.splice(lowestIndex, 1);
      //add current to closedSet
      closedSet.push(current);

      let neighbors = current.neighbors;

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (!neighbor.blocked && !closedSet.includes(neighbor)) {
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
    }

    //no solution by default
    return { pathObj: {}, closedSetObj: {} };
  } catch (err) {
    return { pathObj: {}, closedSetObj: {} };
  }
}

const getNodeTag = (curr: GridPoint, i: number, j: number) => {
  const { x, y } = curr;
  if (x === i) {
    return j < y ? 'top' : 'bottom';
  }

  if (j === y) {
    return i < x ? 'left' : 'right';
  }
};
