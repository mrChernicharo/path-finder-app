import { useAppDispatch, useAppSelector } from '../redux/util';
import { getNodes, getSelectionMode, getStartNode, getEndNode } from '../redux/modules/world-map/world-map.selector';
import { SelectionMode, worldMapActions } from '../redux/modules/world-map/world-map';
import DestinationPoint from './DestinationPoint';
import Path from './Path';
import Neighbors from './Neighbors';
import { usePath } from '../hooks/usePath';
import NodeGrid from './NodeGrid';

export default function WorldMap() {
  const nodesGrid = useAppSelector(getNodes);
  const selectionMode = useAppSelector(getSelectionMode);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const dispatch = useAppDispatch();
  const { setSelectionMode } = worldMapActions;
  const { path, neighbors, pathActive, togglePath } = usePath();

  return (
    <div className="w-screen">

      <button onClick={togglePath}>{pathActive ? 'clear' : 'run path finder!'}</button>

      <div
        className="grid-outer-wrapper relative"
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
      >
        <NodeGrid nodesGrid={nodesGrid} />

        <DestinationPoint type="start" pos={startNode} />
        <DestinationPoint type="end" pos={endNode} />

        <Neighbors neighbors={neighbors} />
        <Path path={path} />
      </div>
    </div>
  );
}
