import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCity } from '../context/CityContext';

const Home = () => {
  const [stats, setStats] = useState({
    totalConsultas: 0,
    totalPacientes: 0,
    consultasHoy: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { selectedCity } = useCity();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const [consultasRes, pacientesRes] = await Promise.all([
          api.get('/consultas'),
          api.get('/pacientes')
        ]);

        const consultas = consultasRes.data;
        const pacientes = pacientesRes.data;
        const hoy = new Date().toISOString().split('T')[0];

        setStats({
          totalConsultas: consultas.length,
          totalPacientes: pacientes.length,
          consultasHoy: consultas.filter(c => c.fecha.split('T')[0] === hoy).length
        });
      } catch (err) {
        console.error('Error al cargar estadísticas:', err);
        setError('Error al cargar las estadísticas. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [selectedCity]);

  if (loading) return <div className="text-center p-5">Cargando...</div>;
  if (error) return <div className="text-center text-danger p-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard - {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}</h2>
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Total de Consultas</h5>
              <p className="card-text display-4">{stats.totalConsultas}</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/consultas')}
              >
                Ver Consultas
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Total de Pacientes</h5>
              <p className="card-text display-4">{stats.totalPacientes}</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/pacientes')}
              >
                Ver Pacientes
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Consultas Hoy</h5>
              <p className="card-text display-4">{stats.consultasHoy}</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/consultas')}
              >
                Ver Consultas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 