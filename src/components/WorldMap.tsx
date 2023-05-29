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
    setPathGen(pathGenerator(grid, startPos, endPos));
  }, [grid, startPos, endPos]);

  return (
    <div>
      <div>World Map</div>
      <button
        onClick={() => {
          // const { closedSet, openSet, current, neighbors, path } = value;

          // setInterval(() => {
          const { value, done } = pathGen?.next();
          if (done || !value.current) return;
          dispatch(updateNodes(value));
          // }, 200);
        }}
      >
        Run
      </button>
      {grid.map((row, i) => (
        <div key={`row-${i}`} className="flex">
          {row.map((cell, j) => (
            <div key={`cell-${i}=${j}`} className="border w-20">
              {i} {j} {cell.blocked && 'block'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
