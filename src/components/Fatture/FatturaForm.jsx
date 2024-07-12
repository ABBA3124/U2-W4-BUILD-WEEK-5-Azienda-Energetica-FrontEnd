import React, { useState } from "react"
import { saveFattura } from "../../api"

const FatturaForm = ({ onSave }) => {
  const [data, setData] = useState("")
  const [importo, setImporto] = useState(0)
  const [cliente, setCliente] = useState("")
  const [statoFattura, setStatoFattura] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    const fattura = {
      data,
      importo,
      cliente,
      statoFattura,
    }
    await saveFattura(fattura)
    onSave()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Data:</label>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
      </div>
      <div>
        <label>Importo:</label>
        <input type="number" value={importo} onChange={(e) => setImporto(e.target.value)} required />
      </div>
      <div>
        <label>Cliente:</label>
        <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
      </div>
      <div>
        <label>Stato Fattura:</label>
        <input type="text" value={statoFattura} onChange={(e) => setStatoFattura(e.target.value)} required />
      </div>
      <button type="submit">Salva</button>
    </form>
  )
}

export default FatturaForm
