import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/modules/util";
import {
  getSelectionMode,
  getNodeSize,
} from "../redux/modules/world-map.selector";
import {
  GridNode,
  SelectionMode,
  worldMapActions,
} from "../redux/modules/world-map";

export default function Node(props: {
  node: GridNode;
  isStart: boolean;
  isEnd: boolean;
}) {
  const {
    isStart,
    isEnd,
    node: { x, y, blocked, g, f, h },
  } = props;

  const selectionMode = useAppSelector(getSelectionMode);
  const nodeSize = useAppSelector(getNodeSize);
  const { updateNode } = worldMapActions;
  const dispatch = useAppDispatch();

  const onMouseOver = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectionMode !== SelectionMode.Active || isStart || isEnd) return;
    e.buttons === 1 && dispatch(updateNode({ x, y, blocked: true }));
    e.buttons === 2 && dispatch(updateNode({ x, y, blocked: false }));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (isStart || isEnd) return;
    e.buttons === 1 && dispatch(updateNode({ x, y, blocked: true }));
    e.buttons === 2 && dispatch(updateNode({ x, y, blocked: false }));
  };

  return (
    <div
      id={`${y}::${x}`}
      data-testid={`row-${y}-col-${x}`}
      className={`row-${y} col-${x} 
      flex gap-2 justify-center items-center border-solid border-b-[1px] border-r-[1px] text-[12px] select-none 
      ${
        blocked
          ? "bg-slate-300 hover:bg-slate-400"
          : "bg-slate-800 hover:bg-slate-700"
      } 
       ${isStart ? "bg-green-600 hover:bg-green-500" : ""} 
       ${isEnd ? "bg-red-600 hover:bg-red-500" : ""}`}
      style={{ width: nodeSize, height: nodeSize }}
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
    >
      g{g} h{h} f{f}
    </div>
  );
}
