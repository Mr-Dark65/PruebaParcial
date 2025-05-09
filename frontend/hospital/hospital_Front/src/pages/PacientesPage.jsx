import { useState, useEffect } from 'react';
import { Button, Container, Table, Modal, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  getPacientes, 
  getPacienteById, 
  createPaciente, 
  updatePaciente, 
  deletePaciente,
  searchPacientes 
} from '../services/pacientesService';
import PacienteForm from '../components/PacienteForm';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

const PacientesPage = () => {
  const [pacientes, setPacientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPaciente, setCurrentPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientesData = await getPacientes();
        setPacientes(pacientesData);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (paciente = null) => {
    setCurrentPaciente(paciente);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPaciente(null);
  };

  const handleSavePaciente = async (pacienteData) => {
    try {
      setLoading(true);
      if (currentPaciente) {
        await updatePaciente(currentPaciente.id, pacienteData);
        Swal.fire('Éxito', 'Paciente actualizado correctamente', 'success');
      } else {
        await createPaciente(pacienteData);
        Swal.fire('Éxito', 'Paciente creado correctamente', 'success');
      }
      const updatedPacientes = await getPacientes();
      setPacientes(updatedPacientes);
      handleCloseModal();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePaciente = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        setLoading(true);
        await deletePaciente(id);
        const updatedPacientes = await getPacientes();
        setPacientes(updatedPacientes);
        Swal.fire('Eliminado', 'El paciente ha sido eliminado', 'success');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const results = await searchPacientes(searchTerm);
      setPacientes(results);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchTerm('');
    try {
      setLoading(true);
      const allPacientes = await getPacientes();
      setPacientes(allPacientes);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

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
      <Row className="mb-4">
        <Col>
          <h2>Gestión de Pacientes</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => handleOpenModal()}>
            Nuevo Paciente
          </Button>
        </Col>
      </Row>

      <Form onSubmit={handleSearch} className="mb-3">
        <Row>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre, apellido o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" type="submit" className="w-100">
              Buscar
            </Button>
          </Col>
          <Col md={2}>
            <Button 
              variant="secondary" 
              onClick={handleClearSearch} 
              className="w-100"
              disabled={!searchTerm}
            >
              Limpiar
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length > 0 ? (
            pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.cedula}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td>
                  {paciente.fecha_nacimiento 
                    ? format(new Date(paciente.fecha_nacimiento), 'dd/MM/yyyy') 
                    : 'No especificada'}
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleOpenModal(paciente)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeletePaciente(paciente.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No hay pacientes registrados</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPaciente ? 'Editar Paciente' : 'Nuevo Paciente'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PacienteForm
            paciente={currentPaciente}
            onSubmit={handleSavePaciente}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PacientesPage;