import { useState, useEffect } from "react";
import { Pos } from "../redux/modules/world-map/world-map";
import { getNodes, getStartNode, getEndNode, getNodeSize } from "../redux/modules/world-map/world-map.selector";
import { useAppSelector } from "../redux/util";
import { generatePath, idMaker } from "../utils/helpers";
import { usePath } from "../hooks/usePath";

export default function Path() {
  const nodeSize = useAppSelector(getNodeSize);
  const { path, pathActive, togglePath } = usePath()

  return (
    <div>
      <button onClick={togglePath}>{pathActive ? 'clear' : 'run'}</button>

      {path.map(({ x, y }, i) => (
        <div
          key={idMaker()}
          className="absolute bg-green-400 z-0 opacity-60 pointer-events-none flex justify-center items-center"
          style={{ top: y * nodeSize, left: x * nodeSize, width: nodeSize, height: nodeSize }}
        >
          <span className="text-[10px] text-white">{i}</span>
        </div>
      ))}
    </div>
  );
}
