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
        parent: undefined,
      };
    }
  }
  return grid;
}

export function getProcessedNodes(
  grid: GridNode[][],
  startPos: Pos,
  endPos: Pos
) {
  const nodesGrid: GridNode[][] = [];

  for (let row = 0; row < grid.length; row++) {
    nodesGrid[row] = [];
    for (let col = 0; col < grid[0].length; col++) {
      const node = { ...grid[row][col] };
      const pos = { x: node.x, y: node.y };

      const h = heuristic(pos, endPos);
      const g = heuristic(startPos, pos);
      const f = h + g;
      const neighbors = determineNeighbors(pos, grid);

      const processedNode: GridNode = { ...node, h, g, f, neighbors };
      nodesGrid[row][col] = processedNode;
    }
  }

  console.log({ nodesGrid });
  return nodesGrid;
}

export function runAStar(startNode: GridNode, endNode: GridNode) {
  // setInterval(() => {}, 200);
  return generateAStarPath(startNode, endNode).next();
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

export function* generateAStarPath(start: GridNode, end: GridNode) {
  try {
    let openSet: GridNode[] = [start];
    let closedSet: GridNode[] = [];
    const path: GridNode[] = [];

    // // search!
    while (openSet.length > 0) {
      console.log("generateAStarPath", { openSet, closedSet });
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
        path.reverse();
        yield { current, neighbors: [], path, openSet, closedSet };
      }

      //remove current from openSet
      openSet.splice(lowestIndex, 1);
      //add current to closedSet
      closedSet.push(current);

      let neighbors = current.neighbors;
      const updatedNeighbors = [];

      // console.log({ current, path, openSet, closedSet, neighbors });
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (!closedSet.includes(neighbor)) {
          let possibleG = current.g + 1;

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          } else if (possibleG >= neighbor.g) {
            continue;
          }

          // neighbor.g = possibleG;
          // neighbor.h = heuristic(neighbor, end);
          // neighbor.f = neighbor.g + neighbor.h;
          // neighbor.parent = current;

          const g = possibleG;
          const h = heuristic(neighbor, end);
          const f = g + h;
          const parent = current;
          updatedNeighbors.push({ ...neighbor, g, h, f, parent });
        }
      }
      console.log("YIELD!");
      yield { current, neighbors: updatedNeighbors, path, openSet, closedSet };
    }

    //no solution by default
    console.log("FAIL!");
    yield [];
  } catch (err) {
    console.warn("ERROR!", err);
    yield [];
  }
}

// for (let row = 0; row < worldMap.nodes.length; row++) {
//   for (let col = 0; col < worldMap.nodes[0].length; col++) {}
// }
