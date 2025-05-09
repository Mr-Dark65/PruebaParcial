import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form as BootstrapForm, Button, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getMedicos } from '../services/medicoService';

const ConsultaForm = ({ consulta, pacientes, onSubmit, onCancel }) => {
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const medicosData = await getMedicos();
        setMedicos(medicosData);
      } catch (error) {
        console.error('Error fetching medicos:', error);
      }
    };

    fetchMedicos();
  }, []);

  const initialValues = consulta || {
    fecha: new Date().toISOString().slice(0, 16),
    motivo: '',
    diagnostico: '',
    tratamiento: '',
    id_medico: '',
    id_paciente: '',
  };

  const validationSchema = Yup.object().shape({
    fecha: Yup.date().required('La fecha es requerida'),
    motivo: Yup.string().required('El motivo es requerido'),
    diagnostico: Yup.string().required('El diagnóstico es requerido'),
    tratamiento: Yup.string().required('El tratamiento es requerido'),
    id_medico: Yup.number().required('Seleccione un médico'),
    id_paciente: Yup.number().required('Seleccione un paciente'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <Row>
            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Fecha y Hora</BootstrapForm.Label>
                <Field
                  name="fecha"
                  type="datetime-local"
                  as={BootstrapForm.Control}
                />
                <ErrorMessage
                  name="fecha"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Paciente</BootstrapForm.Label>
                <Field
                  name="id_paciente"
                  as="select"
                  className="form-select"
                >
                  <option value="">Seleccione un paciente</option>
                  {pacientes.map((paciente) => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nombre} {paciente.apellido} - {paciente.cedula}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="id_paciente"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Médico</BootstrapForm.Label>
                <Field
                  name="id_medico"
                  as="select"
                  className="form-select"
                >
                  <option value="">Seleccione un médico</option>
                  {medicos.map((medico) => (
                    <option key={medico.id} value={medico.id}>
                      {medico.nombre} {medico.apellido} - {medico.especialidad?.nombre}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="id_medico"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
          </Row>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Motivo de la Consulta</BootstrapForm.Label>
            <Field
              name="motivo"
              as={BootstrapForm.Control}
              type="text"
              placeholder="Motivo de la consulta"
            />
            <ErrorMessage
              name="motivo"
              component="div"
              className="text-danger"
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Diagnóstico</BootstrapForm.Label>
            <Field
              name="diagnostico"
              as={BootstrapForm.Control}
              as1="textarea"
              rows={3}
              placeholder="Diagnóstico"
            />
            <ErrorMessage
              name="diagnostico"
              component="div"
              className="text-danger"
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Tratamiento</BootstrapForm.Label>
            <Field
              name="tratamiento"
              as={BootstrapForm.Control}
              as1="textarea"
              rows={3}
              placeholder="Tratamiento"
            />
            <ErrorMessage
              name="tratamiento"
              component="div"
              className="text-danger"
            />
          </BootstrapForm.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onCancel} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ConsultaForm;