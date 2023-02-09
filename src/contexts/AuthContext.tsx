import { createContext, useCallback, useContext, useState } from "react"
import jwt_decode from "jwt-decode"

import {
  IAuthContextData,
  IAuthState,
  IProviderProps,
  ISignInData,
} from "../interfaces/UserInterfaces"
import { api } from "../services/api"

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

const AuthProvider = ({ children }: IProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem("@token")
    const user = localStorage.getItem("@user")

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as IAuthState
  })

  const signIn = useCallback(async ({ email, password }: ISignInData) => {
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

    setData({} as IAuthState)
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
