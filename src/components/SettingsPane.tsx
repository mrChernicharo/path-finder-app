import { useAppSelector, useAppDispatch } from '../redux/util';
import { worldMapActions } from '../redux/modules/world-map/world-map';
import { getMapWidth, getMapHeight, getNodeSize, getNodes } from '../redux/modules/world-map/world-map.selector';
import { MIN_WIDTH, MAX_WIDTH, MIN_HEIGHT, MAX_HEIGHT, MIN_NODE_SIZE, MAX_NODE_SIZE } from '../utils/constants';

export default function SettingsPane() {
  const width = useAppSelector(getMapWidth);
  const height = useAppSelector(getMapHeight);
  const nodeSize = useAppSelector(getNodeSize);
  const dispatch = useAppDispatch();

  const { setWidth, setHeight, setNodeSize } = worldMapActions;

  return (
    <div className="">
      <div>
        <label htmlFor="map-width">COLS</label>
        <input
          type="range"
          name="map-width"
          className="mx-2"
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
        <label htmlFor="map-height">ROWS</label>
        <input
          type="range"
          name="map-height"
          className="mx-2"
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
        <label htmlFor="map-node-size">ZOOM</label>
        <input
          type="range"
          name="map-node-size"
          className="mx-2"
          min={MIN_NODE_SIZE}
          max={MAX_NODE_SIZE}
          value={nodeSize}
          onChange={(e) => {
            dispatch(setNodeSize(parseInt(e.target.value)));
          }}
        />
      </div>
    </div>
  );
}
