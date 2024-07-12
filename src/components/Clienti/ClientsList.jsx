import React, { useEffect, useState } from "react"
import { Table, Button, Alert, Collapse, Form, InputGroup, Pagination } from "react-bootstrap"
import { fetchClients, deleteClient } from "../../api"
import ClientModal from "./ClientModal"
import InvoiceModal from "../Fatture/InvoiceModal"

const ClientsList = () => {
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [open, setOpen] = useState({})
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [clientsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)

  const getClients = async (page = 0, size = clientsPerPage) => {
    try {
      const response = await fetchClients(page, size)
      if (response.content) {
        setClients(response.content)
        setFilteredClients(response.content)
        setTotalPages(response.totalPages)
      } else {
        setError("La risposta dell'API non è valida")
      }
    } catch (err) {
      setError("Errore durante il caricamento dei clienti")
    }
  }

  useEffect(() => {
    getClients(currentPage - 1)
  }, [currentPage])

  const handleOpenModal = (client = null) => {
    setSelectedClient(client)
    setIsEdit(!!client)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedClient(null)
    setIsEdit(false)
    getClients(currentPage - 1)
  }

  const toggleDetails = (clientId) => {
    setOpen((prevState) => ({
      ...prevState,
      [clientId]: !prevState[clientId],
    }))
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    const filtered = clients.filter(
      (client) =>
        client.ragioneSociale.toLowerCase().includes(e.target.value.toLowerCase()) ||
        client.partitaIva.includes(e.target.value) ||
        client.fatturatoAnnuale.toString().includes(e.target.value) ||
        client.telefono.includes(e.target.value) ||
        client.emailContatto.toLowerCase().includes(e.target.value.toLowerCase()) ||
        client.nomeContatto.toLowerCase().includes(e.target.value.toLowerCase()) ||
        client.cognomeContatto.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setFilteredClients(filtered)
  }

  const handleDelete = async (clientId) => {
    const confirmed = window.confirm("Sei sicuro di voler eliminare questo cliente?")
    if (confirmed) {
      try {
        await deleteClient(clientId)
        getClients(currentPage - 1)
      } catch (error) {
        setError("Errore durante l'eliminazione del cliente")
      }
    }
  }

  const handleInvoiceModalClose = () => {
    setShowInvoiceModal(false)
  }

  const handleInvoiceModalShow = (client) => {
    setSelectedClient(client)
    setShowInvoiceModal(true)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  return (
    <div>
      <Button className="ms-3 mt-2" variant="primary" onClick={() => handleOpenModal()}>
        Aggiungi Cliente
      </Button>
      <InputGroup className="mt-3 mb-3">
        <Form.Control placeholder="Cerca clienti..." value={search} onChange={handleSearch} />
      </InputGroup>
      <div className="m-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ragione Sociale</th>
              <th>P.IVA</th>
              <th>Fatturato Annuale</th>
              <th>Telefono</th>
              <th>Email</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <React.Fragment key={client.id}>
                <tr>
                  <td>{client.ragioneSociale}</td>
                  <td>{client.partitaIva}</td>
                  <td>{client.fatturatoAnnuale}</td>
                  <td>{client.telefono}</td>
                  <td>{client.emailContatto}</td>
                  <td>
                    <Button className="ms-1" variant="warning" onClick={() => handleOpenModal(client)}>
                      Modifica
                    </Button>
                    <Button className="ms-1" variant="danger" onClick={() => handleDelete(client.id)}>
                      Elimina
                    </Button>
                    <Button className="ms-1" variant="primary" onClick={() => toggleDetails(client.id)}>
                      {open[client.id] ? "Nascondi Dettagli" : "Mostra Dettagli"}
                    </Button>
                    <Button className="ms-1" variant="success" onClick={() => handleInvoiceModalShow(client)}>
                      Crea Fattura
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="6">
                    <Collapse in={open[client.id]}>
                      <div>
                        <strong>Nome Contatto:</strong> {client.nomeContatto || "N/A"}
                        <br />
                        <strong>Cognome Contatto:</strong> {client.cognomeContatto || "N/A"}
                        <br />
                        <strong>Telefono Contatto:</strong> {client.telefonoContatto || "N/A"}
                        <br />
                        <strong>PEC:</strong> {client.pec || "N/A"}
                        <br />
                        <strong>Via Sede Legale:</strong> {client.indirizzoLegale?.via || "N/A"}
                        <br />
                        <strong>Civico Sede Legale:</strong> {client.indirizzoLegale?.civico || "N/A"}
                        <br />
                        <strong>CAP Sede Legale:</strong> {client.indirizzoLegale?.cap || "N/A"}
                        <br />
                        <strong>Nome Comune Sede Legale:</strong> {client.indirizzoLegale?.comune?.nome || "N/A"}
                        <br />
                        <strong>Via Sede Operativa:</strong> {client.indirizzoOperativo?.via || "N/A"}
                        <br />
                        <strong>Civico Sede Operativa:</strong> {client.indirizzoOperativo?.civico || "N/A"}
                        <br />
                        <strong>CAP Sede Operativa:</strong> {client.indirizzoOperativo?.cap || "N/A"}
                        <br />
                        <strong>Nome Comune Sede Operativa:</strong> {client.indirizzoOperativo?.comune?.nome || "N/A"}
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination className="ms-3">
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <ClientModal show={showModal} handleClose={handleCloseModal} client={selectedClient} isEdit={isEdit} />
      <InvoiceModal show={showInvoiceModal} handleClose={handleInvoiceModalClose} client={selectedClient} />
    </div>
  )
}

export default ClientsList
