import SettingsPane from "./components/SettingsPane";
import WorldMap from "./components/WorldMap";

export const MAX_WIDTH = 20;
export const MAX_HEIGHT = 20;

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
