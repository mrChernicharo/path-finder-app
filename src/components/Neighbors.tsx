import { Node } from '../redux/modules/world-map/world-map';
import { getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';
import { idMaker } from '../utils/helpers';

export default function Neighbors(props: { neighbors: Node[] }) {
  const nodeSize = useAppSelector(getNodeSize);

  return (
    <div>
      {props.neighbors.map(({ x, y, g }) => (
        <div
          key={idMaker()}
          className="absolute bg-orange-400 z-0 opacity-60 pointer-events-none flex justify-center items-center"
          style={{ top: y * nodeSize, left: x * nodeSize, width: nodeSize, height: nodeSize }}
        >
          <span className="text-[10px] text-white">{g}</span>
        </div>
      ))}
    </div>
  );
}
