import { ReactNode } from "react"

export interface ISignInData {
  email: string
  password: string
}

export interface ISignUpData {
  name: string
  phone: string
  email: string
  password: string
}

export interface IUserProps {
  id: string
  name: string
  email: string
  phone: string
}

export interface IUserUpdateProps {
  name?: string
  phone?: string
  password?: string
}

export interface IUserContext {
  updateUser: (data: IUserUpdateProps) => void
  deleteUser: () => void
}

export interface IAuthState {
  user: IUserProps
  token: string
}

export interface IProviderProps {
  children: ReactNode
}

export interface IAuthContextData {
  user: IUserProps
  token: string
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  signIn: (credentials: ISignInData) => Promise<void>
  signOut: () => void
}
