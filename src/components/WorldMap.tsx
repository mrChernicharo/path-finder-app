import { useAppSelector } from "../redux/util";
import { getMapWidth, getMapHeight } from "../redux/modules/world-map.selector";

export default function WorldMap() {
  const width = useAppSelector(getMapWidth);
  const height = useAppSelector(getMapHeight);



  return (
    <div>
      <div>World Map</div>

    
    </div>
  );
}
