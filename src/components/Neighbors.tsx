import { Node } from '../redux/modules/world-map/world-map';
import { getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';
import { idMaker } from '../utils/helpers';
import { Tile } from './Tile';

export default function Neighbors(props: { neighbors: Node[] }) {
  const nodeSize = useAppSelector(getNodeSize);

  return (
    <>
      {props.neighbors.map(({ x, y, g }) => (
        <Tile key={`tile-${y}-${x}`} x={x} y={y} g={g} color="orange" />
      ))}
    </>
  );
}
