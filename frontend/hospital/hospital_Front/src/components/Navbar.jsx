import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

const CustomNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout?.();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Sistema Hospitalario
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/consultas">
              Consultas
            </Nav.Link>
            <Nav.Link as={NavLink} to="/pacientes">
              Pacientes
            </Nav.Link>
          </Nav>
          <Nav>
            {user && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {user.nombre} {user.apellido}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item disabled>
                    {user.rol} - {user.centro_medico?.nombre || 'Sin centro'}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
