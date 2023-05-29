import { useAppSelector, useAppDispatch } from "../redux/modules/util";
import { MAX_CELL_SIZE, MAX_HEIGHT, MAX_WIDTH, MIN_CELL_SIZE, MIN_HEIGHT, MIN_WIDTH, worldMapActions } from "../redux/modules/world-map";
import { getMapWidth, getMapHeight, getNodeSize } from "../redux/modules/world-map.selector";


export default function SettingsPane() {
  const width = useAppSelector(getMapWidth);
  const height = useAppSelector(getMapHeight);
  const nodeSize = useAppSelector(getNodeSize);
  const dispatch = useAppDispatch();

  const { setWidth, setHeight, setNodeSize } = worldMapActions;

  return (
    <div>
      <div>SettingsPane</div>

      <div>
        <label htmlFor="map-width">Width</label>
        <input
          type="range"
          name="map-width"
          min={MIN_WIDTH}
          max={MAX_WIDTH}
          value={width}
          onChange={(e) => {
            dispatch(setWidth(parseInt(e.target.value)));
          }}
        />
        <span>{width}</span>
      </div>

      <div>
        <label htmlFor="map-height">Height</label>
        <input
          type="range"
          name="map-height"
          min={MIN_HEIGHT}
          max={MAX_HEIGHT}
          value={height}
          onChange={(e) => {
            dispatch(setHeight(parseInt(e.target.value)));
          }}
        />
        <span>{height}</span>
      </div>

      <div>
        <label htmlFor="map-node-size">node size</label>
        <input
          type="range"
          name="map-node-size"
          min={MIN_CELL_SIZE}
          max={MAX_CELL_SIZE}
          value={nodeSize}
          onChange={(e) => {
            dispatch(setNodeSize(parseInt(e.target.value)));
          }}
        />
        <span>{nodeSize}</span>
      </div>
    </div>
  );
}