import { usePath } from '../hooks/usePath';
import { PathStatus } from '../redux/modules/world-map/world-map';
import { getPathStatus } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';


const BTN_TEXT: Record<PathStatus, string> = {
  [PathStatus.Idle]:'run path finder!',
  [PathStatus.Active]:'clear' ,
  [PathStatus.Done]:'run again!',
  [PathStatus.Fail]:'Check your board and Run it again!',
}

export default function ActionBtn(props: { togglePath: () => void }) {
  const pathStatus = useAppSelector(getPathStatus);

  return <button onClick={props.togglePath}>{BTN_TEXT[pathStatus]}</button>;
}
