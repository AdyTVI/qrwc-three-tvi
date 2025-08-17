"use client"
import { 
  LuLightbulb, LuPower, LuSun,
  LuChevronUp, LuChevronDown, LuSquare, LuMonitor, LuTv
} from "react-icons/lu";
import { useToggle } from '@/hooks/useToggle';
import { useEffect } from "react";
import { useMomentary } from "@/hooks/useMomentary";

export default function Home() {
  const { trigger: TaphomeOff } = useMomentary({ componentName: "Taphome_Off", controlName: "momentary.1" });
  const { trigger: Taphome5 } = useMomentary({ componentName: "Taphome_5", controlName: "momentary.1" });
  const { trigger: Taphome10 } = useMomentary({ componentName: "Taphome_10", controlName: "momentary.1" });

  const { state: isLight1On, toggle: toggleLight1 } = useToggle({
    componentName: 'TH_Light1',
    controlName: 'state'
  });

  const { state: isLight2On, toggle: toggleLight2 } = useToggle({
    componentName: 'TH_Light2',
    controlName: 'state'
  });

  // Curtain controls
  const { trigger: CurtainUp } = useMomentary({ componentName: "Curtain_Up", controlName: "momentary.1" });
  const { trigger: CurtainStop } = useMomentary({ componentName: "Curtain_Stop", controlName: "momentary.1" });
  const { trigger: CurtainDown } = useMomentary({ componentName: "Curtain_Down", controlName: "momentary.1" });

  // Huddle Room source controls
  const { trigger: HuddleSource1 } = useMomentary({ componentName: "Digibird", controlName: "command.3.trigger" });
  const { trigger: HuddleSource2 } = useMomentary({ componentName: "Digibird", controlName: "command.4.trigger" });

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 1000 * 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-8 bg-gray-50">      
      <main className="w-full max-w-7xl px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
{/* Group Box 1 - Taphome */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6 w-full max-w-sm mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">Taphome Control</h2>
  <div className="flex flex-col gap-4 w-full">
    <button onClick={TaphomeOff} className="w-full min-h-[56px] px-4 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center justify-center gap-2 transition-colors">
      <LuPower size={20}/>
      <span>Taphome Off</span>
    </button>
    <button onClick={Taphome5} className="w-full min-h-[56px] px-4 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center justify-center gap-2 transition-colors">
      <LuLightbulb size={20}/>
      <span>Taphome Scene 5</span>
    </button>
    <button onClick={Taphome10} className="w-full min-h-[56px] px-4 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center justify-center gap-2 transition-colors">
      <LuSun size={20}/>
      <span>Taphome Scene 10</span>
    </button>
  </div>
</div>

{/* Group Box 2 - Lighting */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6 w-full max-w-sm mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">Lighting Controls</h2>
  <div className="flex flex-col gap-4 w-full">
    <button onClick={toggleLight1} className={`w-full min-h-[56px] px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
      isLight1On 
        ? 'bg-blue-500 text-white hover:bg-blue-600' 
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }`}>
      <LuLightbulb size={20}/>
      <span>Townhall Lights 1</span>
    </button>
    <button onClick={toggleLight2} className={`w-full min-h-[56px] px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
      isLight2On 
        ? 'bg-blue-500 text-white hover:bg-blue-600' 
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }`}>
      <LuLightbulb size={20}/>
      <span>Townhall Lights 2</span>
    </button>
  </div>
</div>

{/* Group Box 3 - Curtain Control */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6 w-full max-w-sm mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">Curtain Control</h2>
  <div className="flex flex-col gap-4 w-full">
    <button onClick={CurtainUp} className="w-full min-h-[56px] px-4 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white flex items-center justify-center gap-2 transition-colors">
      <LuChevronUp size={20}/>
      <span>Up</span>
    </button>
    <button onClick={CurtainStop} className="w-full min-h-[56px] px-4 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white flex items-center justify-center gap-2 transition-colors">
      <LuSquare size={20}/>
      <span>Stop</span>
    </button>
    <button onClick={CurtainDown} className="w-full min-h-[56px] px-4 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white flex items-center justify-center gap-2 transition-colors">
      <LuChevronDown size={20}/>
      <span>Down</span>
    </button>
  </div>
</div>

{/* Group Box 4 - Huddle Room Source Control */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6 w-full max-w-sm mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">Huddle Room Source</h2>
  <div className="flex flex-col gap-4 w-full">
    <button onClick={HuddleSource1} className="w-full min-h-[56px] px-4 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-green-500 hover:text-white flex items-center justify-center gap-2 transition-colors">
      <LuMonitor size={20}/>
      <span>Source 1</span>
    </button>
    <button onClick={HuddleSource2} className="w-full min-h-[56px] px-4 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-green-500 hover:text-white flex items-center justify-center gap-2 transition-colors">
      <LuTv size={20}/>
      <span>Source 2</span>
    </button>
  </div>
</div>

        </div>
      </main>
    </div>
  );
}
