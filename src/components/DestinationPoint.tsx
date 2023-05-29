import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/modules/util';
import { Pos, worldMapActions } from '../redux/modules/world-map';
import { getNodeSize } from '../redux/modules/world-map.selector';
import Draggable from './Draggable';

export default function DestinationPoint(props: { type: 'start' | 'end'; pos: Pos }) {
  const [pos, setPos] = useState(props.pos);

  const nodeSize = useAppSelector(getNodeSize);
  const dispatch = useAppDispatch();
  const { setStart, setEnd } = worldMapActions;

  return (
    <Draggable
      width={nodeSize}
      height={nodeSize}
      initialPos={{ x: pos.x * nodeSize, y: pos.y * nodeSize }}
      onDragEnd={(pos) => {
        console.log('dragEnd', props.type, pos);
        setPos(pos);
        if (props.type === 'start') dispatch(setStart(pos));
        if (props.type === 'end') dispatch(setEnd(pos));
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
