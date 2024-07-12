import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchFatture, deleteFattura, fetchFattureWithFilter } from "../../api"

const FatturaFilter = ({ onChange }) => {
  const [nome, setNome] = useState("")
  const [statoFattura, setStatoFattura] = useState("")
  const [dataMin, setDataMin] = useState("")
  const [dataMax, setDataMax] = useState("")
  const [annoMin, setAnnoMin] = useState("")
  const [annoMax, setAnnoMax] = useState("")
  const [importoMin, setImportoMin] = useState("")
  const [importoMax, setImportoMax] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")
  const [filterValue, setFilterValue] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    const filters = { [selectedFilter]: filterValue }
    onChange(filters)
  }

  return (
    <form className="bg-light p-3 border rounded" onSubmit={handleSubmit}>
      <h1 className="mb-3">Filtra per</h1>
      <div className="mb-3">
        <label className="form-label">Seleziona il filtro:</label>
        <select className="form-select" value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
          <option value="">Seleziona un filtro</option>
          <option value="nome">Nome Cliente</option>
          <option value="statoFattura">Stato Fattura</option>
          <option value="dataMin">Data Min</option>
          <option value="dataMax">Data Max</option>
          <option value="annoMin">Anno Min</option>
          <option value="annoMax">Anno Max</option>
          <option value="importoMin">Importo Min</option>
          <option value="importoMax">Importo Max</option>
        </select>
      </div>
      {selectedFilter && (
        <div className="mb-3">
          <label className="form-label">Valore:</label>
          <input
            type={selectedFilter === "dataMin" || selectedFilter === "dataMax" ? "date" : "text"}
            className="form-control"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        Filtra
      </button>
    </form>
  )
}

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

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    } else {
      const hasFilters = Object.values(filters).some((value) => value !== "")
      const fetchFunction = hasFilters ? fetchFattureWithFilter : fetchFatture

      fetchFunction(hasFilters ? filters : {}, page, size, sortBy)
        .then((data) => {
          setFatture(data.content)
          setTotalPages(data.totalPages)
          setTotalElements(data.totalElements)
        })
        .catch(console.error)
    }
  }, [filters, page, size, sortBy, navigate])

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
  }

  return (
    <div className="container mt-4">
      <FatturaFilter onChange={handleFiltersChange} />
      <h1 className="mb-4">Lista di tutte le fatture</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
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
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(fattura.id)}>
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-primary" disabled={page <= 0} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          {page + 1} di {totalPages}
        </span>
        <button className="btn btn-primary" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default FatturaList
