import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext" // ← UserContext en lugar de AuthContext
import "../styles/pages/Register.css"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validaciones
    if (!username || !email || !password) {
      setError("Debes completar todos los campos")
      return
    }

    // Validación básica del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un email válido")
      return
    }

    // Validación de contraseña
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    try {
      const result = await register(username, email, password)
      
      if (result.success) {
        setSuccess("¡Usuario registrado con éxito! Redirigiendo...")
        
        // Limpiar campos
        setUsername("")
        setEmail("")
        setPassword("")
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
          navigate('/') // Cambia esta ruta según tu aplicación
        }, 2000)
        
      } else {
        setError(result.error || "Error al registrar usuario")
      }
    } catch (error) {
      setError("Error de conexión. Inténtalo de nuevo.")
      console.error("Registration error:", error)
    }
  }

  // Función para rellenar con credenciales de prueba
  const fillTestCredentials = () => {
    setUsername("johnd")
    setEmail("john@gmail.com")
    setPassword("m38rmF$")
    setError("")
    setSuccess("")
  }

  return (
    <Layout>
      <div className="register-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="register-card card shadow">
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <h1 className="register-title h3 mb-3">Registrate</h1>
                    
                    {/* Credenciales de prueba */}
                    <div className="alert alert-info py-2 px-3 mb-3" style={{ fontSize: '0.85rem' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>🧪 Credenciales de prueba:</strong><br />
                          <small>
                            <strong>Username:</strong> johnd<br />
                            <strong>Email:</strong> john@gmail.com<br />
                            <strong>Password:</strong> m38rmF$
                          </small>
                        </div>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-primary ms-2"
                          onClick={fillTestCredentials}
                          disabled={loading}
                          style={{ fontSize: '0.75rem' }}
                        >
                          Usar datos
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Register Form */}
                  <form onSubmit={handleSubmit} className="register-form">
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username:
                      </label>
                      <input
                        id="username"
                        type="text"
                        className="form-control"
                        placeholder="Ingresa tu username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        disabled={loading}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Correo electrónico:
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Ingresa tu email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        disabled={loading}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        Contraseña:
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Ingresa tu contraseña (mín. 6 caracteres)"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        disabled={loading}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary w-100 register-button"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Registrando...
                        </>
                      ) : (
                        'Registrarse'
                      )}
                    </button>
                  </form>

                  {/* Messages */}
                  {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success mt-3" role="alert">
                      <i className="bi bi-check-circle me-2"></i>
                      {success}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export { Register }