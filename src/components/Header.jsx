import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import { useState } from "react"
import "../styles/components/Header.css"

const Header = () => {
  const { user, logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")

  const handleLogout = () => {
    logout()
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica de búsqueda
    console.log("Buscando:", searchTerm)
    // Ejemplo: navigate(`/search?q=${searchTerm}`)
  }

  return (
    <header className="container-fluid">
      <nav className="Header-Nav shadow-sm">
        <ul className="Header d-flex justify-content-center align-items-center flex-wrap">
          {user && (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link text-decoration-none fw-bold">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link text-decoration-none fw-bold">
                  Dashboard
                </Link>
              </li>
              
              
              <li className="nav-item">
                <button className="btn btn-sm position-relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>
                </button>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-sm">
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link text-decoration-none fw-bold">
                  Inicio
                </Link>
              </li>
              
              

              <li className="nav-item">
                <Link to="/login" className="nav-link text-decoration-none fw-bold">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/registrate" className="nav-link text-decoration-none fw-bold">
                  Registrate
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export { Header }