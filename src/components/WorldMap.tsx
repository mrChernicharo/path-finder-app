import { useAppDispatch, useAppSelector } from "../redux/modules/util";
import {
  getEndPos,
  getNodes,
  getStartPos,
} from "../redux/modules/world-map.selector";
import { SelectionMode, worldMapActions } from "../redux/modules/world-map";
import Node from "./Node";
import { heuristic } from "../util/helpers";

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
        {nodesGrid.map((row, i) => (
          <div key={i} className="flex">
            {row.map((node, j) => {
              const pos = { x: node.x, y: node.y };
              const isStart = node.x === startPos.x && node.y === startPos.y;
              const isEnd = node.x === endPos.x && node.y === endPos.y;

              const h = heuristic(pos, endPos);
              const g = heuristic(startPos, pos);
              const f = h + g;

              return (
                <Node
                  key={String(i + j)}
                  node={{ ...node, f, h, g }}
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

// export function NodeGrid() {

// }
