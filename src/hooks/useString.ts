"use client"

import { useState, useEffect } from 'react'
import { useQsys } from '@/context/QsysProvider'

interface UseStringProps {
  componentName: string
  controlName: string
  field?: 'String' | 'StringMin' | 'StringMax'
}

export const useString = ({
  componentName,
  controlName,
  field = 'String'
}: UseStringProps) => {
  const { components } = useQsys()
  const [state, setState] = useState<string | null>(null)

  useEffect(() => {
    const control = components?.[componentName]?.controls?.[controlName]
    const rawValue = control?.state?.[field]
    if (typeof rawValue !== 'string') return

    setState(rawValue)

    const interval = setInterval(() => {
      const currentControl = components?.[componentName]?.controls?.[controlName]
      const currentValue = currentControl?.state?.[field]
      if (typeof currentValue === 'string') {
        setState(currentValue)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [components, componentName, controlName, field])

  return { state }
}