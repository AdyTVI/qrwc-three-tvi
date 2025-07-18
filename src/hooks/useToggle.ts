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
    const control = components?.[componentName]?.controls?.[controlName]
    if (!control) return

    const initialValue = control.state.Value
    setState(initialValue === 1)

    const interval = setInterval(() => {
      const currentControl = components?.[componentName]?.controls?.[controlName]
      if (currentControl) {
        const currentValue = currentControl.state.Value
        setState(currentValue === 1)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [components, componentName, controlName])

  const toggle = () => {
    const control = components?.[componentName]?.controls?.[controlName]
    if (!control || state === null) return

    const newState = !state
    control.update(newState ? '1' : '0')
    setState(newState)
  }

  return { state, toggle }
}
