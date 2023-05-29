import { useAppDispatch, useAppSelector } from "../redux/modules/util";
import {
  getNodes,
} from "../redux/modules/world-map.selector";
import { SelectionMode, worldMapActions } from "../redux/modules/world-map";
import Node from "./Node";

export default function WorldMap() {
  const nodesGrid = useAppSelector(getNodes);
  const { setSelectionMode } = worldMapActions;
  const dispatch = useAppDispatch();

  console.log(nodesGrid);

  return (
    <div>
      <div>World Map</div>
      <ul className="text-xs">
        <li>- Press left btn to block nodes</li>
        <li>- Press right btn to unblock nodes</li>
      </ul>

      <div
        className="grid-outer-wrapper"
        onMouseDown={(e) => {
          (e.buttons === 1 || e.buttons === 2) &&
            dispatch(setSelectionMode(SelectionMode.Active));
        }}
        onMouseUp={(e) => {
          dispatch(setSelectionMode(SelectionMode.Idle));
        }}
        onMouseLeave={(e) => {
          dispatch(setSelectionMode(SelectionMode.Idle));
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {nodesGrid.map((row, i) => (
          <div key={i} className="flex">
            {row.map((node, j) => (
              // <Node key={"" + i + j} node={node} />
              <div key={"" + i + j}>
                <Node node={node}/>
              </div>
            ))}
          </div>
        ))}

        {/* <div className=""></div> */}
      </div>
    </div>
  );
}

