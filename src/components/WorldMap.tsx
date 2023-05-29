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
  const { updateNodes } = worldMapActions;

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
          if (done) return;

          // const { closedSet, openSet, current, neighbors, path } = value;

          dispatch(updateNodes(value));
        }}
      >
        Run
      </button>
    </div>
  );
}
