import { useState, useEffect } from 'react';
import { Node, Pos } from '../redux/modules/world-map/world-map';
import { getNodes, getStartNode, getEndNode, getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';
import { generatePath, idMaker } from '../utils/helpers';
import { usePath } from '../hooks/usePath';

export default function Path(props: { path: Node[] }) {
  const nodeSize = useAppSelector(getNodeSize);

  return (
    <div>
      {props.path.map(({ x, y }, i) => (
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
