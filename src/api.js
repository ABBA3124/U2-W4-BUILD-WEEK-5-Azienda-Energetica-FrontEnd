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
    console.error("Error during login:", error.message)
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
      const error = new Error("Registration failed")
      error.status = response.status
      throw error
    }

    return response.json()
  } catch (error) {
    console.error("Error during registration:", error.message)
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
      const error = new Error("Request failed")
      error.status = response.status
      throw error
    }

    return response.json()
  } catch (error) {
    console.error("Error during fetch:", error.message)
    throw error
  }
}
