import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import { NavLink } from 'react-router-dom';

const NavBar = ({ setSelectedComponent }) => {
  const user = useContext(UserContext);

  if (!user || !user.userData) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleOptionClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm sticky-top">
      <Container fluid>
        <Navbar.Brand>
          <h3 className="text-warning m-0">🎓 Study App</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 d-flex gap-4 align-items-center" navbarScroll>
            <span
              className="nav-link dashboard-link"
              onClick={() => handleOptionClick('home')}
            >
              Home
            </span>

            {user.userData.type === 'Teacher' && (
              <span
                className="nav-link dashboard-link"
                onClick={() => handleOptionClick('addcourse')}
              >
                Add Course
              </span>
            )}

            {user.userData.type === 'Admin' && (
              <span
                className="nav-link dashboard-link"
                onClick={() => handleOptionClick('cousres')}
              >
                Courses
              </span>
            )}

            {user.userData.type === 'Student' && (
              <span
                className="nav-link dashboard-link"
                onClick={() => handleOptionClick('enrolledcourese')}
              >
                Enrolled Courses
              </span>
            )}
          </Nav>

          <Nav className="d-flex align-items-center">
            <span className="text-white fw-semibold me-3">Hi, {user.userData.name}</span>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleLogout}
              className="shadow-sm"
            >
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
