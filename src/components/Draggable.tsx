import { ReactNode, useCallback, useEffect, useRef, useState, RefObject } from 'react';
import { useDrag } from '../hooks/useDrag';
import { useAppSelector } from '../redux/modules/util';
import { getNodes } from '../redux/modules/world-map.selector';
import { idMaker } from '../utils/helpers';

interface DraggableProps {
  width: number;
  height: number;
  initialPos: { x: number; y: number };
  children: ReactNode;
}



export default function Draggable(props: DraggableProps) {
  const {
    width,
    height,
    children,
    initialPos: { x, y },
  } = props;

  const { elementRef } = useDrag({
    dragStartCb(pos) {
      console.log('drag start');
    },
    dragCb(pos) {
      // console.log('dragging');
    },
    dragEndCb(pos) {
      console.log('drag ended');
    },
  });

  return (
    <div
      id={idMaker()}
      className="absolute z-10"
      style={{ width, height, top: y, left: x }}
      ref={elementRef}
    >
      {children}
    </div>
  );
}
