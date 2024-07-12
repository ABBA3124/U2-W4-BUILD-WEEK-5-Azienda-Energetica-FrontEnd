import React, { useEffect, useState } from "react"
import { fetchWithToken } from "../api"
import { Container, Row, Col, Card, Image } from "react-bootstrap"

//Funzione per Primo char maiuscolo
const capitalize = (str) => {
  if (typeof str !== "string") return str
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

const ProfilePage = () => {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchWithToken("/utenti/me")
        data.nome = capitalize(data.nome)
        data.cognome = capitalize(data.cognome)
        setUserData(data)
      } catch (error) {
        setError("Effettua il login")
      }
    }

    fetchUserData()
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Row className="justify-content-center mt-2 mb-2">
        <Col md={8}>
          <Card>
            <Card.Header className="bg-secondary text-white text-center">
              <h1>Profilo</h1>
            </Card.Header>
            <Card.Body>
              <h3>Benvenuto {userData.nome} </h3>
              <div
                className="profile-page d-flex justify-content-center align-items-center"
                style={{ minHeight: "35vh" }}
              >
                <div className="text-left">
                  <p>
                    <strong>Nome:</strong> {userData.nome}
                  </p>
                  <p>
                    <strong>Cognome:</strong> {userData.cognome}
                  </p>
                  <p>
                    <strong>Username:</strong> {userData.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Avatar:</strong>
                    <Image src={userData.avatar} height={30} className="ms-2 rounded" />
                  </p>
                  <p>
                    <strong>Id:</strong> {userData.id}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage
