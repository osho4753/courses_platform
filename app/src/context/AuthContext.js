import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      )
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      console.log(user)
      router.push('/courses')
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
