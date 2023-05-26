import { ReactNode, useCallback, useEffect, useRef, useState, RefObject } from 'react';
import { useDrag } from './useDrag';

interface DraggableProps {
  width: number;
  height: number;
  children: ReactNode;
}

export default function Draggable(props: DraggableProps) {
  const { width, height, children } = props;
  const divRef = useRef<HTMLDivElement>(null);

  useDrag({
    elementRef: divRef,
    dragStartCb(pos) {
      console.log('drag start');
    },
    dragCb(pos) {
      console.log('dragging');
    },
    dragEndCb(pos) {
      console.log('drag ended');
    },
  });

  return (
    <div className="border border-solid" style={{ width, height }} ref={divRef}>
      {children}
    </div>
  );
}
