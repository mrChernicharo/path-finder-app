import { useAppDispatch, useAppSelector } from "../redux/modules/util";
import {
  getEndNode,
  getEndPos,
  getNodes,
  getStartNode,
  getStartPos,
} from "../redux/modules/world-map.selector";
import {
  GridNode,
  Pos,
  SelectionMode,
  worldMapActions,
} from "../redux/modules/world-map";
import Node from "./Node";
import {
  determineNeighbors,
  generateAStarPath,
  getProcessedNodes,
  heuristic,
  runAStar,
} from "../util/helpers";

export default function WorldMap() {
  const nodesGrid = useAppSelector(getNodes);
  const startPos = useAppSelector(getStartPos);
  const endPos = useAppSelector(getEndPos);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const { setSelectionMode, updateNode } = worldMapActions;

  const dispatch = useAppDispatch();


  return (
    <div>
      <div>World Map</div>
      <ul className="text-xs">
        <li>• Press left btn to block nodes</li>
        <li>• Press right btn to unblock nodes</li>
      </ul>

      <button
        onClick={() => {
          const result = runAStar(startNode, endNode);
          const { current, neighbors, path, openSet, closedSet } =
            result.value as any;
          console.log({ neighbors, current });

          for (const node of [current, ...neighbors]) {
            dispatch(updateNode(node));
          }
        }}
      >
        Run
      </button>

      <div
        className="grid-outer-wrapper"
        onMouseDown={(e) => {
          (e.buttons === 1 || e.buttons === 2) &&
            dispatch(setSelectionMode(SelectionMode.Active));
        }}
        onMouseUp={(e) => {
          dispatch(setSelectionMode(SelectionMode.Idle));
        }}
        onMouseLeave={(e) => {
          dispatch(setSelectionMode(SelectionMode.Idle));
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {nodesGrid.map((row, i, grid) => (
          <div key={i} className="flex">
            {row.map((node, j) => {
              const isStart = node.x === startPos.x && node.y === startPos.y;
              const isEnd = node.x === endPos.x && node.y === endPos.y;

              return (
                <Node
                  key={String(i + j)}
                  node={node}
                  isStart={isStart}
                  isEnd={isEnd}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
