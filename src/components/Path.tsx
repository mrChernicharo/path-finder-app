import { useState, useEffect } from "react";
import { Pos } from "../redux/modules/world-map/world-map";
import { getNodes, getStartNode, getEndNode, getNodeSize } from "../redux/modules/world-map/world-map.selector";
import { useAppSelector } from "../redux/util";
import { generatePath } from "../utils/helpers";

export default function Path() {
  const nodesGrid = useAppSelector(getNodes);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const nodeSize = useAppSelector(getNodeSize);

  const [active, setActive] = useState(false);

  const [path, setPath] = useState<Pos[]>([]);

  function handlePath() {
    if (active) {
      setActive(false);
      setPath([]);
    } else {
      setActive(true);
      setPath(generatePath(nodesGrid, startNode, endNode).map((point) => ({ x: point.x, y: point.y })));
    }
  }

  useEffect(() => {
    if (active) {
      setPath(generatePath(nodesGrid, startNode, endNode).map((point) => ({ x: point.x, y: point.y })));
    }
  }, [nodesGrid, startNode, endNode, active])

  return (
    <div>
      {path.map(({ x, y }) => (
        <div
          key={`${x} ${y}`}
          className="absolute bg-green-400 z-0 opacity-30 pointer-events-none"
          style={{ top: y * nodeSize, left: x * nodeSize, width: nodeSize, height: nodeSize }}
        ></div>
      ))}

      <button onClick={handlePath}>{active ? 'clear' : 'run'}</button>
    </div>
  );
}
