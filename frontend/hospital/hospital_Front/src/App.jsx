import { Routes, Route } from 'react-router-dom';
import { CityProvider } from './context/CityContext';
import CitySelector from './components/CitySelector';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Consultas from './pages/ConsultasPage';
import Pacientes from './pages/PacientesPage';
import './App.css';

function App() {
  return (
    <CityProvider>
      <div className="app">
        <Navbar />
        <div className="city-selector-container">
          <CitySelector />
        </div>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/consultas" element={<Consultas />} />
            <Route path="/pacientes" element={<Pacientes />} />
          </Routes>
        </main>
      </div>
    </CityProvider>
  );
}

export default App;
