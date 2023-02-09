import { createContext, useContext, useState } from "react"
import {
  IContactContext,
  IContactCreateProps,
  IContactData,
  IContactUpdateProps,
  IProviderProps,
} from "../interfaces/ContactInterfaces"

import { api } from "../services/api"
import { useAuth } from "./AuthContext"

const ContactContext = createContext<IContactContext>({} as IContactContext)

const useContact = () => {
  const context = useContext(ContactContext)

  if (!context) {
    throw new Error("useContact must be used within as ContactProvider")
  }
  return context
}

const ContactProvider = ({ children }: IProviderProps) => {
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [contacts, setContacts] = useState<IContactData[]>([])

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
            ? res.data.sort((a: IContactData, b: IContactData) => {
                if (a.name < b.name) {
                  return -1
                } else {
                  return 1
                }
              })
            : res.data.sort((a: IContactData, b: IContactData) => {
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

  const createContact = async (data: IContactCreateProps) => {
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

  const updateContact = async (
    contactId: string,
    data: IContactUpdateProps
  ) => {
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
          if (!filteredContacts) {
            loadContacts()
          } else {
            setContacts(filteredContacts)
          }
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
        isAlphabeticalOrder,
        loadContacts,
        createContact,
        updateContact,
        deleteContact,
        searchContact,
        setIsAlphabeticalOrder,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export { ContactProvider, useContact }
