"use client";

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
  LuCircleStop,
} from "react-icons/lu";
import { useVolume } from "@/hooks/useVolume";
import { useToggle } from "@/hooks/useToggle";
import { useNumber } from "@/hooks/useNumber";
import { useString } from "@/hooks/useString";
import { useMomentary } from "@/hooks/useMomentary";
import { useDirectoryChoices } from "@/hooks/useDirectoryChoices";
import { JSX, useEffect } from "react";

export default function AudioPage() {
  const volumes = [
    { name: "Microphone", component: "MicVolume" },
    { name: "USB", component: "USBVolume" },
    { name: "Audio Player", component: "MediaVolume" },
    { name: "Bluetooth", component: "ProgramVolume" },
  ];

  const { trigger: PushRewind } = useMomentary({ componentName: "AudioPlayer", controlName: "rewind" });
  const { trigger: PushFastForward } = useMomentary({ componentName: "AudioPlayer", controlName: "fast.forward" });
  const { toggle: PushPlay } = useToggle({ componentName: "AudioPlayer", controlName: "play" });
  const { toggle: PushPause } = useToggle({ componentName: "AudioPlayer", controlName: "pause" });
  const { toggle: PushStop } = useToggle({ componentName: "AudioPlayer", controlName: "stop" });
  const { toggle: PushPrev } = useToggle({ componentName: "AudioPlayer", controlName: "playlist.prev" });
  const { toggle: PushNext } = useToggle({ componentName: "AudioPlayer", controlName: "playlist.next" });

  const { state: isPlaying } = useToggle({ componentName: "AudioPlayer", controlName: "playing" });
  const { state: isPaused } = useToggle({ componentName: "AudioPlayer", controlName: "paused" });

  const { state: progressSeconds } = useNumber({ componentName: "AudioPlayer", controlName: "progress" });
  const { state: progressMax } = useNumber({ componentName: "AudioPlayer", controlName: "progress", field: "ValueMax" });
  const { state: progressString } = useString({ componentName: "AudioPlayer", controlName: "progress", field: "String" });
  const { state: currentFilename } = useString({ componentName: "AudioPlayer", controlName: "filename.ui", field: "String" });

  const { value: selectedDir, choices: directories, select } = useDirectoryChoices("AudioPlayer", "directory.ui");

  const playerState: "playing" | "paused" | "stopped" = isPlaying ? "playing" : isPaused ? "paused" : "stopped";

  const handleSmartToggle = () => {
    if (playerState === "playing") PushPause();
    else PushPlay();
  };

  const handleStop = () => PushStop();

  const formatTime = (seconds: number | null): string => {
    if (seconds === null || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const progressPercent = progressMax
    ? Math.min(100, Math.max(0, ((progressSeconds ?? 0) / progressMax) * 100))
    : 0;

    useEffect(() => {
      console.log("reload start")
      const interval = setInterval(() => {
        console.log("reload")
        window.location.reload();
      }, 1000 * 60); // setiap 60 detik
  
      return () => clearInterval(interval); // bersihkan saat unmount
    }, []);

  return (
    <div className="p-8">
      {/* Volume Controls */}
      <div className="flex flex-row gap-8 justify-center">
        {volumes.map((vol) => (
          <VolumeControl key={vol.component} name={vol.name} componentName={vol.component} />
        ))}
      </div>

      {/* Media Player Group Box */}
      <div className="mt-12 bg-gray-800 p-6 rounded-xl shadow-md border border-gray-600 max-w-3xl mx-auto text-white">
        <h2 className="text-xl font-bold mb-4 text-center">🎧 Audio Player</h2>

        {/* Directory Dropdown */}
        {directories.length > 0 && (
          <div className="mb-4 text-sm">
            <label htmlFor="directory-select" className="mr-2">Directory:</label>
            <select
              id="directory-select"
              value={selectedDir}
              onChange={(e) => select(e.target.value)}
              className="bg-gray-700 border border-gray-500 px-3 py-1 rounded text-white"
            >
              {directories.map((dir) => (
                <option key={dir} value={dir}>{dir}</option>
              ))}
            </select>
          </div>
        )}

        {/* Current Track Info */}
        <div className="mb-4 text-center">
          <div className="bg-blue-900 text-blue-200 px-4 py-2 rounded shadow-sm inline-block text-sm">
            🎵 Now Playing: {currentFilename || "No track selected"}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Elapsed: {progressString || formatTime(progressSeconds)}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Media Player Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mt-4">
          <IconBtn onClick={PushRewind} icon={<LuRewind size={20} />} label="Rewind" />
          <IconBtn onClick={PushPrev} icon={<LuSkipBack size={20} />} label="Previous" />
          <IconBtn
            onClick={handleSmartToggle}
            icon={playerState === "playing" ? <LuPause size={20} /> : <LuPlay size={20} />}
            label={playerState === "playing" ? "Pause" : "Play"}
            className={playerState === "playing" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
          />
          <IconBtn onClick={handleStop} icon={<LuCircleStop size={20} />} label="Stop" className="bg-yellow-500 hover:bg-yellow-600" />
          <IconBtn onClick={PushNext} icon={<LuSkipForward size={20} />} label="Next" />
          <IconBtn onClick={PushFastForward} icon={<LuFastForward size={20} />} label="Fast Forward" />
        </div>
      </div>
    </div>
  );
}

function IconBtn({ onClick, icon, label, className = "" }: { onClick: () => void; icon: JSX.Element; label: string; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-full bg-gray-200 hover:bg-gray-300 transition text-black ${className}`}
      title={label}
    >
      {icon}
    </button>
  );
}

function VolumeControl({ name, componentName }: { name: string; componentName: string }) {
  const { volume, adjustVolume, dbToPercent, formattedVolume } = useVolume({
    componentName,
    controlName: "gain",
    min: -60,
    max: 0,
    step: 5,
  });

  const { state: isMuted, toggle: toggleMute } = useToggle({
    componentName,
    controlName: "mute",
  });

  if (volume === null || isMuted === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-900 p-4 rounded-lg w-[150px]">
      <div className="flex items-center gap-4">
        <div className="h-32 w-4 bg-gray-700 rounded-full relative overflow-hidden">
          <div
            className="absolute bottom-0 w-full rounded-full transition-all duration-300"
            style={{
              height: `${dbToPercent(volume)}%`,
              backgroundColor: isMuted ? "#ef4444" : "#22c55e",
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <button onClick={() => adjustVolume(5)} className="p-2 hover:bg-gray-700 rounded-full text-white">
            <LuPlus size={16} />
          </button>
          <button onClick={toggleMute} className="p-2 hover:bg-gray-700 rounded-full text-white">
            {isMuted ? <LuVolumeX size={20} /> : <LuVolume2 size={20} />}
          </button>
          <button onClick={() => adjustVolume(-5)} className="p-2 hover:bg-gray-700 rounded-full text-white">
            <LuMinus size={16} />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4 text-white">
        <span>{formattedVolume}</span>
        <span>{name}</span>
      </div>
    </div>
  );
}
