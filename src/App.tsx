import SettingsPane from './components/SettingsPane';
import WorldMap from './components/WorldMap';
import { useDrag } from './hooks/useDrag';

function App() {

  return (
    <div >
      <h1>Path finder</h1>
      <SettingsPane />
      <WorldMap />
    </div>
  );
}



export default App;
