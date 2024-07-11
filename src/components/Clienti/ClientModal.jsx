import React, { useState, useEffect } from "react"
import { Modal, Button, Form, Alert } from "react-bootstrap"
import { createClient, updateClient } from "../../api"

const ClientModal = ({ show, handleClose, client, isEdit }) => {
  const [formData, setFormData] = useState({
    ragioneSociale: "",
    tipoCliente: "PA",
    partitaIva: "",
    dataUltimoContatto: "",
    fatturatoAnnuale: "",
    pec: "",
    telefono: "",
    emailContatto: "",
    nomeContatto: "",
    cognomeContatto: "",
    telefonoContatto: "",
    viaSedeLegale: "",
    civicoSedeLegale: "",
    capSedeLegale: "",
    nomeComuneSedeLegale: "",
    viaSedeOperativa: "",
    civicoSedeOperativa: "",
    capSedeOperativa: "",
    nomeComuneSedeOperativa: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (isEdit && client) {
      setFormData({
        ragioneSociale: client.ragioneSociale,
        tipoCliente: client.tipoClienti,
        partitaIva: client.partitaIva,
        dataUltimoContatto: client.dataUltimoContatto,
        fatturatoAnnuale: client.fatturatoAnnuale,
        pec: client.pec,
        telefono: client.telefono,
        emailContatto: client.emailContatto,
        nomeContatto: client.nomeContatto,
        cognomeContatto: client.cognomeContatto,
        telefonoContatto: client.telefonoContatto,
        viaSedeLegale: client.indirizzoLegale?.via || "",
        civicoSedeLegale: client.indirizzoLegale?.civico || "",
        capSedeLegale: client.indirizzoLegale?.cap || "",
        nomeComuneSedeLegale: client.indirizzoLegale?.comune?.nome || "",
        viaSedeOperativa: client.indirizzoOperativo?.via || "",
        civicoSedeOperativa: client.indirizzoOperativo?.civico || "",
        capSedeOperativa: client.indirizzoOperativo?.cap || "",
        nomeComuneSedeOperativa: client.indirizzoOperativo?.comune?.nome || "",
      })
    } else {
      setFormData({
        ragioneSociale: "",
        tipoCliente: "",
        partitaIva: "",
        dataUltimoContatto: "",
        fatturatoAnnuale: "",
        pec: "",
        telefono: "",
        emailContatto: "",
        nomeContatto: "",
        cognomeContatto: "",
        telefonoContatto: "",
        viaSedeLegale: "",
        civicoSedeLegale: "",
        capSedeLegale: "",
        nomeComuneSedeLegale: "",
        viaSedeOperativa: "",
        civicoSedeOperativa: "",
        capSedeOperativa: "",
        nomeComuneSedeOperativa: "",
      })
    }
  }, [client, isEdit])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEdit) {
        await updateClient(client.id, formData)
        setSuccess("Cliente aggiornato con successo!")
      } else {
        await createClient(formData)
        setSuccess("Cliente creato con successo!")
      }
      handleClose()
    } catch (error) {
      setError("Errore durante la creazione/modifica del cliente")
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Modifica Cliente" : "Aggiungi Cliente"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRagioneSociale">
            <Form.Label>Ragione Sociale</Form.Label>
            <Form.Control
              type="text"
              name="ragioneSociale"
              value={formData.ragioneSociale}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTipoCliente">
            <Form.Label>Tipo Cliente</Form.Label>
            <Form.Control as="select" name="tipoCliente" value={formData.tipoCliente} onChange={handleChange} required>
              <option value="PA">PA</option>
              <option value="SAS">SAS</option>
              <option value="SPA">SPA</option>
              <option value="SRL">SRL</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formPartitaIva">
            <Form.Label>Partita IVA</Form.Label>
            <Form.Control type="text" name="partitaIva" value={formData.partitaIva} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formDataUltimoContatto">
            <Form.Label>Data Ultimo Contatto</Form.Label>
            <Form.Control
              type="date"
              name="dataUltimoContatto"
              value={formData.dataUltimoContatto}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFatturatoAnnuale">
            <Form.Label>Fatturato Annuale</Form.Label>
            <Form.Control
              type="number"
              name="fatturatoAnnuale"
              value={formData.fatturatoAnnuale}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPec">
            <Form.Label>PEC</Form.Label>
            <Form.Control type="email" name="pec" value={formData.pec} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formTelefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formEmailContatto">
            <Form.Label>Email Contatto</Form.Label>
            <Form.Control
              type="email"
              name="emailContatto"
              value={formData.emailContatto}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNomeContatto">
            <Form.Label>Nome Contatto</Form.Label>
            <Form.Control
              type="text"
              name="nomeContatto"
              value={formData.nomeContatto}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCognomeContatto">
            <Form.Label>Cognome Contatto</Form.Label>
            <Form.Control
              type="text"
              name="cognomeContatto"
              value={formData.cognomeContatto}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTelefonoContatto">
            <Form.Label>Telefono Contatto</Form.Label>
            <Form.Control
              type="text"
              name="telefonoContatto"
              value={formData.telefonoContatto}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formViaSedeLegale">
            <Form.Label>Via Sede Legale</Form.Label>
            <Form.Control
              type="text"
              name="viaSedeLegale"
              value={formData.viaSedeLegale}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCivicoSedeLegale">
            <Form.Label>Civico Sede Legale</Form.Label>
            <Form.Control
              type="text"
              name="civicoSedeLegale"
              value={formData.civicoSedeLegale}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCapSedeLegale">
            <Form.Label>CAP Sede Legale</Form.Label>
            <Form.Control
              type="text"
              name="capSedeLegale"
              value={formData.capSedeLegale}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNomeComuneSedeLegale">
            <Form.Label>Nome Comune Sede Legale</Form.Label>
            <Form.Control
              type="text"
              name="nomeComuneSedeLegale"
              value={formData.nomeComuneSedeLegale}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formViaSedeOperativa">
            <Form.Label>Via Sede Operativa</Form.Label>
            <Form.Control
              type="text"
              name="viaSedeOperativa"
              value={formData.viaSedeOperativa}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCivicoSedeOperativa">
            <Form.Label>Civico Sede Operativa</Form.Label>
            <Form.Control
              type="text"
              name="civicoSedeOperativa"
              value={formData.civicoSedeOperativa}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCapSedeOperativa">
            <Form.Label>CAP Sede Operativa</Form.Label>
            <Form.Control
              type="text"
              name="capSedeOperativa"
              value={formData.capSedeOperativa}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNomeComuneSedeOperativa">
            <Form.Label>Nome Comune Sede Operativa</Form.Label>
            <Form.Control
              type="text"
              name="nomeComuneSedeOperativa"
              value={formData.nomeComuneSedeOperativa}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            {isEdit ? "Conferma Modifica" : "Crea Cliente"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ClientModal
