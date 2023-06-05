import { Node } from '../redux/modules/world-map/world-map';
import { Tile } from './Tile';

export default function Path(props: { path: Node[] }) {
  return (
    <>
      {props.path.map(({ x, y, g }) => (
        <Tile key={`tile-${y}-${x}`} x={x} y={y} g={g} color="dodgerblue" />
      ))}
    </>
  );
}
