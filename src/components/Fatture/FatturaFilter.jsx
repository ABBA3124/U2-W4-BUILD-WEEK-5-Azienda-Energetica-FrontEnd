import React, { useState } from "react"

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
    <form onSubmit={handleSubmit}>
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

export default FatturaFilter
