import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Offcanvas from "react-bootstrap/Offcanvas"
import "./NavBar.css"
import logo from "./logo-per-un-azienda-energetica-che-dice-energia_773552-298.jpg"
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"

const NavBar = () => {
  const expand = "md"
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const handleLoginModalClose = () => setShowLoginModal(false)
  const handleLoginModalShow = () => setShowLoginModal(true)

  const handleRegisterModalClose = () => setShowRegisterModal(false)
  const handleRegisterModalShow = () => setShowRegisterModal(true)

  return (
    <>
      <Navbar expand={expand} className="mb-4 bg-dark">
        <Container fluid>
          <Navbar.Brand href="/Home" className="text-white">
            <div className="d-flex align-items-center">
              <div>
                <img src={logo} alt="Logo ABBA" height={30} className="me-2" />
              </div>
              <span className="fw-bold">Azienda-Energetica </span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            className="custom-toggler text-primary bg-secondary"
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            className="bg-primary"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <div className="d-flex align-items-center">
                  <div>
                    <img src={logo} alt="Logo ABBA" height={30} className="me-2" />
                  </div>
                  <Navbar.Brand href="#" className="text-white">
                    <span className="fw-bold">Azienda-Energetica </span>
                  </Navbar.Brand>
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/Home" className="text-white">
                  Home
                </Nav.Link>
                <Nav.Link href="#action2" className="text-white">
                  Come si usa ?
                </Nav.Link>
                <NavDropdown
                  title="Funzionalità"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                  className="custom-nav-dropdown"
                >
                  <NavDropdown.Item href="/profilo">Profilo utente</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">vfdvdfvfd</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">vfvdfvdfv</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">cdscdshcvgjsd</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control type="search" placeholder="Cosa cerchi ?" className="me-2" aria-label="Search" />
                <Button variant="outline-primary">Cerca</Button>
              </Form>
              <Button variant="primary" onClick={handleLoginModalShow}>
                Login
              </Button>
              <Button variant="secondary" onClick={handleRegisterModalShow}>
                Register
              </Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
      <RegisterModal show={showRegisterModal} handleClose={handleRegisterModalClose} />
    </>
  )
}

export default NavBar
