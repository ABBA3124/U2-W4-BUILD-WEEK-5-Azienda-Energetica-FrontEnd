import React, { useEffect, useState } from "react"
import { fetchWithToken } from "../api"

//Funzione per Primo char maiuscolo
const capitalize = (str) => {
  if (typeof str !== "string") return str
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

const ProfilePage = () => {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchWithToken("/utenti/me")
        data.nome = capitalize(data.nome)
        data.cognome = capitalize(data.cognome)
        setUserData(data)
      } catch (error) {
        setError("Effettua il login")
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
    <div>
      <h1 className="text-center bg-secondary p-2">Profilo</h1>
      <h3>Benvenuto {userData.nome} </h3>
      <div className="profile-page d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="text-left">
          <div>
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
            {/* commentato perchè non viene più trovato */}
            {/* <p>
              <strong>Ruoli:</strong> {userData.ruoli}
            </p> */}
            <p>
              <strong>Id:</strong> {userData.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
