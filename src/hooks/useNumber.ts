"use client"

import { useState, useEffect } from 'react'
import { useQsys } from '@/context/QsysProvider'

interface UseNumberProps {
  componentName: string
  controlName: string
  field?: 'Value' | 'ValueMin' | 'ValueMax' // Optional field selection
}

export const useNumber = ({
  componentName,
  controlName,
  field = 'Value' // default to Value
}: UseNumberProps) => {
  const { components } = useQsys()
  const [state, setState] = useState<number | null>(null)

  useEffect(() => {
    const control = components?.[componentName]?.controls?.[controlName]
    const rawValue = control?.state?.[field]

    if (typeof rawValue !== 'number') return
    setState(rawValue)

    const interval = setInterval(() => {
      const currentControl = components?.[componentName]?.controls?.[controlName]
      const newValue = currentControl?.state?.[field]
      if (typeof newValue === 'number') {
        setState(newValue)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [components, componentName, controlName, field])

  return { state }
}
