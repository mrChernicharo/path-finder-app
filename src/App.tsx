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

      <div className='flex justify-center pt-2 text-sm'>
        interact with the board, build walls, move stars around 
      </div>


      <WorldMap />

      <ActionBtns />
    </div>
  );
}

export default App;
