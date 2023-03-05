import { Navbar, Nav } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useContext } from "react";
import contextValue from "../appContext";
import Container from "react-bootstrap/Container";

function TheNavigation(props) {
  const context = useContext(contextValue);

  return (
          <Navbar bg="dark" variant="dark">
              <Container>
                  <Navbar.Brand href="/">Raiffeisen Bank IT management app</Navbar.Brand>
                  <Nav className="me-auto">
                      {context.isAuth ? (
                          <Nav>
                              <Nav.Link as={Link} to="/logout">
                                  {" "}
                                  Odhlásit
                              </Nav.Link>
                              <Nav.Link as={Link} to="/profile">
                                  {" "}
                                  {props.user.firstName}
                              </Nav.Link>
                          </Nav>
                      ) : (
                          <Nav>
                              <Nav.Link as={Link} to="/login">
                                  {" "}
                                  Přihlásit se
                              </Nav.Link>
                          </Nav>
                      )}
                  </Nav>
              </Container>
          </Navbar>
  );
}

export default TheNavigation;
