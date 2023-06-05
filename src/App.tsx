import ActionBtns from './components/ActionBtns';
import GestureDisplay from './components/GestureDisplay';
import Header from './components/Header';
import PathStatusDisplay from './components/PathStatusDisplay';
import SettingsPane from './components/SettingsPane';
import WorldMap from './components/WorldMap';


function App() {
  return (
    <div>
      <Header />

      <SettingsPane />
      {/* <PathStatusDisplay /> */}
      {/* <GestureDisplay /> */}

      <ActionBtns />

      <WorldMap />
    </div>
  );
}

export default App;
