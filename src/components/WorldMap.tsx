import { useAppDispatch, useAppSelector } from '../redux/modules/util';
import { getNodeSize, getNodes, getSelectionMode } from '../redux/modules/world-map.selector';
import { SelectionMode, worldMapActions } from '../redux/modules/world-map';
import { Node } from './Node';
import Draggable from './Draggable';
import DestinationPoint from './DestinationPoint';

export default function WorldMap() {
  const nodesGrid = useAppSelector(getNodes);
  const selectionMode = useAppSelector(getSelectionMode);
  const { setSelectionMode } = worldMapActions;

  const dispatch = useAppDispatch();

  return (
    <div>
      <div>World Map</div>
      <ul className="text-xs">
        <li>- Press left btn to block nodes</li>
        <li>- Press right btn to unblock nodes</li>
      </ul>

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
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {nodesGrid.map((row, i) => (
          <div key={i} className="flex">
            {row.map((node, j) => (
              <Node key={'' + i + j} row={node.y} col={node.x} blocked={node.blocked} />
            ))}
          </div>
        ))}

        <DestinationPoint type="start" initialPos={{ x: 2, y: 2 }} />
        <DestinationPoint type="end" initialPos={{ x: 32, y: 15 }} />
      </div>
    </div>
  );
}
