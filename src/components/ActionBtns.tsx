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

const BTN_COLOR: Record<PathStatus, string> = {
  [PathStatus.Idle]: '#cf34fd',
  [PathStatus.Active]: '#000',
  [PathStatus.Done]: '#cf34fd',
  [PathStatus.Fail]: 'red',
};

export default function ActionBtns() {
  const pathStatus = useAppSelector(getPathStatus);
  const { togglePath, clearPath, clearWalls } = usePath();

  return (
    <div className="flex justify-center flex-wrap pt-5">
      <button
        className="uppercase"
        onClick={togglePath}
        style={{
          background: BTN_COLOR[pathStatus],
        }}
      >
        {BTN_TEXT[pathStatus]}
      </button>
      {pathStatus === PathStatus.Done ? <button onClick={clearPath}>clear path</button> : null}
      {pathStatus === PathStatus.Done || pathStatus === PathStatus.Fail ? (
        <button onClick={clearWalls}>clear walls</button>
      ) : null}
    </div>
  );
}
