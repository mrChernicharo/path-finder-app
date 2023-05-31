import { useState, useEffect } from 'react';
import { Pos } from '../redux/modules/world-map/world-map';
import { getNodes, getStartNode, getEndNode, getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';
import { generatePath, idMaker } from '../utils/helpers';
import { usePath } from '../hooks/usePath';

export default function Path() {
  const nodeSize = useAppSelector(getNodeSize);
  const { path, neighbors, pathActive, togglePath } = usePath();

  return (
    <div>
      <button onClick={togglePath}>{pathActive ? 'clear' : 'run'}</button>

      {neighbors.map(({ x, y }, i) => (
        <div
          key={idMaker()}
          className="absolute bg-orange-400 z-0 opacity-30 pointer-events-none flex justify-center items-center"
          style={{ top: y * nodeSize, left: x * nodeSize, width: nodeSize, height: nodeSize }}
        >
          <span className="text-[10px] text-white">{i}</span>
        </div>
      ))}
      {path.map(({ x, y }, i) => (
        <div
          key={idMaker()}
          className="absolute bg-cyan-600 z-0 opacity-90 pointer-events-none flex justify-center items-center"
          style={{ top: y * nodeSize, left: x * nodeSize, width: nodeSize, height: nodeSize }}
        >
          <span className="text-[10px] text-white">{i}</span>
        </div>
      ))}
    </div>
  );
}
