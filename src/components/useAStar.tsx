import { useState } from "react";
import { useAppSelector } from "../redux/modules/util";
import { GridNode, Pos, worldMapActions } from "../redux/modules/world-map";
import {
  getNodes,
  getStartPos,
  getEndPos,
  getStartNode,
  getEndNode,
} from "../redux/modules/world-map.selector";
import { heuristic } from "../util/helpers";

export function useAStar() {
  const nodesGrid = useAppSelector(getNodes);
  const startPos = useAppSelector(getStartPos);
  const endPos = useAppSelector(getEndPos);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const { setSelectionMode, updateNode } = worldMapActions;

  const [openSet, setOpenSet] = useState<GridNode[]>([startNode]);
  const [closedSet, setClosedSet] = useState<GridNode[]>([]);
  const [path, setPath] = useState<GridNode[]>([]);

  return {
    generate() {
      const result = aStarPath(openSet, closedSet, path, { ...endPos }).next();
      console.log(result);
    },
  };
}

function* aStarPath(
  openSet: GridNode[],
  closedSet: GridNode[],
  path: GridNode[],
  end: Pos
) {
  try {
    // let openSet: GridNode[] = [start];
    // let closedSet: GridNode[] = [];
    // const path: GridNode[] = [];

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
      // removeFromOpenSetAt(lowestIndex);
      //add current to closedSet
      closedSet.push(current);
      // addToClosedSet(current);

      let neighbors = current.neighbors;
      // const updatedNeighbors = [];

      // console.log({ current, path, openSet, closedSet, neighbors });
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (!closedSet.includes(neighbor)) {
          let possibleG = current.g + 1;

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
            // addToOpenSet(current);

          } else if (possibleG >= neighbor.g) {
            continue;
          }

          neighbor.g = possibleG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;

          // const g = possibleG;
          // const h = heuristic(neighbor, end);
          // const f = g + h;
          // const parent = current;
          // updatedNeighbors.push({ ...neighbor, g, h, f, parent });
        }
      }
      console.log("YIELD!");
      yield { current, neighbors, path, openSet, closedSet };
    }

    //no solution by default
    console.log("FAIL!");
    yield [];
  } catch (err) {
    console.warn("ERROR!", err);
    yield [];
  }
}
