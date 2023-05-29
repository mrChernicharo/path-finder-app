import { MAX_WIDTH, MAX_HEIGHT } from "../App";
import { useAppSelector, useAppDispatch } from "../redux/util";
import { worldMapActions } from "../redux/modules/world-map";
import { getMapWidth, getMapHeight } from "../redux/modules/world-map.selector";


export default function SettingsPane() {
  const width = useAppSelector(getMapWidth);
  const height = useAppSelector(getMapHeight);
  const dispatch = useAppDispatch();

  const { setWidth, setHeight } = worldMapActions;

  return (
    <div>
      <div>SettingsPane</div>

      <div>
        <label htmlFor="map-width">Width</label>
        <input
          type="range"
          name="map-width"
          min={4}
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
          min={4}
          max={MAX_HEIGHT}
          value={height}
          onChange={(e) => {
            dispatch(setHeight(parseInt(e.target.value)));
          }}
        />
        <span>{height}</span>
      </div>
    </div>
  );
}