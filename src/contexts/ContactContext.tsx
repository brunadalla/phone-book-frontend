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
  isLoading: boolean
  contacts: IContact[]
  createContact: (data: IDataProps) => Promise<void>
  loadContacts: () => Promise<void>
  deleteContact: (contactId: string) => Promise<void>
  updateContact: (contactId: string, data: IDataUpProps) => Promise<void>
  searchContact: (value: string) => Promise<void>
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

  const [isLoading, setIsLoading] = useState(false)
  const [contacts, setContacts] = useState<IContact[]>([])
  const [isAlphabeticalOrder, setIsAlphabeticalOrder] = useState(false)

  const loadContacts = async () => {
    setIsLoading(true)
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
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const createContact = async (data: IDataProps) => {
    setIsLoading(true)
    await api
      .post(`/contacts`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const updateContact = async (contactId: string, data: IDataUpProps) => {
    setIsLoading(true)
    await api
      .patch(`/contacts/${contactId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const deleteContact = async (contactId: string) => {
    setIsLoading(true)
    await api
      .delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const filteredContacts = contacts.filter(
          (contact) => contact.id !== contactId
        )
        setContacts(filteredContacts)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const searchContact = async (value: string) => {
    setIsLoading(true)
    await api
      .get(`/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!value) {
          loadContacts()
        } else {
          const filteredContacts = contacts.filter(
            (contact) =>
              contact.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(
                  value
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                ) ||
              contact.phone
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(
                  value
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                ) ||
              contact.email
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(
                  value
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                )
          )
          setContacts(filteredContacts)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }

  return (
    <ContactContext.Provider
      value={{
        isLoading,
        contacts,
        loadContacts,
        createContact,
        updateContact,
        deleteContact,
        searchContact,
        isAlphabeticalOrder,
        setIsAlphabeticalOrder,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export { ContactProvider, useContact }
