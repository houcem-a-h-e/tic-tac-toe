
import './index.css';
import Square from './components/Square';

function App() {
  return (
    <div className="App">
      <Square value="X" onClick={()=>console.log("clicked")} />
    </div>
  );
}

export default App;
