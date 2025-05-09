import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form as BootstrapForm, Button } from 'react-bootstrap';

const PacienteForm = ({ paciente, onSubmit, onCancel }) => {
  const initialValues = paciente || {
    nombre: '',
    apellido: '',
    cedula: '',
    fecha_nacimiento: '',
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    apellido: Yup.string().required('El apellido es requerido'),
    cedula: Yup.string()
      .required('La cédula es requerida')
      .matches(/^[0-9]+$/, 'La cédula debe contener solo números')
      .min(10, 'La cédula debe tener al menos 10 dígitos')
      .max(13, 'La cédula no puede tener más de 13 dígitos'),
    fecha_nacimiento: Yup.date().nullable(),
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
      {({ isSubmitting }) => (
        <Form>
          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Nombre</BootstrapForm.Label>
            <Field
              name="nombre"
              as={BootstrapForm.Control}
              type="text"
              placeholder="Nombre del paciente"
            />
            <ErrorMessage
              name="nombre"
              component="div"
              className="text-danger"
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Apellido</BootstrapForm.Label>
            <Field
              name="apellido"
              as={BootstrapForm.Control}
              type="text"
              placeholder="Apellido del paciente"
            />
            <ErrorMessage
              name="apellido"
              component="div"
              className="text-danger"
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Cédula</BootstrapForm.Label>
            <Field
              name="cedula"
              as={BootstrapForm.Control}
              type="text"
              placeholder="Cédula del paciente"
            />
            <ErrorMessage
              name="cedula"
              component="div"
              className="text-danger"
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Fecha de Nacimiento</BootstrapForm.Label>
            <Field
              name="fecha_nacimiento"
              type="date"
              as={BootstrapForm.Control}
            />
            <ErrorMessage
              name="fecha_nacimiento"
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

export default PacienteForm;