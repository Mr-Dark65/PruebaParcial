import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { getConsultas } from '../services/consultasService';
import { getPacientes } from '../services/pacientesService';

const Dashboard = ({ user }) => {
  const [consultasCount, setConsultasCount] = useState(0);
  const [pacientesCount, setPacientesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [consultas, pacientes] = await Promise.all([
          getConsultas(),
          getPacientes(),
        ]);
        setConsultasCount(consultas.length);
        setPacientesCount(pacientes.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Bienvenido, {user.nombre} {user.apellido}</h2>
      <p className="text-muted">
        {user.rol} - {user.centro_medico?.nombre}
      </p>
      
      <Row className="mt-4">
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Consultas Médicas</Card.Title>
              <Card.Text className="display-4">{consultasCount}</Card.Text>
              <Card.Link href="/consultas">Ver todas</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Pacientes Registrados</Card.Title>
              <Card.Text className="display-4">{pacientesCount}</Card.Text>
              <Card.Link href="/pacientes">Ver todos</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;