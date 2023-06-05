import { memo } from "react";
import { getNodeSize } from "../redux/modules/world-map/world-map.selector";
import { useAppSelector } from "../redux/util";

function TileComponent(props: { x: number; y: number; g: number; color?: string }) {
  const nodeSize = useAppSelector(getNodeSize);
  const { x, y, g, color = 'green' } = props;
  return (
    <div
      className="tile absolute z-0 opacity-60 pointer-events-none flex justify-center items-center"
      style={{ background: color, top: y * nodeSize, left: x * nodeSize, width: nodeSize, height: nodeSize }}
    >
      <span className="text-[10px] text-white">{g}</span>
    </div>
  );
}

export const Tile = memo(TileComponent);
