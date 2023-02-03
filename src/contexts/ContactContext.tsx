import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react"

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
  searchContact: (contactName: string) => Promise<void>
  notFound: boolean
  contactNotFound: string
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
  const [notFound, setNotFound] = useState(false)
  const [contactNotFound, setContactNotFound] = useState("")

  const loadContacts = async () => {
    await api
      .get(`/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContacts(res.data)
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
      .catch((err) => console.log(err))
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

  const searchContact = useCallback(async (contactName: string) => {
    const response = await api.get(`/contacts?name_like=${contactName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.data.length) {
      setContactNotFound(contactName)
      return setNotFound(true)
    }

    setNotFound(false)
    setContacts(response.data)
  }, [])

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loadContacts,
        createContact,
        updateContact,
        deleteContact,
        searchContact,
        notFound,
        contactNotFound,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export { ContactProvider, useContact }
