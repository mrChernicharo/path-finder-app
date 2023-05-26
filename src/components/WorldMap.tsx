import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/modules/util";
import {
  getSelectionMode,
  getNodes,
} from "../redux/modules/world-map.selector";
import { SelectionMode, worldMapActions } from "../redux/modules/world-map";

export default function WorldMap() {
  const nodesGrid = useAppSelector(getNodes);
  const { setSelectionMode } = worldMapActions;
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>World Map</div>
      <ul className="text-xs">
        <li>- Press left btn to block nodes</li>
        <li>- Press right btn to unblock nodes</li>
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
            {row.map((node, j) => (
              <Node key={"" + i + j} row={node.y} col={node.x} />
            ))}
          </div>
        ))}

        {/* {Array(height)
          .fill(0)
          .map((_, i) => (
            <div key={`row-${i}`} className="flex">
              {Array(width)
                .fill(0)
                .map((_, j) => (
                  <Node key={`row-${i}-col-${j}`} row={i} col={j} />
                ))}
            </div>
          ))} */}
      </div>
    </div>
  );
}

export function Node(props: { row: number; col: number }) {
  const { row, col } = props;
  const selectionMode = useAppSelector(getSelectionMode);

  const [blocked, setBlocked] = useState(false);

  const onMouseOver = (e: React.MouseEvent) => {
    e.preventDefault();

    e.buttons === 1 &&
      selectionMode === SelectionMode.Active &&
      setBlocked(true);

    e.buttons === 2 &&
      selectionMode === SelectionMode.Active &&
      setBlocked(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.buttons === 1 && setBlocked(true);

    e.buttons === 2 && setBlocked(false);
  };

  return (
    <div
      data-testid={`row-${row}-col-${col}`}
      className={`row-${row} col-${col} w-6 h-6 flex gap-2 justify-center items-center border-solid border text-[6px] select-none ${
        blocked
          ? "bg-slate-300 hover:bg-slate-400"
          : "bg-slate-800 hover:bg-slate-700"
      }`}
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
    >
      {row + 1}-{col + 1}
    </div>
  );
}
