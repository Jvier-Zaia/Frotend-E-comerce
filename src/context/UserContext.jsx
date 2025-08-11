import { createContext, useContext, useState } from "react"

const UserContext = createContext()

const UserProvider = (props) => {
  const [user, setUser] = useState(true)
  const [loading, setLoading] = useState(false)

  const login = async (username, password) => {
    setLoading(true)
    try {
      // realizar una petición al backend  
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        const token = await response.json()
        setUser(true)
        return token
      } else {
        return false
      }
    } finally {
      setLoading(false)
    }
  }

  // Nueva función register
  const register = async (username, email, password) => {
    setLoading(true)
    
    try {
      // Estructura del request según FakeStoreAPI
      const requestBody = {
        email: email,
        username: username,
        password: password,
        name: {
          firstname: username.split(' ')[0] || username,
          lastname: username.split(' ')[1] || ''
        },
        address: {
          city: 'tucuman',
          street: '7835 new road',
          number: 3,
          zipcode: '12926-3874',
          geolocation: {
            lat: '-37.3159',
            long: '81.1496'
          }
        },
        phone: '1-570-236-7033'
      }

      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Usuario registrado:', data)
        
        // Setear user en true después del registro exitoso
        setUser(true)
        
        return { success: true, user: data }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
    } catch (error) {
      console.error('Error during registration:', error)
      return { 
        success: false, 
        error: error.message || 'Error al registrar usuario'
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ login, register, logout, user, loading }}>
      {props.children}
    </UserContext.Provider>
  )
}

const useAuth = () => useContext(UserContext)

export { UserProvider, useAuth }