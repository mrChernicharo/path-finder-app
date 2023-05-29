import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/util';
import { getSelectionMode, getNodes, getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { SelectionMode, worldMapActions } from '../redux/modules/world-map/world-map';

export function Node(props: { row: number; col: number; blocked: boolean }) {
  const { row, col, blocked } = props;
  const { updateNode } = worldMapActions;
  const selectionMode = useAppSelector(getSelectionMode);
  const nodeSize = useAppSelector(getNodeSize);
  const dispatch = useAppDispatch();

  // const [blocked, setBlocked] = useState(false);

  const onMouseOver = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectionMode !== SelectionMode.Active) return;
    e.buttons === 1 && dispatch(updateNode({ x: col, y: row, blocked: true }));
    e.buttons === 2 && dispatch(updateNode({ x: col, y: row, blocked: false }));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.buttons === 1 && dispatch(updateNode({ x: col, y: row, blocked: true }));
    e.buttons === 2 && dispatch(updateNode({ x: col, y: row, blocked: false }));
  };

  return (
    <div
      className={`node row-${row} col-${col} ${
        blocked ? 'bg-slate-300 hover:bg-slate-400' : 'bg-slate-800 hover:bg-slate-700'
      } flex gap-2 justify-center items-center text-[6px] border-slate-400 border-b-[1px] border-r-[1px] border-solid`}
      data-testid={`row-${row}-col-${col}`}
      style={{ width: nodeSize, height: nodeSize }}
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
    >
      <span className="select-none">
        {row + 1}-{col + 1}
      </span>
    </div>
  );
}
