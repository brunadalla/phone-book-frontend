import { createContext, ReactNode } from "react"
import { api } from "../services/api"
import { useAuth } from "./AuthContext"

interface IUserProviderProps {
  children: ReactNode
}

interface IDataProps {
  name?: string
  phone?: string
  password?: string
}

interface IUserData {
  updateUser: (token: string, data: IDataProps) => void
  deleteUser: (token: string) => void
}
export const UserContext = createContext<IUserData>({} as IUserData)

export const UserProvider = ({ children }: IUserProviderProps) => {
  const { signOut } = useAuth()

  const userId = localStorage.getItem("@userId")

  const updateUser = async (token: string, data: IDataProps) => {
    await api
      .patch(`/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => signOut())
      .catch((err) => console.log(err))
  }

  const deleteUser = async (token: string) => {
    await api
      .delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => signOut())
      .catch((err) => console.log(err))
  }

  return (
    <UserContext.Provider value={{ updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}
