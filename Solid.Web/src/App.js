import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <ErrorBoundary>

        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
