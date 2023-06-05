import { usePath } from '../hooks/usePath';

export default function ActionBtn(props: { pathActive: boolean; togglePath: () => void }) {
  const { pathActive, togglePath } = props;

  return <button onClick={togglePath}>{pathActive ? 'clear' : 'run path finder!'}</button>;
}
