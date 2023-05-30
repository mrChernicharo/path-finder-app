import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/util';
import { getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { Pos, SelectionMode, worldMapActions } from '../redux/modules/world-map/world-map';

export function useDrag(props: {
  dragStartCb: (...args: any) => void;
  dragCb: (...args: any) => void;
  dragEndCb: (...args: any) => void;
}) {
  const { dragStartCb, dragCb, dragEndCb } = props;
  const dragging = useRef(false);
  const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const id = useRef<string | null>(null);

  const nodeSize = useAppSelector(getNodeSize);
  const { setSelectionMode } = worldMapActions;
  const dispatch = useAppDispatch();

  const onDragStart = (e: MouseEvent) => {
    if (e.buttons === 1 && elementRef.current) {
      dragging.current = true;
      id.current = elementRef.current?.id;
      dispatch(setSelectionMode(SelectionMode.Dragging));

      const [prevX, prevY, scale] = (elementRef.current.style.transform.match(/(\d|-|\.)+/g) || [0, 0, 0]).map(Number);

      lastPos.current = { x: prevX, y: prevY };
      offset.current = { x: e.x, y: e.y };

      dragStartCb();
    }
  };

  const onDrag = (e: MouseEvent) => {
    if (dragging.current && elementRef.current) {
      elementRef.current.style.transform = `translate(
        ${lastPos.current.x + e.x - offset.current.x}px, 
        ${lastPos.current.y + e.y - offset.current.y}px
      ) scale(1.3)`;
      dragCb();
    }
  };

  const onDragEnd = (e: MouseEvent) => {
    if (!id.current) return;
    dragging.current = false;
    offset.current = { x: e.x, y: e.y };

    const gridEl = document.elementsFromPoint(e.x, e.y).find((el) => el.classList.contains('grid-outer-wrapper'));
    const gridBox = gridEl?.getBoundingClientRect()!;
    const box = elementRef.current?.getBoundingClientRect()!;
    const targetNodePos = {
      x: Math.round((box.x - gridBox.left) / nodeSize),
      y: Math.round((box.y - gridBox.top) / nodeSize),
    };

    snapToGrid(targetNodePos);
    dragEndCb(targetNodePos);
    dispatch(setSelectionMode(SelectionMode.Idle));
    id.current = null;
  };

  function snapToGrid(pos: Pos) {
    if (id.current) {
      const top = pos.y * nodeSize + 'px';
      const left = pos.x * nodeSize + 'px';
      elementRef.current!.style.transform = `translate(0,0) scale(1)`;
      elementRef.current!.style.top = top;
      elementRef.current!.style.left = left;
    }

  }

  useEffect(() => {
    elementRef.current?.addEventListener('pointerdown', onDragStart);
    document.addEventListener('pointermove', onDrag);
    document.addEventListener('pointerup', onDragEnd);
    return () => {
      elementRef.current?.removeEventListener('pointerdown', onDragStart);
      document.removeEventListener('pointermove', onDrag);
      document.removeEventListener('pointerup', onDragEnd);
    };
  }, []);

  return {
    elementRef,
  };
}
