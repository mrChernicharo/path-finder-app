import { useAppSelector, useAppDispatch } from '../redux/util';
import { worldMapActions } from '../redux/modules/world-map/world-map';
import { getMapWidth, getMapHeight, getNodeSize, getNodes } from '../redux/modules/world-map/world-map.selector';
import { MIN_WIDTH, MAX_WIDTH, MIN_HEIGHT, MAX_HEIGHT, MIN_NODE_SIZE, MAX_NODE_SIZE } from '../utils/constants';

export default function SettingsPane() {
  const width = useAppSelector(getMapWidth);
  const height = useAppSelector(getMapHeight);
  const nodeSize = useAppSelector(getNodeSize);
  const nodes = useAppSelector(getNodes);
  const dispatch = useAppDispatch();

  const { setWidth, setHeight, setNodeSize } = worldMapActions;

  return (
    <div>
      <div className='flex items-center'>
        <label htmlFor="map-width">width</label>
        <input
          type="range"
          name="map-width"
          min={MIN_WIDTH}
          max={MAX_WIDTH}
          value={width}
          className='mx-2'
          onChange={(e) => {
            dispatch(setWidth(parseInt(e.target.value)));
          }}
        />
        <span>{width}</span>
      </div>

      <div className='flex items-center'>
        <label htmlFor="map-height">height</label>
        <input
          type="range"
          name="map-height"
          min={MIN_HEIGHT}
          max={MAX_HEIGHT}
          value={height}
          className='mx-2'
          onChange={(e) => {
            dispatch(setHeight(parseInt(e.target.value)));
          }}
        />
        <span>{height}</span>
      </div>

      {/* <div>
        <label htmlFor="map-node-size">node size</label>
        <input
          type="range"
          name="map-node-size"
          min={MIN_NODE_SIZE}
          max={MAX_NODE_SIZE}
          value={nodeSize}
          onChange={(e) => {
            dispatch(setNodeSize(parseInt(e.target.value)));
          }}
        />
        <span>{nodeSize}</span>
      </div> */}


      {/* <button onClick={() => generatePath()}>Generate Path!</button> */}
    </div>
  );
}
