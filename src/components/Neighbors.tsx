import { Node } from '../redux/modules/world-map/world-map';
import { Tile } from './Tile';

export default function Neighbors(props: { neighbors: Node[] }) {
  return (
    <>
      {props.neighbors.map(({ x, y, g, blocked }) => {
        return blocked ? null : <Tile key={`tile-${y}-${x}`} x={x} y={y} g={g} color="rgb(30, 41, 59)" />;
      })}
    </>
  );
}
