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

  const trigger = () => {
    const control = components?.[componentName]?.controls?.[controlName]
    if (!control || state === null) return

    control.update("1") // Trigger pulse
  }

  return { state, trigger }
}
