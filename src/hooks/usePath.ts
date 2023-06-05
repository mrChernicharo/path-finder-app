import { useRef, useLayoutEffect } from 'react';
import { PathStatus, worldMapActions } from '../redux/modules/world-map/world-map';
import {
  getNodes,
  getStartNode,
  getEndNode,
  getNeighbors,
  getPathStatus,
  getPath,
} from '../redux/modules/world-map/world-map.selector';
import { useAppDispatch, useAppSelector } from '../redux/util';
import { generatePath } from '../utils/a-start';

export function usePath() {
  const nodesGrid = useAppSelector(getNodes);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const pathStatus = useAppSelector(getPathStatus);
  const path = useAppSelector(getPath);

  const { setPathStatus, setPath, setNeighbors } = worldMapActions;
  const dispatch = useAppDispatch();

  const interval = useRef<any>();

  function drawPath() {
    clearPath();

    const { pathObj, closedSetObj } = generatePath(nodesGrid, startNode, endNode);
    const pathArr = Object.values(pathObj);
    const closedSetArr = Object.values(closedSetObj);

    if (!pathArr.length) {
      dispatch(setPathStatus(PathStatus.Fail));
      return;
    }

    let i = 0;
    interval.current = setInterval(() => {
      if (i >= pathArr.length) {
        interval.current && clearInterval(interval.current);
        dispatch(setPathStatus(PathStatus.Done));
        return;
      }
      const currNode = pathArr[i];
      const currPath = pathArr.slice(0, i + 1);
      const currNeighbors = closedSetArr.filter((point) => point.id !== currNode.id && point.g < currNode.g);

      dispatch(setPath(currPath));
      dispatch(setNeighbors(currNeighbors));
      i++;
    }, 30);
  }

  function clearPath() {
    dispatch(setPath([]));
    dispatch(setNeighbors([]));
    interval.current && clearInterval(interval.current);
  }

  useLayoutEffect(() => {
    if (pathStatus === PathStatus.Active) {
      // changed any blocked tile in the way?
      // true draw path : false do nothing
      drawPath();
    }
  }, []);

  return {
    togglePath() {
      if (pathStatus === PathStatus.Active) {
        dispatch(setPathStatus(PathStatus.Idle));
        clearPath();
      } else {
        dispatch(setPathStatus(PathStatus.Active));
        drawPath();
      }
    },
  };
}
