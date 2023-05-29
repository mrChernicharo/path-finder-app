import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/modules/util";
import {
  getSelectionMode,
  getNodeSize,
} from "../redux/modules/world-map.selector";
import { SelectionMode, worldMapActions } from "../redux/modules/world-map";

export function Node(props: { row: number; col: number }) {
  const { row, col } = props;
  const selectionMode = useAppSelector(getSelectionMode);
  const nodeSize = useAppSelector(getNodeSize);
  const dispatch = useAppDispatch();

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
      id={`${row}::${col}`}
      style={{ width: nodeSize, height: nodeSize }}
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
      // prettier-ignore
      className={`row-${row} col-${col} flex gap-2 justify-center items-center border-solid border text-[6px] select-none
      ${blocked ? "bg-slate-300 hover:bg-slate-400" : "bg-slate-800 hover:bg-slate-700"}`}
    >
      {row + 1}-{col + 1}
    </div>
  );
}
