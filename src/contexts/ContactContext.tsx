import { createContext, ReactNode, useContext, useState } from "react"

import { api } from "../services/api"
import { useAuth } from "./AuthContext"

interface IContactProviderProps {
  children: ReactNode
}

interface IDataProps {
  name: string
  phone: string
  email: string
}

interface IDataUpProps {
  name?: string
  phone?: string
  email?: string
}

interface IContact {
  id: string
  name: string
  phone: string
  email: string
  createdAt: Date
}

interface IContactData {
  contacts: IContact[]
  createContact: (data: IDataProps) => Promise<void>
  loadContacts: () => Promise<void>
  deleteContact: (contactId: string) => Promise<void>
  updateContact: (contactId: string, data: IDataUpProps) => Promise<void>
  isAlphabeticalOrder: boolean
  setIsAlphabeticalOrder: React.Dispatch<React.SetStateAction<boolean>>
}

const ContactContext = createContext<IContactData>({} as IContactData)

const useContact = () => {
  const context = useContext(ContactContext)

  if (!context) {
    throw new Error("useContact must be used within as ContactProvider")
  }
  return context
}

const ContactProvider = ({ children }: IContactProviderProps) => {
  const { token } = useAuth()
  
  const [contacts, setContacts] = useState<IContact[]>([])
  const [isAlphabeticalOrder, setIsAlphabeticalOrder] = useState(false)

  const loadContacts = async () => {
    await api
      .get(`/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContacts(
          isAlphabeticalOrder
            ? res.data.sort((a: IContact, b: IContact) => {
                if (a.name < b.name) {
                  return -1
                } else {
                  return 1
                }
              })
            : res.data.sort((a: IContact, b: IContact) => {
                if (a.createdAt > b.createdAt) {
                  return -1
                } else {
                  return 1
                }
              })
        )
      })
      .catch((err) => console.log(err))
  }

  const createContact = async (data: IDataProps) => {
    await api
      .post(`/contacts`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setContacts((oldContacts) => [...oldContacts, res.data]))
      .catch((err) => console.log(err.message))
  }

  const updateContact = async (contactId: string, data: IDataUpProps) => {
    await api
      .patch(`/contacts/${contactId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setContacts((oldContacts) => [...oldContacts, res.data]))
      .catch((err) => console.log(err))
  }

  const deleteContact = async (contactId: string) => {
    await api
      .delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const filteredContacts = contacts.filter(
          (contact) => contact.id !== contactId
        )
        setContacts(filteredContacts)
      })
      .catch((err) => console.log(err))
  }

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loadContacts,
        createContact,
        updateContact,
        deleteContact,
        isAlphabeticalOrder,
        setIsAlphabeticalOrder,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export { ContactProvider, useContact }
