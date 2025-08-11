import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import "../styles/pages/Login.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [isShaking, setIsShaking] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [success, setSuccess] = useState("")
  
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  
  const validateFields = () => {
    const newErrors = {}
    
    if (!username.trim()) {
      newErrors.username = "El nombre de usuario es requerido"
    }
    
    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const triggerShakeAnimation = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 600)
  }
  
  // Función para rellenar con credenciales de prueba
  const fillTestCredentials = () => {
    setUsername("johnd")
    setPassword("m38rmF$")
    setErrors({})
    setLoginError("")
    setSuccess("")
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError("")
    setSuccess("")
    
    if (!validateFields()) {
      triggerShakeAnimation()
      return
    }
    
    try {
      console.log({ username, password })
      const result = await login(username, password)
      
      if (result && result !== false) {
        setSuccess("¡Inicio de sesión exitoso! Redirigiendo...")
        setUsername("")
        setPassword("")
        setErrors({})
        
        // Redirigir después de 1.5 segundos
        setTimeout(() => {
          navigate("/")
        }, 1500)
      } else {
        setLoginError("Credenciales incorrectas. Por favor, verifica tus datos.")
        triggerShakeAnimation()
      }
    } catch (error) {
      setLoginError("Error de conexión. Inténtalo de nuevo.")
      triggerShakeAnimation()
      console.error("Login error:", error)
    }
  }
  
  return (
    <Layout>
      <div className="login-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className={`login-card card shadow ${isShaking ? 'shake-animation' : ''}`}>
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <h1 className="login-title h3 mb-3">Inicia sesión</h1>
                    <h2 className="welcome-text h5 text-muted mb-3">
                      Hola, bienvenido de nuevo
                    </h2>
                  </div>
                  
                  {/* Credentials Info */}
                  <div className="demo-credentials alert alert-info mb-4 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small>
                          <strong>🧪 Credenciales de prueba:</strong><br />
                          <span className="text-muted">Usuario:</span> johnd<br />
                          <span className="text-muted">Contraseña:</span> m38rmF$
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
                  
                  {/* Login Form */}
                  <form onSubmit={handleLogin} className="login-form">
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Nombre de usuario:
                      </label>
                      <input
                        id="username"
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Ingresa tu usuario"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        disabled={loading}
                        autoComplete="username"
                      />
                      {errors.username && (
                        <div className="invalid-feedback">
                          {errors.username}
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        Contraseña:
                      </label>
                      <input
                        id="password"
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Ingresa tu contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        disabled={loading}
                        autoComplete="current-password"
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary w-100 login-button"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Iniciando sesión...
                        </>
                      ) : (
                        'Ingresar'
                      )}
                    </button>
                  </form>

                  {/* Messages */}
                  {loginError && (
                    <div className="alert alert-danger mt-3" role="alert">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {loginError}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success mt-3" role="alert">
                      <i className="bi bi-check-circle me-2"></i>
                      {success}
                    </div>
                  )}

                  {/* Link to Register */}
                  <div className="text-center mt-3">
                    <small className="text-muted">
                      ¿No tienes cuenta?{' '}
                      <button 
                        type="button" 
                        className="btn btn-link p-0" 
                        onClick={() => navigate('/register')}
                        disabled={loading}
                      >
                        Regístrate aquí
                      </button>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export { Login }