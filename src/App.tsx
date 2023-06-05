import ActionBtns from './components/ActionBtns';
import GestureDisplay from './components/GestureDisplay';
import PathStatusDisplay from './components/PathStatusDisplay';
import SettingsPane from './components/SettingsPane';
import WorldMap from './components/WorldMap';
import { usePath } from './hooks/usePath';

function App() {
  const { togglePath, clearPath } = usePath();
  return (
    <div>
      <SettingsPane />
      {/* <PathStatusDisplay /> */}
      {/* <GestureDisplay /> */}

        <ActionBtns togglePath={togglePath} clear={clearPath}/>
      
      <WorldMap />
    </div>
  );
}

export default App;
