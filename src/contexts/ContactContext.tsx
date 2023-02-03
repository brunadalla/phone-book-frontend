import { createContext, ReactNode } from "react"
import { api } from "../services/api"
import { useAuth } from "./AuthContext"

interface IUserProviderProps {
  children: ReactNode
}

interface IUserData {}

interface IDataProps {
    name?: string
    phone?: string
    password?: string
}

export const UserContext = createContext<IUserData>({} as IUserData)

export const UserProvider = ({ children }: IUserProviderProps) => {
  const { signOut } = useAuth()

  const updateUser = async (userId: string, token: string, data: IDataProps) => {
    await api
      .patch(`/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => signOut())
      .catch((err) => console.log(err))
  }

  const deleteUser = async (userId: string, token: string) => {
    await api
      .delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => signOut())
      .catch((err) => console.log(err))
  }

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>
}