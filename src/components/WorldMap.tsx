import { useState } from "react";
import { useAppSelector } from "../redux/modules/util";
import { getMapWidth, getMapHeight } from "../redux/modules/world-map.selector";

export enum SelectionMode {
  Idle = "Idle",
  Active = "Active",
}

export default function WorldMap() {
  const width = useAppSelector(getMapWidth);
  const height = useAppSelector(getMapHeight);
  const [selectionMode, setSelectionMode] = useState(SelectionMode.Idle);

  return (
    <div>
      <div>World Map</div>

      <div
        className="grid-outer-wrapper"
        onMouseDown={(e) => {
          (e.buttons === 1 || e.buttons === 2) &&
            setSelectionMode(SelectionMode.Active);
        }}
        onMouseUp={(e) => {
          setSelectionMode(SelectionMode.Idle);
        }}
        onMouseLeave={(e) => {
          setSelectionMode(SelectionMode.Idle);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {Array(height)
          .fill(0)
          .map((_, i) => (
            <div key={`row-${i}`} className="flex">
              {Array(width)
                .fill(0)
                .map((_, j) => (
                  <Node
                    key={`row-${i}-col-${j}`}
                    row={i}
                    col={j}
                    selectionMode={selectionMode}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export function Node(props: {
  row: number;
  col: number;
  selectionMode: SelectionMode;
}) {
  const { row, col, selectionMode } = props;
  const [blocked, setBlocked] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.preventDefault();

    e.buttons === 1 &&
      selectionMode === SelectionMode.Active &&
      setBlocked(true);

    e.buttons === 2 &&
      selectionMode === SelectionMode.Active &&
      setBlocked(false);
  };

  return (
    <div
      data-testid={`row-${row}-col-${col}`}
      className={`row-${row} col-${col} w-6 h-6 flex gap-2 justify-center items-center border-solid border text-[6px] select-none ${
        blocked
          ? "bg-slate-300 hover:bg-slate-400"
          : "bg-slate-800 hover:bg-slate-700"
      }`}
      onMouseOver={handleMouseEnter}
      onMouseDown={(e) => {
        e.buttons === 1 &&
        setBlocked(true);

        e.buttons === 2 &&
        setBlocked(false);
      }}
    >
      {row + 1}-{col + 1}
    </div>
  );
}
