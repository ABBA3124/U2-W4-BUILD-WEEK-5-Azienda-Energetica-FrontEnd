import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { saveFattura } from "../../api"

const InvoiceModal = ({ show, handleClose, client }) => {
  const [data, setData] = useState("")
  const [importo, setImporto] = useState(0)
  const [statoFattura, setStatoFattura] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    const fattura = {
      data,
      importo,
      cliente: client.ragioneSociale,
      statoFattura,
    }
    await saveFattura(fattura)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crea Fattura</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formData">
            <Form.Label>Data</Form.Label>
            <Form.Control type="date" value={data} onChange={(e) => setData(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImporto">
            <Form.Label>Importo</Form.Label>
            <Form.Control type="number" value={importo} onChange={(e) => setImporto(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatoFattura">
            <Form.Label>Stato Fattura</Form.Label>
            <Form.Control type="text" value={statoFattura} onChange={(e) => setStatoFattura(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Salva
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default InvoiceModal
