const API_URL = import.meta.env.VITE_API_URL

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = new Error("Credenziali non valide")
      error.status = response.status
      throw error
    }

    const data = await response.json()
    localStorage.setItem("token", data.accessToken)
    return data
  } catch (error) {
    console.error("Errore durante il login")
    throw error
  }
}

export const register = async (nome, cognome, username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, cognome, username, email, password }),
    })

    if (!response.ok) {
      const error = new Error("Registrazione fallita")
      error.status = response.status
      throw error
    }

    return response.json()
  } catch (error) {
    console.error("Errore durante la registrazione")
    throw error
  }
}

export const fetchWithToken = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = new Error("Richiesta Fallita")
      error.status = response.status
      throw error
    }

    return response.json()
  } catch (error) {
    throw error
  }
}

export const fetchClients = async (page, size) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_URL}/clienti?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = new Error("Errore durante il caricamento dei clienti")
      error.status = response.status
      throw error
    }

    return response.json()
  } catch (error) {
    console.error("Errore durante il caricamento dei clienti", error)
    throw error
  }
}

export const createClient = async (clientData) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_URL}/clienti`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(clientData),
    })

    if (!response.ok) {
      const error = new Error("Creazione cliente fallita")
      error.status = response.status
      throw error
    }

    return response.json()
  } catch (error) {
    console.error("Errore durante la creazione del cliente", error)
    throw error
  }
}

export const updateClient = async (id, clientData) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_URL}/clienti/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(clientData),
    })

    if (!response.ok) {
      const error = new Error("Errore durante l'aggiornamento del cliente")
      error.status = response.status
      throw error
    }

    return response.json()
  } catch (error) {
    console.error("Errore durante l'aggiornamento del cliente", error)
    throw error
  }
}

export const deleteClient = async (id) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_URL}/clienti/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = new Error("Errore durante la cancellazione del cliente")
      error.status = response.status
      throw error
    }
  } catch (error) {
    console.error("Errore durante la cancellazione del cliente", error)
    throw error
  }
}

//--------------fatture----------------
export const fetchFatture = async (page = 0, size = 10, sortBy = "id") => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_URL}/fatture?page=${page}&size=${size}&sortBy=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = new Error("Errore durante il caricamento delle fatture")
      error.status = response.status
      throw error
    }

    return response.json()
  } catch (error) {
    console.error("Errore durante il caricamento delle fatture", error)
    throw error
  }
}

export const fetchFattureWithFilter = async (filters, page = 0, size = 10, sortBy = "id") => {
  const token = localStorage.getItem("token")
  const query = new URLSearchParams({ ...filters, page, size, sortBy }).toString()
  try {
    const response = await fetch(`${API_URL}/fatture/filter?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = new Error("Errore durante il caricamento delle fatture con filtri")
      error.status = response.status
      throw error
    }

    return response.json()
  } catch (error) {
    console.error("Errore durante il caricamento delle fatture con filtri", error)
    throw error
  }
}

export const saveFattura = async (fattura) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_URL}/fatture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fattura),
    })

    if (!response.ok) {
      const error = new Error("Creazione fattura fallita")
      error.status = response.status
      throw error
    }

    return response.json()
  } catch (error) {
    console.error("Errore durante la creazione della fattura", error)
    throw error
  }
}

export const updateFattura = async (id, fattura) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_URL}/fatture/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fattura),
    })

    if (!response.ok) {
      const error = new Error("Errore durante l'aggiornamento della fattura")
      error.status = response.status
      throw error
    }

    return response.json()
  } catch (error) {
    console.error("Errore durante l'aggiornamento della fattura", error)
    throw error
  }
}

export const deleteFattura = async (id) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_URL}/fatture/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = new Error("Errore durante la cancellazione della fattura")
      error.status = response.status
      throw error
    }
  } catch (error) {
    console.error("Errore durante la cancellazione della fattura", error)
    throw error
  }
}
