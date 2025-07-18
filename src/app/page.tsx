"use client"
import { LuLaptop, LuWifiHigh, LuLightbulb, LuGrid3X3 } from "react-icons/lu";
import { useToggle } from '@/hooks/useToggle';

export default function Home() {
  const { state: workSelected, toggle: toggleWork } = useToggle({
    componentName: 'SourceControl',
    controlName: 'selector.0'
  });

  const { state: personalSelected, toggle: togglePersonal } = useToggle({
    componentName: 'SourceControl',
    controlName: 'selector.1'
  });

  const { state: isLightOn, toggle: toggleLight } = useToggle({
    componentName: 'Light Control',
    controlName: 'toggle.1'
  });

  const { state: pixelPower, toggle: togglePixelPower } = useToggle({
    componentName: 'LED',
    controlName: 'toggle.1'
  });

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-8 bg-gray-50">      
      <main className="w-full max-w-7xl px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Group Box 1 - Vertical buttons */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6 w-full max-w-sm mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">Source Selection</h2>
  <div className="flex flex-col gap-4 w-full">
    <button
      onClick={toggleWork}
      className={`w-full min-h-[56px] px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
        workSelected 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      <LuLaptop size={20}/>
      <span>Laptop</span>
    </button>
    <button
      onClick={togglePersonal}
      className={`w-full min-h-[56px] px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
        personalSelected 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      <LuWifiHigh size={20}/>
      <span>Wireless</span>
    </button>
  </div>
</div>

{/* Group Box 2 */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6 w-full max-w-sm mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">Lighting Controls</h2>
  <div className="flex justify-center">
    <button
      onClick={toggleLight}
      className={`w-full min-h-[72px] px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
        isLightOn 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      <LuLightbulb size={24}/>
      <span>Townhall Lights</span>
    </button>
  </div>
</div>

{/* Group Box 3 */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6 w-full max-w-sm mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">Display Controls</h2>
  <div className="flex justify-center">
    <button
      onClick={togglePixelPower}
      className={`w-full min-h-[72px] px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
        pixelPower 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      <LuGrid3X3 size={24}/>
      <span>LED Display</span>
    </button>
  </div>
</div>


        </div>
      </main>
    </div>
  );
}
