import { createContext, useContext } from "react"

import { useAuth } from "./AuthContext"
import { api } from "../services/api"
import {
  IProviderProps,
  IUserContext,
  IUserUpdateProps,
} from "../interfaces/UserInterfaces"

const UserContext = createContext<IUserContext>({} as IUserContext)

const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUser must be used within as UserProvider")
  }
  return context
}

const UserProvider = ({ children }: IProviderProps) => {
  const { signOut, token, user } = useAuth()

  const userId = user?.id

  const updateUser = async (data: IUserUpdateProps) => {
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
