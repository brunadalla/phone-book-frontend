import { ReactNode } from "react"

export interface IProviderProps {
  children: ReactNode
}

export interface IContactData {
  id: string
  name: string
  phone: string
  email: string
  createdAt: Date
}

export interface IContactCreateProps {
  name: string
  phone: string
  email: string
}

export interface IContactUpdateProps {
  name?: string
  phone?: string
  email?: string
}

export interface IContactListProps {
  contacts: IContactData[]
}

export interface IContactContext {
  isLoading: boolean
  contacts: IContactData[]
  isAlphabeticalOrder: boolean
  loadContacts: () => Promise<void>
  createContact: (data: IContactCreateProps) => Promise<void>
  deleteContact: (contactId: string) => Promise<void>
  updateContact: (contactId: string, data: IContactUpdateProps) => Promise<void>
  searchContact: (value: string) => Promise<void>
  setIsAlphabeticalOrder: React.Dispatch<React.SetStateAction<boolean>>
}
