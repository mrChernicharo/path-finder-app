import { useAppDispatch, useAppSelector } from '../redux/modules/util';
import { getNodeSize, getNodes } from '../redux/modules/world-map.selector';
import { SelectionMode, worldMapActions } from '../redux/modules/world-map';
import { Node } from './Node';
import Draggable from './Draggable';

export default function WorldMap() {
  const nodesGrid = useAppSelector(getNodes);
  const nodeSize = useAppSelector(getNodeSize);
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
          (e.buttons === 1 || e.buttons === 2) && dispatch(setSelectionMode(SelectionMode.Active));
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
              <Node key={'' + i + j} row={node.y} col={node.x} />
            ))}
          </div>
        ))}

        <Draggable width={nodeSize} height={nodeSize}>
          <div className="bg-green-500" style={{ width: nodeSize, height: nodeSize }} />
        </Draggable>
        <Draggable width={nodeSize} height={nodeSize}>
          <div className="bg-red-500" style={{ width: nodeSize, height: nodeSize }} />
        </Draggable>
      </div>
    </div>
  );
}
