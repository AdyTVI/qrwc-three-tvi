"use client"

import { useState, useEffect } from 'react'
import { useQsys } from '@/context/QsysProvider'

interface UseToggleProps {
  componentName: string
  controlName: string
}

export const useToggle = ({ componentName, controlName }: UseToggleProps) => {
  const { components } = useQsys()
  const [state, setState] = useState<boolean | null>(null)

  useEffect(() => {
    const control = components?.[componentName]?.Controls?.[controlName]
    if (!control) return

    const initialValue = control.Value
    setState(initialValue === '1' || initialValue === 1 || initialValue === true)

    const interval = setInterval(() => {
      const currentControl = components?.[componentName]?.Controls?.[controlName]
      if (currentControl) {
        const currentValue = currentControl.Value
        setState(currentValue === '1' || currentValue === 1 || currentValue === true)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [components, componentName, controlName])

  const toggle = () => {
    const control = components?.[componentName]?.Controls?.[controlName]
    if (!control || state === null) return

    const newState = !state
    control.String = newState ? '1' : '0'
    setState(newState)
  }

  return { state, toggle }
}
