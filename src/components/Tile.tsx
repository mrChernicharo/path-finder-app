import { memo } from 'react';
import { getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';

function TileComponent(props: { x: number; y: number; g: number; color?: string }) {
  const { x, y, g, color = 'green' } = props;
  const nodeSize = useAppSelector(getNodeSize);
  const fontSize = `${nodeSize * 0.35}px`;

  return (
    <div
      className="tile absolute z-0 opacity-60 pointer-events-none flex justify-center items-center"
      style={{ background: color, top: y * nodeSize, left: x * nodeSize, width: nodeSize, height: nodeSize, fontSize }}
    >
      <span className=" text-white">{g}</span>
    </div>
  );
}

export const Tile = memo(TileComponent);
