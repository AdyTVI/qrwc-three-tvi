"use client"

import { useQsys } from '@/context/QsysProvider'

// Props for the hook
interface UseMomentaryProps {
  componentName: string
  controlName: string
}

export const useMomentary = ({ componentName, controlName }: UseMomentaryProps) => {
  const { components } = useQsys()

  const trigger = () => {
    // Safety check: ensure the control exists
    const control = components?.[componentName]?.Controls?.[controlName]
    if (!control) return

    // Momentary pulse: send "1" (true), then after a short delay, send "0" (false)
    control.String = "1"
    setTimeout(() => {
      control.String = "0"
    }, 50) // 100ms pulse duration; adjust if needed
  }

  return { trigger }
}
