import { ReactNode, useCallback, useEffect, useRef, useState, RefObject } from 'react';
import { useDrag } from './useDrag';
import { useAppSelector } from '../redux/modules/util';
import { getNodes } from '../redux/modules/world-map.selector';

interface DraggableProps {
  width: number;
  height: number;
  children: ReactNode;
}

const ID_CHARS =
	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';

const idMaker = (length = 12) =>
	Array(length)
		.fill(0)
		.map(item => ID_CHARS.split('')[
			Math.round(Math.random() * ID_CHARS.length)
		])
		.join('');


export default function Draggable(props: DraggableProps) {
  const { width, height, children } = props;

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
    <div id={idMaker()} className="absolute z-10 top-0 border border-solid" style={{ width, height }} ref={elementRef}>
      {children}
    </div>
  );
}
