import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/util';
import { Pos, worldMapActions } from '../redux/modules/world-map/world-map';
import { getNodeSize } from '../redux/modules/world-map/world-map.selector';
import Draggable from './Draggable';

export default function DestinationPoint(props: { type: 'start' | 'end'; pos: Pos }) {
  const { setStart, setEnd } = worldMapActions;
  const nodeSize = useAppSelector(getNodeSize);
  const dispatch = useAppDispatch();

  return (
    <Draggable
      width={nodeSize}
      height={nodeSize}
      pos={{ x: props.pos.x * nodeSize, y: props.pos.y * nodeSize }}
      onDragEnd={(position) => {
        if (props.type === 'start') {
          dispatch(setStart(position));
        }
        if (props.type === 'end') {
          dispatch(setEnd(position));
        }
      }}
    >
      <div
        className={`${props.type === 'start' ? 'bg-green-500' : 'bg-red-500'} hover:cursor-grab`}
        style={{
          width: nodeSize,
          height: nodeSize,
          clipPath: `polygon(50% 0%, 66% 31%, 98% 35%, 72% 59%, 79% 91%, 50% 73%, 21% 91%, 27% 58%, 2% 35%, 34% 30%)`,
        }}
      />
    </Draggable>
  );
}
