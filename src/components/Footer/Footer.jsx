import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Siamo un'azienda impegnata a fornire i migliori servizi ai nostri clienti. La nostra missione è quella di
              rubare tutti i vostri soldi.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="#home" className="text-white">
                Home
              </Nav.Link>
              <Nav.Link href="#services" className="text-white">
                Servizi
              </Nav.Link>
              <Nav.Link href="#about" className="text-white">
                About Us
              </Nav.Link>
              <Nav.Link href="#contact" className="text-white">
                Contattaci
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Inserisci la tua email" className="mb-2" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Iscriviti
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Azienda-Energetica. Tutti i diritti riservati.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
