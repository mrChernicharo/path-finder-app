import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/modules/util';
import { getNodeSize, getSelectionMode } from '../redux/modules/world-map.selector';
import { SelectionMode, worldMapActions } from '../redux/modules/world-map';

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
      console.log({ prevX, prevY, scale });
      lastPos.current = { x: prevX, y: prevY };
      offset.current = { x: e.x, y: e.y };

      dragStartCb();
    }
  };

  const onDrag = (e: MouseEvent) => {
    if (dragging.current && elementRef.current) {
      // console.log(elementRef.current.style.transform);

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
    dispatch(setSelectionMode(SelectionMode.Idle));
    dragEndCb({ x: e.x, y: e.y });
    snapToGrid({ x: e.x, y: e.y });
    id.current = null;
  };

  function snapToGrid(pos: { x: number; y: number }) {
    const closestNode = document.elementsFromPoint(pos.x, pos.y).find((el) => el.classList.contains('node'));
    const gridEl = document.elementsFromPoint(pos.x, pos.y).find((el) => el.classList.contains('grid-outer-wrapper'));
    const gridBox = gridEl?.getBoundingClientRect();
    const closestNodeBox = closestNode?.getBoundingClientRect();

    if (id.current) {
      const x = parseInt(elementRef.current!.style.left);
      const y = parseInt(elementRef.current!.style.top);

      elementRef.current!.style.transform = `translate(
        ${closestNodeBox!.x - gridBox!.left - x}px, 
        ${closestNodeBox!.y - gridBox!.top - y}px
      ) scale(1)`;
    }
  }

  useEffect(() => {
    console.log(nodeSize);
    snapToGrid({ x: 0, y: 0 });
  }, [nodeSize]);

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
