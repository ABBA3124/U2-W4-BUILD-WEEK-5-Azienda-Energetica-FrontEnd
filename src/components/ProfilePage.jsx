import React, { useEffect, useState } from "react"
import { fetchWithToken } from "../api"

const ProfilePage = () => {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchWithToken("/utenti/me")
        setUserData(data)
      } catch (error) {
        setError("Failed to fetch user data: " + error.message)
      }
    }

    fetchUserData()
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div className="profile-page">
      <h1>Profilo con cui hai effettuato l'accesso </h1>
      <p>
        <strong>Nome:</strong> {userData.nome}
      </p>
      <p>
        <strong>Cognome:</strong> {userData.cognome}
      </p>
      <p>
        <strong>Username:</strong> {userData.username}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <p>
        <strong>Avatar:</strong> {userData.avatar}
      </p>
      <p>
        <strong>Ruoli:</strong> {userData.ruoli}
      </p>
    </div>
  )
}

export default ProfilePage
