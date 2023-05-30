import { useState, useEffect } from "react";
import { Pos } from "../redux/modules/world-map/world-map";
import { generatePath } from "../utils/helpers";
import { getNodes, getStartNode, getEndNode, getNodeSize } from "../redux/modules/world-map/world-map.selector";
import { useAppSelector } from "../redux/util";

export function usePath() {
  const nodesGrid = useAppSelector(getNodes);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const nodeSize = useAppSelector(getNodeSize);

  const [active, setActive] = useState(false);
  const [path, setPath] = useState<Pos[]>([]);

  useEffect(() => {
    if (active) {
      setPath(generatePath(nodesGrid, startNode, endNode).map((point) => ({ x: point.x, y: point.y })));
    }
  }, [nodesGrid, startNode, endNode, active])

  return {
    path,
    pathActive: active,
    togglePath() {
      if (active) {
        setActive(false);
        setPath([]);
      } else {
        setActive(true);
        setPath(generatePath(nodesGrid, startNode, endNode).map((point) => ({ x: point.x, y: point.y })));
      }
    }
  }
}