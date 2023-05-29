import { useAppDispatch, useAppSelector } from "../redux/modules/util";
import {
  getEndPos,
  getNodes,
  getStartPos,
} from "../redux/modules/world-map.selector";
import {
  GridNode,
  Pos,
  SelectionMode,
  worldMapActions,
} from "../redux/modules/world-map";
import Node from "./Node";
import { determineNeighbors, heuristic } from "../util/helpers";

export default function WorldMap() {
  const nodesGrid = useAppSelector(getNodes);
  const startPos = useAppSelector(getStartPos);
  const endPos = useAppSelector(getEndPos);
  const { setSelectionMode } = worldMapActions;

  const dispatch = useAppDispatch();

  return (
    <div>
      <div>World Map</div>
      <ul className="text-xs">
        <li>• Press left btn to block nodes</li>
        <li>• Press right btn to unblock nodes</li>
      </ul>

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
        {getProcessedNodes(nodesGrid, startPos, endPos).map((row, i, grid) => (
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

export function getProcessedNodes(
  grid: GridNode[][],
  startPos: Pos,
  endPos: Pos
) {
  const nodesGrid: GridNode[][] = [];

  for (let row = 0; row < grid.length; row++) {
    nodesGrid[row] = [];
    for (let col = 0; col < grid[0].length; col++) {
      const node = { ...grid[row][col] };
      const pos = { x: node.x, y: node.y };

      const h = heuristic(pos, endPos);
      const g = heuristic(startPos, pos);
      const f = h + g;
      const neighbors = determineNeighbors(pos, grid);

      const processedNode: GridNode = { ...node, h, g, f, neighbors };
      nodesGrid[row][col] = processedNode;
    }
  }

  return nodesGrid;
}
