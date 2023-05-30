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
      const { x, y } = pathSegment;
      setPath((prev) => [...prev, { x, y }]);
      i++;
    }, 30);
  }

  function clearPath() {
    setPath([]);
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
