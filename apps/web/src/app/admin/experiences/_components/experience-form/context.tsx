'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type Context = {
  open: boolean
  setOpen: (open: boolean) => void
  experienceId?: number
  setExperienceId: (id?: number) => void
}

const Context = createContext({} as Context)

export const ExperienceFormProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [experienceId, setExperienceId] = useState<number | undefined>()

  return (
    <Context.Provider
      value={{
        open,
        setOpen,
        experienceId,
        setExperienceId,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useExperienceForm = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useExperienceForm must be used within an ExperienceFormProvider')
  }

  return context
}
