"use client"

import {
  LuVolumeX,
  LuVolume2,
  LuPlus,
  LuMinus,
  LuPlay,
  LuPause,
  LuSkipForward,
  LuSkipBack,
  LuRewind,
  LuFastForward,
  LuCircleStop
} from "react-icons/lu"
import { useVolume } from "@/hooks/useVolume"
import { useToggle } from "@/hooks/useToggle"
import { useMomentary } from "@/hooks/useMomentary"
import { useState } from "react"

export default function AudioPage() {
  const volumes = [
    { name: "Bluetooth", component: "ProgramVolume" },
    { name: "Microphone", component: "MicVolume" },
    { name: "USB", component: "USBVolume" },
    { name: "Media Player", component: "MediaVolume" },
  ]

  // Media Player Control Triggers
  const { trigger: PushRewind } = useMomentary({ componentName: "MediaPlayerControl", controlName: "momentary.4" })
  const { trigger: PushPlay } = useMomentary({ componentName: "MediaPlayerControl", controlName: "momentary.3" })
  const { trigger: PushPause } = useMomentary({ componentName: "MediaPlayerControl", controlName: "momentary.2" })
  const { trigger: PushStop } = useMomentary({ componentName: "MediaPlayerControl", controlName: "momentary.5" })
  const { trigger: PushFastForward } = useMomentary({ componentName: "MediaPlayerControl", controlName: "momentary.1" })

  return (
    <div className="p-8">
      {/* Volume Controls */}
      <div className="flex flex-row gap-8 justify-center">
        {volumes.map((vol) => (
          <VolumeControl
            key={vol.component}
            name={vol.name}
            componentName={vol.component}
          />
        ))}
      </div>

      {/* Media Player Label with Line */}
      <div className="flex items-center justify-center my-12">
        <div className="flex items-center w-full max-w-xl">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 font-semibold">Media Player</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
      </div>

      {/* Media Player Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={PushRewind}
          className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          title="Rewind"
        >
          <LuRewind size={20} />
        </button>
        <button
          onClick={() => console.log("Skip Back clicked")}
          className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          title="Previous"
        >
          <LuSkipBack size={20} />
        </button>
        <button
          onClick={PushPlay}
          className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
          title="Play"
        >
          <LuPlay size={20} />
        </button>
        <button
          onClick={PushPause}
          className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          title="Pause"
        >
          <LuPause size={20} />
        </button>
        <button
          onClick={PushStop}
          className="p-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
          title="Stop"
        >
          <LuCircleStop size={20} />
        </button>
        <button
          onClick={() => console.log("Skip Forward clicked")}
          className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          title="Next"
        >
          <LuSkipForward size={20} />
        </button>
        <button
          onClick={PushFastForward}
          className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          title="Fast Forward"
        >
          <LuFastForward size={20} />
        </button>
      </div>
    </div>
  )
}

function VolumeControl({
  name,
  componentName
}: {
  name: string
  componentName: string
}) {
  const { volume, adjustVolume, dbToPercent, formattedVolume } = useVolume({
    componentName,
    controlName: "gain",
    min: -60,
    max: 0,
    step: 5
  })

  const { state: isMuted, toggle: toggleMute } = useToggle({
    componentName,
    controlName: "mute"
  })

  if (volume === null || isMuted === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center bg-gray-900 p-4 rounded-lg w-[150px]">
      <div className="flex items-center gap-4">
        <div className="h-32 w-4 bg-gray-700 rounded-full relative overflow-hidden">
          <div
            className="absolute bottom-0 w-full rounded-full transition-all duration-300"
            style={{
              height: `${dbToPercent(volume)}%`,
              backgroundColor: isMuted ? "#ef4444" : "#22c55e"
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => adjustVolume(5)}
            className="p-2 hover:bg-gray-700 rounded-full text-white"
          >
            <LuPlus size={16} />
          </button>
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-gray-700 rounded-full text-white"
          >
            {isMuted ? <LuVolumeX size={20} /> : <LuVolume2 size={20} />}
          </button>
          <button
            onClick={() => adjustVolume(-5)}
            className="p-2 hover:bg-gray-700 rounded-full text-white"
          >
            <LuMinus size={16} />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4 text-white">
        <span>{formattedVolume}</span>
        <span>{name}</span>
      </div>
    </div>
  )
}
