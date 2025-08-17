"use client"

import { usePathname } from 'next/navigation'
import { LuMic, LuMicOff } from 'react-icons/lu'
import Image from 'next/image'
import { useToggle } from '@/hooks/useToggle'

const pageNames: { [key: string]: string } = {
  '/': 'Home - Townhall',
  '/audio': 'Audio - Townhall',
  '/cameras': 'Cameras - Townhall',
  '/status/townhall' : 'System Info - Townhall',
  '/status/medium' : 'System Info - Medium',
  '/medium/home' : 'Home - Medium'
  //'/security-camera': 'Security Cameras',
}

const Header = () => {
  const pathname = usePathname()

  const { state: isMicMuted, toggle: toggleMic } = useToggle({
    componentName: 'ShureMXA920',
    controlName: 'GlobalMute'
  })





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

{/*           <button
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
          </button> */}

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

    </header>
  )
}

export default Header