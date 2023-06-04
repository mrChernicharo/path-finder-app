import { useAppDispatch, useAppSelector } from '../redux/util';
import { getSelectionMode, getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { Node, SelectionMode, worldMapActions } from '../redux/modules/world-map/world-map';
import { klasss } from '../utils/helpers';

export function NodeComponent(props: { node: Node }) {
  const { y: row, x: col, f, h, g, blocked } = props.node;
  const { updateNode } = worldMapActions;
  const selectionMode = useAppSelector(getSelectionMode);
  const nodeSize = useAppSelector(getNodeSize);
  const dispatch = useAppDispatch();

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
      className={klasss(
        `node row-${row} col-${col}`,
        blocked ? 'bg-slate-300 hover:bg-slate-400' : 'bg-slate-800 hover:bg-slate-700',
        `flex flex-shrink-0 gap-2 justify-center items-center text-[6px] border-slate-400 border-b-[1px] border-r-[1px] border-solid`
      )}
      data-testid={`row-${row}-col-${col}`}
      style={{ width: nodeSize, height: nodeSize }}
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
    >
      <span className="pointer-events-none"></span>
    </div>
  );
}
