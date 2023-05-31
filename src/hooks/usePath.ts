import { useState, useEffect, useRef } from 'react';
import { Pos } from '../redux/modules/world-map/world-map';
import { distribute, generatePath } from '../utils/helpers';
import { getNodes, getStartNode, getEndNode, getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';

export function usePath() {
  const nodesGrid = useAppSelector(getNodes);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const nodeSize = useAppSelector(getNodeSize);

  const [active, setActive] = useState(false);
  const [path, setPath] = useState<Pos[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<Pos[]>([]);

  const interval = useRef<any>();

  function drawPath() {
    clearPath();

    const { path: generatedPath, closedSetHistory } = generatePath(nodesGrid, startNode, endNode);
    console.log({ generatedPath, closedSetHistory });

    const distributedIndices = distribute(generatedPath.length, closedSetHistory.length);

    let i = 0;
    let highestPathIdx = 0;
    interval.current = setInterval(() => {
      const currPathIdx = distributedIndices[i];
      const currNode = generatedPath[currPathIdx];

      if (i >= closedSetHistory.length || !currNode) {
        interval.current && clearInterval(interval.current);
        return;
      }

      const closedSet = closedSetHistory[i]
        .map((p) => p.neighbors.filter((n) => !n.blocked).map((p) => ({ x: p.x, y: p.y })))
        .flat();

      setVisitedNodes(closedSet);

      if (highestPathIdx === currPathIdx) {
        setPath((prev) => [...prev, { x: currNode.x, y: currNode.y }]);
        highestPathIdx++;
      }
      i++;
    }, 40);
  }

  function clearPath() {
    setPath([]);
    setVisitedNodes([]);
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
    neighbors: visitedNodes,
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
