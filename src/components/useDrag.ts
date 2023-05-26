import { RefObject, useEffect, useRef, useState } from 'react';

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

  const onDragStart = (e: MouseEvent) => {
    if (e.buttons === 1 && elementRef.current) {
      dragging.current = true;

      const [prevX, prevY] = (elementRef.current.style.transform.match(/(\d|-|\.)+/g) || [0, 0]).map(Number);
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
      )`;

      console.log(elementRef.current.style.transform);
      dragCb();
    }
  };

  // function snapToGrid(pos: { x: number; y: number }) {
  //   const closestNode = document.elementsFromPoint(pos.x, pos.y).find((el) => el.classList.contains('node'));
  //   const gridEl = document.elementsFromPoint(pos.x, pos.y).find((el) => el.classList.contains('grid-outer-wrapper'));
  //   const gridBox = gridEl?.getBoundingClientRect();
  //   const closestNodeBox = closestNode?.getBoundingClientRect();
  //   elementRef.current!.style.transform = `translate(${closestNodeBox!.x}px, ${closestNodeBox!.y - gridBox!.top}px)`;
  // }

  const onDragEnd = (e: MouseEvent) => {
    dragging.current = false;
    offset.current = { x: e.x, y: e.y };
    dragEndCb({ x: e.x, y: e.y });
    // snapToGrid({ x: e.x, y: e.y });
    const closestNode = document.elementsFromPoint(e.x, e.y).find((el) => el.classList.contains('node'));
    const gridEl = document.elementsFromPoint(e.x, e.y).find((el) => el.classList.contains('grid-outer-wrapper'));
    const gridBox = gridEl?.getBoundingClientRect();
    const closestNodeBox = closestNode?.getBoundingClientRect();
    elementRef.current!.style.transform = `translate(${closestNodeBox!.x}px, ${closestNodeBox!.y - gridBox!.top}px)`;
  };

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
