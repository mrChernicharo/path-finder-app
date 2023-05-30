import { useState, useEffect, useRef } from 'react';
import { Pos } from '../redux/modules/world-map/world-map';
import { generatePath } from '../utils/helpers';
import { getNodes, getStartNode, getEndNode, getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';

export function usePath() {
  const nodesGrid = useAppSelector(getNodes);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const nodeSize = useAppSelector(getNodeSize);

  const [active, setActive] = useState(false);
  const [path, setPath] = useState<Pos[]>([]);
  const [neighbors, setNeighbors] = useState<Pos[]>([]);

  const interval = useRef<any>();

  function drawPath() {
    clearPath();

    const generated = generatePath(nodesGrid, startNode, endNode);

    let i = 0;
    interval.current = setInterval(() => {
      if (i >= generated.length) {
        interval.current && clearInterval(interval.current);
        return;
      }
      const pathSegment = generated[i];
      const { x, y, neighbors } = pathSegment;

      const neighborPos: Pos[] = [];
      for (const n of neighbors) {
        const { x, y, blocked } = n;
        if (blocked) continue;
        neighborPos.push({ x, y });
      }

      setPath((prev) => [...prev, { x, y }]);
      setNeighbors((prev) => [...prev, ...neighborPos]);
      i++;
    }, 100);
  }

  function clearPath() {
    setPath([]);
    setNeighbors([]);
    interval.current && clearInterval(interval.current);
  }

  useEffect(() => {
    if (active) {
      // changed any blocked tile in the way?
      // true draw path : false do nothing
      drawPath();
    }
  }, [nodesGrid, startNode, endNode, active]);

  return {
    path,
    neighbors,
    pathActive: active,
    togglePath() {
      if (active) {
        setActive(false);
        clearPath();
      } else {
        setActive(true);
        drawPath();
      }
    },
  };
}
