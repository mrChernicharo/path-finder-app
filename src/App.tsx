import ActionBtn from './components/ActionBtn';
import GestureDisplay from './components/GestureDisplay';
import PathStatusDisplay from './components/PathStatusDisplay';
import SettingsPane from './components/SettingsPane';
import WorldMap from './components/WorldMap';
import { usePath } from './hooks/usePath';

function App() {
  const { togglePath } = usePath();
  return (
    <div>
      <h1>Path finder</h1>
      <ul className="text-xs">
        <li>- Press left btn to block nodes</li>
        <li>- Press right btn to unblock nodes</li>
      </ul>
      <SettingsPane />
      <PathStatusDisplay />
      <GestureDisplay />

      <ActionBtn togglePath={togglePath} />
      <WorldMap />
    </div>
  );
}

export default App;
