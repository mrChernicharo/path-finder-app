import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Node, Pos } from '../redux/modules/world-map/world-map';
import { getNodes, getStartNode, getEndNode, getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';
import { generatePath } from '../utils/a-start';

export function usePath() {
  const nodesGrid = useAppSelector(getNodes);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);

  const [active, setActive] = useState(false);
  const [path, setPath] = useState<Node[]>([]);
  const [neighbors, setNeighbors] = useState<Node[]>([]);

  const interval = useRef<any>();

  function drawPath() {
    clearPath();

    const { pathObj, closedSetObj } = generatePath(nodesGrid, startNode, endNode);
    const pathArr = Object.values(pathObj);
    const closedSetArr = Object.values(closedSetObj);

    let i = 0;
    interval.current = setInterval(() => {
      if (i >= pathArr.length) {
        interval.current && clearInterval(interval.current);
        return;
      }
      const currNode = pathArr[i];
      const neighbors = closedSetArr.filter((point) => point.id !== currNode.id && point.g < currNode.g);
      
      setPath((prev) => [...prev, { ...currNode }]);
      setNeighbors(neighbors);
      i++;
    }, 30);
  }

  function clearPath() {
    setPath([]);
    setNeighbors([]);
    interval.current && clearInterval(interval.current);
  }

  useLayoutEffect(() => {
    if (active) {
      // changed any blocked tile in the way?
      // true draw path : false do nothing
      drawPath();
    }
  }, []);

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
