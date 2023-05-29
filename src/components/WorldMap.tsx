import { useAppDispatch, useAppSelector } from "../redux/util";
import { getMapWidth, getMapHeight, getGrid, getEndPos, getStartPos } from "../redux/modules/world-map.selector";
import { useEffect, useState } from "react";
import { pathGenerator } from "../utils/helpers";
import { Node, worldMapActions } from "../redux/modules/world-map";

export default function WorldMap() {
  const width = useAppSelector(getMapWidth);
  const height = useAppSelector(getMapHeight);
  const startPos = useAppSelector(getStartPos);
  const endPos = useAppSelector(getEndPos);
  const grid = useAppSelector(getGrid);
  const dispatch = useAppDispatch();
  const { setClosedSet, setOpenSet, setCurrentNode } = worldMapActions;

  const [pathGen, setPathGen] = useState<any>(null);

  useEffect(() => {
    if (!grid[0][0].f) return;
    setPathGen(pathGenerator(grid, startPos, endPos));
  }, [grid]);

  return (
    <div>
      <div>World Map</div>

      <button
        onClick={() => {
          const { value, done } = pathGen?.next();

          const { closedSet, openSet, current, neighbors: n, path } = value;

          console.log({ value, grid });

          const { neighbors, ...currentNode } = current;

          dispatch(setOpenSet(openSet));
          dispatch(setClosedSet(closedSet));
          dispatch(setCurrentNode(currentNode));
        }}
      >
        Run
      </button>
    </div>
  );
}
