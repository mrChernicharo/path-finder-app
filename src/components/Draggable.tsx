import { ReactNode, useCallback, useEffect, useRef, useState, RefObject } from 'react';
import { useDrag } from '../hooks/useDrag';
import { useAppSelector } from '../redux/util';
import { getNodes } from '../redux/modules/world-map/world-map.selector';
import { idMaker } from '../utils/helpers';
import { Pos } from '../redux/modules/world-map';

interface DraggableProps {
  width: number;
  height: number;
  initialPos: Pos;
  onDragEnd: (pos: Pos) => void;
  children: ReactNode;
}

export default function Draggable(props: DraggableProps) {
  const {
    width,
    height,
    children,
    onDragEnd,
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
      onDragEnd(pos);
    },
  });

  return (
    <div id={idMaker()} className="absolute z-10" style={{ width, height, top: y, left: x }} ref={elementRef}>
      {children}
    </div>
  );
}
