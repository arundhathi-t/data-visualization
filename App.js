import './App.css';
import { DashboardProvider } from './Context/DashboardContext';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div className="App">
      <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
      
    </div>
  );
}

export default App;
