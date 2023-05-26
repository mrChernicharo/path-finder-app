import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/modules/util';
import { getSelectionMode, getNodes, getNodeSize } from '../redux/modules/world-map.selector';
import { SelectionMode, worldMapActions } from '../redux/modules/world-map';

export function Node(props: { row: number; col: number }) {
  const { row, col } = props;
  const selectionMode = useAppSelector(getSelectionMode);
  const nodeSize = useAppSelector(getNodeSize);

  const [blocked, setBlocked] = useState(false);

  const onMouseOver = (e: React.MouseEvent) => {
    e.preventDefault();

    e.buttons === 1 && selectionMode === SelectionMode.Active && setBlocked(true);

    e.buttons === 2 && selectionMode === SelectionMode.Active && setBlocked(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.buttons === 1 && setBlocked(true);

    e.buttons === 2 && setBlocked(false);
  };

  return (
    <div
      // prettier-ignore
      className={`node row-${row} col-${col} ${blocked ? "bg-slate-300 hover:bg-slate-400" : "bg-slate-800 hover:bg-slate-700"} flex gap-2 justify-center items-center text-[6px] border-slate-400 border-b-[1px] border-r-[1px] border-solid`}
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
