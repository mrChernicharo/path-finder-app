import SettingsPane from './components/SettingsPane';
import WorldMap from './components/WorldMap';
import { useDrag } from './hooks/useDrag';

function App() {
  return (
    <div>
      <h1>Path finder</h1>
      <ul className="text-xs">
        <li>- Press left btn to block nodes</li>
        <li>- Press right btn to unblock nodes</li>
      </ul>

      <SettingsPane />
      <WorldMap />
    </div>
  );
}

export default App;
