import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Row, Col, Spinner } from 'react-bootstrap';
import { 
  getConsultas, 
  deleteConsulta,
  getConsultasByMedico 
} from '../services/consultasService';
import { getPacientes } from '../services/pacientesService';
import ConsultaForm from './ConsultaForm';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

const ConsultaList = () => {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentConsulta, setCurrentConsulta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [consultasData, pacientesData] = await Promise.all([
          getConsultas(),
          getPacientes(),
        ]);
        setConsultas(consultasData);
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

  const handleOpenModal = (consulta = null) => {
    setCurrentConsulta(consulta);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentConsulta(null);
  };

  const handleSaveConsulta = async (consultaData) => {
    try {
      setLoading(true);
      if (currentConsulta) {
        await updateConsulta(currentConsulta.id, consultaData);
        Swal.fire('Éxito', 'Consulta actualizada correctamente', 'success');
      } else {
        await createConsulta(consultaData);
        Swal.fire('Éxito', 'Consulta creada correctamente', 'success');
      }
      const updatedConsultas = await getConsultas();
      setConsultas(updatedConsultas);
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

  const handleDeleteConsulta = async (id) => {
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
        await deleteConsulta(id);
        const updatedConsultas = await getConsultas();
        setConsultas(updatedConsultas);
        Swal.fire('Eliminado', 'La consulta ha sido eliminada', 'success');
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

  const filteredConsultas = consultas.filter(consulta => {
    const paciente = pacientes.find(p => p.id === consulta.id_paciente);
    const searchLower = searchTerm.toLowerCase();
    return (
      consulta.motivo.toLowerCase().includes(searchLower) ||
      consulta.diagnostico.toLowerCase().includes(searchLower) ||
      (paciente && (
        paciente.nombre.toLowerCase().includes(searchLower) ||
        paciente.apellido.toLowerCase().includes(searchLower) ||
        paciente.cedula.includes(searchTerm)
      ))
    );
  });

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>Consultas Médicas</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => handleOpenModal()}>
            Nueva Consulta
          </Button>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por motivo, diagnóstico o paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Paciente</th>
            <th>Motivo</th>
            <th>Diagnóstico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredConsultas.length > 0 ? (
            filteredConsultas.map((consulta) => {
              const paciente = pacientes.find(p => p.id === consulta.id_paciente);
              return (
                <tr key={consulta.id}>
                  <td>{format(new Date(consulta.fecha), 'dd/MM/yyyy HH:mm')}</td>
                  <td>
                    {paciente ? `${paciente.nombre} ${paciente.apellido}` : 'Paciente no encontrado'}
                  </td>
                  <td>{consulta.motivo}</td>
                  <td>{consulta.diagnostico}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleOpenModal(consulta)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteConsulta(consulta.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No hay consultas registradas</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentConsulta ? 'Editar Consulta' : 'Nueva Consulta'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ConsultaForm
            consulta={currentConsulta}
            pacientes={pacientes}
            onSubmit={handleSaveConsulta}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConsultaList;