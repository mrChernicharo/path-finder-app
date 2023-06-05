import { useAppDispatch, useAppSelector } from '../redux/util';
import { getNodes, getSelectionMode, getStartNode, getEndNode, getNeighbors, getPath } from '../redux/modules/world-map/world-map.selector';
import { Node, SelectionMode, worldMapActions } from '../redux/modules/world-map/world-map';
import DestinationPoint from './DestinationPoint';
import Path from './Path';
import Neighbors from './Neighbors';
import { usePath } from '../hooks/usePath';
import NodeGrid from './NodeGrid';
import { klasss } from '../utils/helpers';

export default function WorldMap() {
  const selectionMode = useAppSelector(getSelectionMode);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const dispatch = useAppDispatch();
  const { setSelectionMode } = worldMapActions;
  const path = useAppSelector(getPath);
  const neighbors = useAppSelector(getNeighbors);

  return (
    <div className="w-screen">
      <div
        className={klasss(
          'grid-outer-wrapper',
          'w-min mx-auto relative'
          /* , 'border-dashed border-red-600 border-4'*/
        )}
        onMouseDown={(e) => {
          (e.buttons === 1 || e.buttons === 2) &&
            selectionMode === SelectionMode.Idle &&
            dispatch(setSelectionMode(SelectionMode.Active));
        }}
        onMouseUp={(e) => {
          dispatch(setSelectionMode(SelectionMode.Idle));
        }}
        onClick={() => {
          console.log('click');
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <NodeGrid />
        <Neighbors neighbors={neighbors} />
        <Path path={path} />

        <DestinationPoint type="start" pos={startNode} />
        <DestinationPoint type="end" pos={endNode} />
      </div>
    </div>
  );
}
