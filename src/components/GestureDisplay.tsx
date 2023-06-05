import { getSelectionMode } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';

export default function GestureDisplay() {
  const selectionMode = useAppSelector(getSelectionMode);
  return <div>Gesture {selectionMode}</div>;
}
