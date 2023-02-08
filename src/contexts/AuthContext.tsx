import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react"

import jwt_decode from "jwt-decode"

import { api } from "../services/api"

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface AuthState {
  user: User
  token: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  token: string
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@token")
    const user = localStorage.getItem("@user")

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("/login", { email, password })
    const { token } = response.data

    const decoded: any = jwt_decode(token)
    const userId = decoded.sub

    const userResponse = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const user = userResponse.data

    localStorage.setItem("@token", token)
    localStorage.setItem("@user", JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem("@token")
    localStorage.removeItem("@user")

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        user: data.user,
        isLoading,
        setIsLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth }
