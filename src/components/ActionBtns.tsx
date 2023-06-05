import { usePath } from '../hooks/usePath';
import { PathStatus } from '../redux/modules/world-map/world-map';
import { getPathStatus } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';

const BTN_TEXT: Record<PathStatus, string> = {
  [PathStatus.Idle]: 'run path finder!',
  [PathStatus.Active]: 'cancel',
  [PathStatus.Done]: 'run again!',
  [PathStatus.Fail]: 'check your board and run it again!',
};

export default function ActionBtns(props: { togglePath: () => void, clear: () => void }) {
  const pathStatus = useAppSelector(getPathStatus);

  return (
    <div className="flex justify-center my-5">
      <button onClick={props.togglePath}>{BTN_TEXT[pathStatus]}</button>
      <button onClick={props.clear}>Clear</button>
    </div>
  );
}
