import SettingsPane from "./components/SettingsPane";
import WorldMap from "./components/WorldMap";

export const MAX_WIDTH = 100;
export const MAX_HEIGHT = 50;

function App() {
  return (
    <div className="App">
      <h1>Path finder</h1>
      <SettingsPane />
      <WorldMap />
    </div>
  );
}



export default App;
