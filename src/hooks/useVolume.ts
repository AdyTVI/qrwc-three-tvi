// useVolume.ts
import { useEffect, useState } from 'react'
import { useQsys } from '@/context/QsysProvider'

interface UseVolumeProps {
  componentName: string
  controlName: string
  min?: number // optional
  max?: number // optional
  step?: number // ✅ Add this line
}

export const useVolume = ({
  componentName,
  controlName,
  min = -60,
  max = 0,
  //step = 1, // ✅ Add default value
}: UseVolumeProps) => {
  const { components } = useQsys()
  const [volume, setVolume] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!components?.[componentName]) return

    const val = components[componentName]?.controls?.[controlName]?.state.Value
    if (typeof val === 'number') {
      setVolume(val)
      setIsLoading(false)
    }

    const interval = setInterval(() => {
      const newVal = components[componentName]?.controls?.[controlName]?.state.Value
      if (typeof newVal === 'number') {
        setVolume(newVal)
        setIsLoading(false)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [components, componentName, controlName])

  const dbToPercent = (db: number | null): number => {
    if (typeof db !== 'number') return 0
    return ((db - min) / (max - min)) * 100
  }

  const formattedVolume = volume !== null ? `${volume.toFixed(1)} dB` : '--'

  const adjustVolume = (delta: number) => {
    if (volume === null) return
    const newVolume = Math.max(min, Math.min(max, volume + delta))
    setVolume(newVolume)
    if (components?.[componentName]?.controls?.[controlName]) {
      components[componentName].controls[controlName].update(newVolume)
    }
  }

  return {
    volume,
    setVolume,
    adjustVolume,
    dbToPercent,
    formattedVolume,
    isLoading,
  }
}
