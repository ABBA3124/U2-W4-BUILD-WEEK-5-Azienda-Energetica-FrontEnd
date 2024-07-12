import React from "react"
import { Container, Row, Col, Image, Button } from "react-bootstrap"
import companyLogo from "../components/Navbar/logo-per-un-azienda-energetica-che-dice-energia_773552-298.jpg"
import backgroundImage from "../components/Navbar/field_grass_sunset.jpg"

const HomePage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    color: "white",
    paddingTop: "50px",
  }
  return (
    <div style={backgroundStyle}>
      <Container className="text-center mt-5">
        <Row className="mb-4">
          <Col>
            <Image src={companyLogo} roundedCircle height={250} />
          </Col>
        </Row>
        <Row>
          <Col className="text-dark">
            <h1>Benvenuti alla Azienda Energetica</h1>
            <p className="fs-5">
              Siamo leader nel settore dell'energia, fornendo soluzioni sostenibili e innovative per case e aziende. La
              nostra missione è garantire un futuro più verde e pulito attraverso l'uso di energie rinnovabili.
            </p>
            <p className="fs-6">
              Scopri di più sui nostri servizi e su come possiamo aiutarti a risparmiare energia e ridurre l'impatto
              ambientale.
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Button variant="primary" size="lg" href="/services">
              I nostri servizi
            </Button>
            <Button variant="secondary" size="lg" href="/contact" className="ms-3">
              Contattaci
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HomePage
