import { RefObject, useEffect, useRef, useState } from 'react';

export function useDrag(props: {
  elementRef: RefObject<HTMLElement>;
  dragStartCb: (...args: any) => void;
  dragCb: (...args: any) => void;
  dragEndCb: (...args: any) => void;
}) {
  const { elementRef, dragStartCb, dragCb, dragEndCb } = props;
  const dragging = useRef(false);

  const onDragStart = (e: MouseEvent) => {
    if (e.buttons === 1) {
      dragging.current = true;
      dragStartCb({ x: e.clientX, y: e.clientY });
    }
  };
  const onDrag = (e: MouseEvent) => {
    if (dragging.current) {
      dragCb({ x: e.clientX, y: e.clientY });
    }
  };

  const onDragEnd = (e: MouseEvent) => {
    dragging.current = false;
    dragEndCb({ x: e.clientX, y: e.clientY });
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
}
