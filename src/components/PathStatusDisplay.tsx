import { getPathStatus } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';

export default function PathStatusDisplay() {
  const pathStatus = useAppSelector(getPathStatus);
  return <div>Path status: {pathStatus}</div>;
}
