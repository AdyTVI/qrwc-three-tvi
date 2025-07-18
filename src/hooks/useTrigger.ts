"use client"

import { useState, useEffect } from 'react'
import { useQsys } from '@/context/QsysProvider'

// Interface for props
interface useTriggerProps {
  componentName: string
  controlName: string
}

export const useTrigger = ({ componentName, controlName }: useTriggerProps) => {
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

  const trigger = () => {
    const control = components?.[componentName]?.Controls?.[controlName]
    if (!control || state === null) return

    control.Value = '1' // Trigger pulse
  }

  return { state, trigger }
}
