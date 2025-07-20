"use client"

import { usePathname } from 'next/navigation'
import { LuMic, LuMicOff, LuLightbulb, LuLightbulbOff, LuPower } from 'react-icons/lu'
import Image from 'next/image'
import { useToggle } from '@/hooks/useToggle'
import { useState } from 'react'

const pageNames: { [key: string]: string } = {
  '/': 'Home',
  '/audio': 'Audio',
  '/cameras': 'Cameras',
  '/security-camera': 'Security Cameras',
}

const Header = () => {
  const pathname = usePathname()

  const { state: isMicMuted, toggle: toggleMic } = useToggle({
    componentName: 'MicVolume',
    controlName: 'mute'
  })

  const { state: isLightOn, toggle: toggleLight } = useToggle({
    componentName: 'Light Control',
    controlName: 'toggle.1'
  })

  const { state: isPowerOn, toggle: setIsPowerOn } = useToggle({
    componentName: 'SystemPower',
    controlName: 'toggle.1'
  })

  const [isLoading, setIsLoading] = useState(false)

  const handlePowerClick = () => {
    setIsPowerOn()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 10000)
  }

  return (
    <header className="w-full bg-gray-900 text-white p-4 relative z-10">
      <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">{pageNames[pathname ?? '/'] ?? 'Home'}</h1>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleMic}
            className={`p-2 rounded-full ${isMicMuted ? 'bg-red-600' : 'bg-green-500'}`}
          >
            {isMicMuted ? <LuMicOff size={20} /> : <LuMic size={20} />}
          </button>

          <button
            onClick={toggleLight}
            className={`p-2 rounded-full ${isLightOn ? 'bg-yellow-500' : 'bg-gray-700'}`}
          >
            {isLightOn ? <LuLightbulbOff size={20} /> : <LuLightbulb size={20} />}
          </button>

          <button
            onClick={handlePowerClick}
            className={`p-2 rounded-full ${isPowerOn ? 'bg-green-500' : 'bg-red-600'}`}
          >
            <LuPower size={20} />
          </button>

          <div className="w-px h-6 bg-gray-700 mx-4" />

          <div className="relative w-auto h-auto">
            <Image
              src="/logo.png"
              alt="TVI Logo"
              width={200}
              height={50}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>

      {/* Loading Popup */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 flex flex-col items-center shadow-lg">
            <div className="loader mb-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin" />
            <p className="text-lg font-semibold">Processing Power Control...</p>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header