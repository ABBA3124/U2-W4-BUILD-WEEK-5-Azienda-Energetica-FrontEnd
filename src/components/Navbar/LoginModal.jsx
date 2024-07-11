import React, { useState } from "react"
import { Modal, Button, Form, Alert } from "react-bootstrap"
import { login } from "../../api.js"

const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await login(email, password)
      if (result.accessToken) {
        setSuccess("Login eseguito con successo!")
        setError("")
        handleClose()
        setPassword("")
      } else {
        setError("Login Fallito!")
      }
    } catch (error) {
      setError("Credenziali errate")
      setSuccess("")
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Indirizzo Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Invia
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
