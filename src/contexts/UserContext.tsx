import { createContext, ReactNode, useContext } from "react"

import { useAuth } from "./AuthContext"
import { api } from "../services/api"

interface IUserProviderProps {
  children: ReactNode
}

interface IDataProps {
  name?: string
  phone?: string
  password?: string
}

interface IUserData {
  updateUser: (data: IDataProps) => void
  deleteUser: () => void
}
const UserContext = createContext<IUserData>({} as IUserData)

const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUser must be used within as UserProvider")
  }
  return context
}

const UserProvider = ({ children }: IUserProviderProps) => {
  const { signOut, token, user } = useAuth()

  const userId = user?.id

  const updateUser = async (data: IDataProps) => {
    await api
      .patch(`/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => signOut())
      .catch((err) => console.log(err))
  }

  const deleteUser = async () => {
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

export { UserProvider, useUser }
