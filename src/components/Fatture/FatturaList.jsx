import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchFatture, deleteFattura, fetchFattureWithFilter } from "../../api"
import FatturaForm from "./FatturaForm"
import FatturaFilter from "./FatturaFilter"

const FatturaList = () => {
  const [fatture, setFatture] = useState([])
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [sortBy, setSortBy] = useState("id")
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    } else {
      fetchFatture(page, size, sortBy)
        .then((data) => {
          setFatture(data.content)
          setTotalPages(data.totalPages)
          setTotalElements(data.totalElements)
        })
        .catch(console.error)
    }
  }, [page, size, sortBy, navigate])

  const handleDelete = async (id) => {
    await deleteFattura(id)
    fetchFatture(page, size, sortBy)
      .then((data) => {
        setFatture(data.content)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
      })
      .catch(console.error)
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    setPage(0)
    fetchFattureWithFilter(newFilters, page, size, sortBy)
      .then((data) => {
        setFatture(data.content)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
      })
      .catch(console.error)
  }

  return (
    <div>
      <FatturaFilter onChange={handleFiltersChange} />
      <FatturaForm
        onSave={() =>
          fetchFatture(page, size, sortBy)
            .then((data) => {
              setFatture(data.content)
              setTotalPages(data.totalPages)
              setTotalElements(data.totalElements)
            })
            .catch(console.error)
        }
      />
      <table>
        <thead>
          <tr>
            <th>Numero</th>
            <th>Data</th>
            <th>Importo</th>
            <th>Cliente</th>
            <th>Stato</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {fatture.map((fattura) => (
            <tr key={fattura.id}>
              <td>{fattura.numero}</td>
              <td>{fattura.data}</td>
              <td>{fattura.importo}</td>
              <td>{fattura.cliente.ragioneSociale}</td>
              <td>{fattura.statoFattura.stato}</td>
              <td>
                <button onClick={() => handleDelete(fattura.id)}>Elimina</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button disabled={page <= 0} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          {page + 1} of {totalPages}
        </span>
        <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default FatturaList
