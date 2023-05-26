import { ReactNode, useCallback, useEffect, useRef, useState, RefObject } from 'react';
import { useDrag } from './useDrag';

interface DraggableProps {
  children: ReactNode;
}

export default function Draggable(props: DraggableProps) {
  const { children } = props;
  const divRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useDrag({
    elementRef: divRef,
    dragStartCb(pos) {
      offset.current.x = pos.x;
      offset.current.y = pos.y;

      console.log('drag start', pos.y, offset.current.y, lastPos.current.y);
    },
    dragCb(pos) {
      if (!offset?.current || !divRef.current?.style) return;

      const displacement = { x: pos.x - offset.current.x, y: pos.y - offset.current.y };

      divRef.current.style.transform = `translate(${displacement.x}px, ${displacement.y}px)`;

      console.log('dragging', pos.y, offset.current.y, lastPos.current.y, divRef.current.style.transform);
    },
    dragEndCb(pos) {
      console.log('drag ended', pos.y, offset.current.y, lastPos.current.y);
    },
  });

  return <div ref={divRef}>{children}</div>;
}
