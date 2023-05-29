import { useAppDispatch, useAppSelector } from '../redux/modules/util';
import { getNodeSize, getNodes, getSelectionMode, getStartNode, getEndNode } from '../redux/modules/world-map.selector';
import { Pos, SelectionMode, worldMapActions } from '../redux/modules/world-map';
import { Node } from './Node';
import Draggable from './Draggable';
import DestinationPoint from './DestinationPoint';
import { generatePathIterator } from '../utils/helpers';
import { useEffect, useState } from 'react';

export default function WorldMap() {
  const nodesGrid = useAppSelector(getNodes);
  const selectionMode = useAppSelector(getSelectionMode);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const dispatch = useAppDispatch();
  const { setSelectionMode } = worldMapActions;

  const [generator, setGenerator] = useState<any>(generatePathIterator(nodesGrid, startNode, endNode));

  useEffect(() => {
    setGenerator(generatePathIterator(nodesGrid, startNode, endNode));
  }, [nodesGrid, startNode, endNode]);

  return (
    <div>
      <div>World Map</div>
      <ul className="text-xs">
        <li>- Press left btn to block nodes</li>
        <li>- Press right btn to unblock nodes</li>
      </ul>

      <div
        className="grid-outer-wrapper relative"
        onMouseDown={(e) => {
          (e.buttons === 1 || e.buttons === 2) &&
            selectionMode === SelectionMode.Idle &&
            dispatch(setSelectionMode(SelectionMode.Active));
        }}
        onMouseUp={(e) => {
          dispatch(setSelectionMode(SelectionMode.Idle));
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {nodesGrid.map((row, i) => (
          <div key={i} className="flex">
            {row.map((node, j) => (
              <Node key={'' + i + j} row={node.y} col={node.x} blocked={node.blocked} />
            ))}
          </div>
        ))}

        <DestinationPoint type="start" pos={startNode} />
        <DestinationPoint type="end" pos={endNode} />

        {/* <GeneratedPath /> */}

        <button
          onClick={() => {
            setInterval(() => {
              const { value, done } = generator.next();

              if (done) return;
              console.log(value);
            }, 100);
          }}
        >
          Run
        </button>
      </div>
    </div>
  );
}

// export function GeneratedPath() {
//   const nodesGrid = useAppSelector(getNodes);
//   const startNode = useAppSelector(getStartNode);
//   const endNode = useAppSelector(getEndNode);
//   const nodeSize = useAppSelector(getNodeSize);

//   const [path, setPath] = useState<Pos[]>([]);

//   useEffect(() => {
//     setPath(generatePath(nodesGrid, startNode, endNode).map((point) => ({ x: point.x, y: point.y })));
//   }, [nodesGrid, startNode, endNode]);

//   return (
//     <div>
//       {path.map(({ x, y }) => (
//         <div
//           key={`${x} ${y}`}
//           className="absolute bg-green-400 z-0"
//           style={{ top: y * nodeSize, left: x * nodeSize, width: nodeSize, height: nodeSize }}
//         ></div>
//       ))}
//     </div>
//   );
// }
