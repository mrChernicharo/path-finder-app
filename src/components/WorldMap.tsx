import { useAppDispatch, useAppSelector } from '../redux/modules/util';
import { getNodeSize, getNodes, getSelectionMode } from '../redux/modules/world-map.selector';
import { SelectionMode, worldMapActions } from '../redux/modules/world-map';
import { Node } from './Node';
import Draggable from './Draggable';

export default function WorldMap() {
  const nodesGrid = useAppSelector(getNodes);
  const nodeSize = useAppSelector(getNodeSize);
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
              <Node key={'' + i + j} row={node.y} col={node.x} />
            ))}
          </div>
        ))}

        <Draggable width={nodeSize} height={nodeSize} initialPos={{ x: 0, y: 0 }}>
          <div
            className="bg-green-500 hover:cursor-grab"
            style={{
              width: nodeSize,
              height: nodeSize,
              clipPath: `polygon(50% 0%, 66% 31%, 98% 35%, 72% 59%, 79% 91%, 50% 73%, 21% 91%, 27% 58%, 2% 35%, 34% 30%)`,
            }}
          />
        </Draggable>
        <Draggable width={nodeSize} height={nodeSize} initialPos={{ x: 2 * nodeSize, y: 2 * nodeSize }}>
          <div className="bg-red-500 hover:cursor-grab" style={{
              width: nodeSize,
              height: nodeSize,
              clipPath: `polygon(50% 0%, 66% 31%, 98% 35%, 72% 59%, 79% 91%, 50% 73%, 21% 91%, 27% 58%, 2% 35%, 34% 30%)`,
            }} />
        </Draggable>
      </div>
    </div>
  );
}
