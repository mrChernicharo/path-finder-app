import { useAppSelector } from '../redux/modules/util';
import { Pos } from '../redux/modules/world-map';
import { getNodeSize } from '../redux/modules/world-map.selector';
import Draggable from './Draggable';

export default function DestinationPoint(props: { type: 'start' | 'end'; initialPos: Pos }) {
  const {
    type,
    initialPos: { x, y },
  } = props;
  const nodeSize = useAppSelector(getNodeSize);

  return (
    <Draggable
      width={nodeSize}
      height={nodeSize}
      initialPos={{ x: x * nodeSize, y: y * nodeSize }}
      onDragEnd={(pos) => {
        console.log(
          'onDragEnd',
          pos,
        );
      }}
    >
      <div
        className={`${type === 'start' ? 'bg-green-500' : 'bg-red-500'} hover:cursor-grab`}
        style={{
          width: nodeSize,
          height: nodeSize,
          clipPath: `polygon(50% 0%, 66% 31%, 98% 35%, 72% 59%, 79% 91%, 50% 73%, 21% 91%, 27% 58%, 2% 35%, 34% 30%)`,
        }}
      />
    </Draggable>
  );
}
