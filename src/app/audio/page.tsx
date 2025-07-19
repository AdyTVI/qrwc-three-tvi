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
import { useNumber } from "@/hooks/useNumber"
import { useString } from "@/hooks/useString"
import { useMomentary } from "@/hooks/useMomentary"

export default function AudioPage() {
  const volumes = [
    { name: "Microphone", component: "MicVolume" },
    { name: "USB", component: "USBVolume" },
    { name: "Audio Player", component: "MediaVolume" },
    { name: "Bluetooth", component: "ProgramVolume" },
  ]

  // Media Player Control Toggle
  const { trigger: PushRewind } = useMomentary({
    componentName: "AudioPlayer",
    controlName: "rewind",
  })

  const { trigger: PushFastForward } = useMomentary({
    componentName: "AudioPlayer",
    controlName: "fast.forward",
  })

  const { toggle: PushPlay } = useToggle({
    componentName: "AudioPlayer",
    controlName: "play",
  })

  const { toggle: PushPause } = useToggle({
    componentName: "AudioPlayer",
    controlName: "pause",
  })

  const { toggle: PushStop } = useToggle({
    componentName: "AudioPlayer",
    controlName: "stop",
  })

  const { toggle: PushPrev } = useToggle({
    componentName: "AudioPlayer",
    controlName: "playlist.prev",
  })

  const { toggle: PushNext } = useToggle({
    componentName: "AudioPlayer",
    controlName: "playlist.next",
  })

  // Player state from Q-SYS
  const { state: isPlaying } = useToggle({
    componentName: "AudioPlayer",
    controlName: "playing",
  })

  const { state: isPaused } = useToggle({
    componentName: "AudioPlayer",
    controlName: "paused",
  })

/*   const { state: isStopped } = useToggle({
    componentName: "AudioPlayer",
    controlName: "stopped",
  }) */


  const { state: progressSeconds } = useNumber({
    componentName: "AudioPlayer",
    controlName: "progress",
  })

  const { state: progressMax } = useNumber({
    componentName: "AudioPlayer",
    controlName: "progress",
    field: "ValueMax"
  })

  const { state: progressString } = useString({
    componentName: "AudioPlayer",
    controlName: "progress",
    field: "String"
  })

  const playerState: "playing" | "paused" | "stopped" = isPlaying
    ? "playing"
    : isPaused
      ? "paused"
      : "stopped"

  const handleSmartToggle = () => {
    if (playerState === "playing") {
      PushPause()
    } else {
      PushPlay()
    }
  }

  const handleStop = () => {
    PushStop()
  }

  const formatTime = (seconds: number | null): string => {
    if (seconds === null || isNaN(seconds)) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const progressPercent = progressMax
    ? Math.min(100, Math.max(0, ((progressSeconds ?? 0) / progressMax) * 100))
    : 0

  const { state: currentFilename } = useString({
    componentName: "AudioPlayer",
    controlName: "filename.ui",
    field: "String"
  })

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
          <span className="mx-4 text-gray-500 font-semibold">Audio Player</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
      </div>

      {/* Current Track Info */}
      <div className="text-center mb-6 text-white">
        <div className="flex justify-center mt-4">
          <div className="bg-blue-900 text-blue-200 px-4 py-2 rounded shadow-md text-sm">
            🎵 Now Playing: {currentFilename || "No track selected"}
          </div>
        </div>
        {<div className="text-sm text-gray-400">
          Elapsed: {progressString || formatTime(progressSeconds)}
        </div>}
        <div className="w-full max-w-xl mx-auto bg-gray-700 rounded-full h-2 mt-2">
          {<div
            className="bg-blue-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />}
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
          onClick={PushPrev}
          className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          title="Previous"
        >
          <LuSkipBack size={20} />
        </button>
        <button
          onClick={handleSmartToggle}
          className={`p-4 ${playerState === "playing"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
            } text-white rounded-full transition`}
          title={playerState === "playing" ? "Pause" : "Play"}
        >
          {playerState === "playing" ? <LuPause size={20} /> : <LuPlay size={20} />}
        </button>
        <button
          onClick={handleStop}
          className="p-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
          title="Stop"
        >
          <LuCircleStop size={20} />
        </button>
        <button
          onClick={PushNext}
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
