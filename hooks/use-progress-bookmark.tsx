'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ProgressBookmarkContextType {
  isExpanded: boolean
  toggleExpanded: () => void
  expand: () => void
  collapse: () => void
}

const ProgressBookmarkContext = createContext<ProgressBookmarkContextType | null>(null)

export function ProgressBookmarkProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => setIsExpanded(prev => !prev)
  const expand = () => setIsExpanded(true)
  const collapse = () => setIsExpanded(false)

  return (
    <ProgressBookmarkContext.Provider value={{ isExpanded, toggleExpanded, expand, collapse }}>
      {children}
    </ProgressBookmarkContext.Provider>
  )
}

export function useProgressBookmark() {
  const context = useContext(ProgressBookmarkContext)
  if (!context) {
    throw new Error('useProgressBookmark must be used within ProgressBookmarkProvider')
  }
  return context
}
