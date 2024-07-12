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

  const handleSubmit = (event) => {
    event.preventDefault()
    const filters = {
      nome,
      statoFattura,
      dataMin,
      dataMax,
      annoMin,
      annoMax,
      importoMin,
      importoMax,
    }
    onChange(filters)
  }

  return (
    <form className="bg-success mb-3" onSubmit={handleSubmit}>
      <h1>Filtra per </h1>
      <div>
        <label>Nome Cliente:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div>
        <label>Stato Fattura:</label>
        <input type="text" value={statoFattura} onChange={(e) => setStatoFattura(e.target.value)} />
      </div>
      <div>
        <label>Data Min:</label>
        <input type="date" value={dataMin} onChange={(e) => setDataMin(e.target.value)} />
      </div>
      <div>
        <label>Data Max:</label>
        <input type="date" value={dataMax} onChange={(e) => setDataMax(e.target.value)} />
      </div>
      <div>
        <label>Anno Min:</label>
        <input type="number" value={annoMin} onChange={(e) => setAnnoMin(e.target.value)} />
      </div>
      <div>
        <label>Anno Max:</label>
        <input type="number" value={annoMax} onChange={(e) => setAnnoMax(e.target.value)} />
      </div>
      <div>
        <label>Importo Min:</label>
        <input type="number" value={importoMin} onChange={(e) => setImportoMin(e.target.value)} />
      </div>
      <div>
        <label>Importo Max:</label>
        <input type="number" value={importoMax} onChange={(e) => setImportoMax(e.target.value)} />
      </div>
      <button type="submit">Filtra</button>
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
    fetchFattureWithFilter(filters, page, size, sortBy)
      .then((data) => {
        setFatture(data.content)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
      })
      .catch(console.error)
  }, [filters, page, size, sortBy])

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
    <div>
      <FatturaFilter onChange={handleFiltersChange} />

      <h1>Lista di tutte le fatture</h1>
      <table>
        <thead>
          <tr className="bg-warning">
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
