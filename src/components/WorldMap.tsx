import { useAppSelector } from "../redux/util";
import {
  getMapWidth,
  getMapHeight,
  getGrid,
  getEndPos,
  getStartPos,
} from "../redux/modules/world-map.selector";
import { useState } from "react";
import { pathGenerator } from "../utils/helpers";

export default function WorldMap() {
  const width = useAppSelector(getMapWidth);
  const height = useAppSelector(getMapHeight);
  const startPos = useAppSelector(getStartPos);
  const endPos = useAppSelector(getEndPos);
  const grid = useAppSelector(getGrid);

  const [pathGen] = useState(pathGenerator(grid, startPos, endPos));

  return (
    <div>
      <div>World Map</div>

      <button
        onClick={() => {
          const { value, done } = pathGen.next();
          console.log(value);
        }}
      >
        Run
      </button>
    </div>
  );
}
