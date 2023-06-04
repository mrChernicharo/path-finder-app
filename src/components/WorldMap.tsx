import { useAppDispatch, useAppSelector } from '../redux/util';
import { getNodes, getSelectionMode, getStartNode, getEndNode } from '../redux/modules/world-map/world-map.selector';
import { SelectionMode, worldMapActions } from '../redux/modules/world-map/world-map';
import { NodeComponent } from './Node';
import DestinationPoint from './DestinationPoint';
import Path from './Path';
import { idMaker } from '../utils/helpers';
import Neighbors from './Neighbors';
import { usePath } from '../hooks/usePath';

export default function WorldMap() {
  const nodesGrid = useAppSelector(getNodes);
  const selectionMode = useAppSelector(getSelectionMode);
  const startNode = useAppSelector(getStartNode);
  const endNode = useAppSelector(getEndNode);
  const dispatch = useAppDispatch();
  const { setSelectionMode, updateNode, updateNodes } = worldMapActions;
  const { path, neighbors, pathActive, togglePath } = usePath();

  return (
    <div>
      <div>World Map</div>
      <ul className="text-xs">
        <li>- Press left btn to block nodes</li>
        <li>- Press right btn to unblock nodes</li>
      </ul>

      <button onClick={togglePath}>{pathActive ? 'clear' : 'run'}</button>

      <div
        className="grid-outer-wrapper relative "
        onMouseDown={(e) => {
          (e.buttons === 1 || e.buttons === 2) &&
            selectionMode === SelectionMode.Idle &&
            dispatch(setSelectionMode(SelectionMode.Active));
        }}
        onMouseUp={(e) => {
          dispatch(setSelectionMode(SelectionMode.Idle));
        }}
        onContextMenu={(e) => {
          console.log('right click');
          e.preventDefault();
        }}
        onClick={() => {
          console.log('click');
        }}
      >
        <div className="border-slate-400 border-t-[1px] border-l-[1px]">
          {nodesGrid.map((row, i) => (
            <div key={idMaker()} className="flex">
              {row.map((node, j) => {
                return <NodeComponent key={idMaker()} node={node} />;
              })}
            </div>
          ))}
        </div>

        <DestinationPoint type="start" pos={startNode} />
        <DestinationPoint type="end" pos={endNode} />

        <Path path={path} />
        <Neighbors neighbors={neighbors} />
      </div>
    </div>
  );
}
