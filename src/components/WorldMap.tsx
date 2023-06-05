import { useAppSelector } from '../redux/util';
import { getStartNode, getEndNode, getNeighbors, getPath } from '../redux/modules/world-map/world-map.selector';
import DestinationPoint from './DestinationPoint';
import Path from './Path';
import Neighbors from './Neighbors';
import NodeGrid from './NodeGrid';

import WorldMapWrapper from './WorldMapWrapper';

export default function WorldMap() {
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const path = useAppSelector(getPath);
  const neighbors = useAppSelector(getNeighbors);

  return (
    <WorldMapWrapper>
      <NodeGrid />
      <Neighbors neighbors={neighbors} />
      <Path path={path} />

      <DestinationPoint type="start" pos={startNode} />
      <DestinationPoint type="end" pos={endNode} />
    </WorldMapWrapper>
  );
}
