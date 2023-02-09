import { IProviderProps } from "../interfaces/UserInterfaces"

import { AuthProvider } from "./AuthContext"
import { ContactProvider } from "./ContactContext"
import { UserProvider } from "./UserContext"

export const AppProvider = ({ children }: IProviderProps) => (
  <AuthProvider>
    <UserProvider>
      <ContactProvider>{children}</ContactProvider>
    </UserProvider>
  </AuthProvider>
)
