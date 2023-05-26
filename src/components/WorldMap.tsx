import { useAppDispatch, useAppSelector } from '../redux/modules/util';
import { getNodeSize, getNodes, getSelectionMode } from '../redux/modules/world-map.selector';
import { SelectionMode, worldMapActions } from '../redux/modules/world-map';
import { Node } from './Node';
import Draggable from './Draggable';

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
              <Node key={'' + i + j} row={node.y} col={node.x} />
            ))}
          </div>
        ))}

        <DestinationPoint type="start" initialPos={{ x: 2, y: 2 }} />
        <DestinationPoint type="end" initialPos={{ x: 32, y: 15 }} />
      </div>
    </div>
  );
}

export function DestinationPoint(props: { type: 'start' | 'end'; initialPos: { x: number; y: number } }) {
  const {
    type,
    initialPos: { x, y },
  } = props;
  const nodeSize = useAppSelector(getNodeSize);

  return (
    <Draggable width={nodeSize} height={nodeSize} initialPos={{ x: x * nodeSize, y: y * nodeSize }}>
      <div
        className={`${type === 'start' ? 'bg-green-500' : 'bg-red-500'} hover:cursor-grab`}
        style={{
          width: nodeSize,
          height: nodeSize,
          clipPath: `polygon(50% 0%, 66% 31%, 98% 35%, 72% 59%, 79% 91%, 50% 73%, 21% 91%, 27% 58%, 2% 35%, 34% 30%)`,
        }}
      />
    </Draggable>
  );
}
