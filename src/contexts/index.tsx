import { ReactNode } from "react"

import { AuthProvider } from "./AuthContext"
import { ContactProvider } from "./ContactContext"
import { UserProvider } from "./UserContext"

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <UserProvider>
      <ContactProvider>{children}</ContactProvider>
    </UserProvider>
  </AuthProvider>
)
