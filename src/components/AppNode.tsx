import { useAppDispatch, useAppSelector } from '../redux/util';
import { getSelectionMode, getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { Node, SelectionMode, worldMapActions } from '../redux/modules/world-map/world-map';
import { klasss } from '../utils/helpers';
import { memo } from 'react';

function NodeComp(props: { node: Node }) {
  const { y: row, x: col, f, h, g, blocked } = props.node;
  const { updateNode } = worldMapActions;
  const selectionMode = useAppSelector(getSelectionMode);
  const nodeSize = useAppSelector(getNodeSize);
  const dispatch = useAppDispatch();

  const onPointerOver = (e: React.PointerEvent) => {
    if (selectionMode !== SelectionMode.Active) return;
    e.buttons === 1 && dispatch(updateNode({ x: col, y: row, blocked: true }));
    e.buttons === 2 && dispatch(updateNode({ x: col, y: row, blocked: false }));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.buttons === 1 && dispatch(updateNode({ x: col, y: row, blocked: true }));
    e.buttons === 2 && dispatch(updateNode({ x: col, y: row, blocked: false }));
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const els = document.elementsFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    if (els[0].classList.contains('node')) {
      const [row, col] = [els[0].classList[1].replace('row-', ''), els[0].classList[2].replace('col-', '')].map(Number)
      dispatch(updateNode({ x: col, y: row, blocked: true }))
    }
  };

  return (
    <div
      className={klasss(
        `node row-${row} col-${col}`,
        'flex flex-shrink-0 gap-2 justify-center items-center',
        blocked ? 'bg-slate-300 hover:bg-slate-400' : 'bg-slate-800 hover:bg-slate-700',
        'border-slate-400 border-b-[1px] border-r-[1px] border-solid'
      )}
      data-testid={`row-${row}-col-${col}`}
      style={{ width: nodeSize, height: nodeSize }}
      onPointerOver={onPointerOver}
      onPointerDown={onPointerDown}
      onTouchMoveCapture={onTouchMove}
    >
      <span className="pointer-events-none"></span>
    </div>
  );
}

export const AppNode = memo(NodeComp);
