import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NavBar from "./components/Navbar/NavBar"
import Footer from "./components/Footer/Footer"
import HomePage from "./pages/HomePage"
import ProfilePage from "./components/ProfilePage"
import LoginModal from "./components/Navbar/LoginModal"
import ClientsList from "./components/Clienti/ClientsList"
import FatturaList from "./components/Fatture/FatturaList"

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/profilo" element={<ProfilePage />} />
            <Route path="/login" element={<LoginModal />} />
            <Route path="/clienti" element={<ClientsList />} />
            <Route path="/fatture" element={<FatturaList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
