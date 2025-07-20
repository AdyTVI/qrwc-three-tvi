"use client"

import { useRef, useEffect } from "react"
import { useWebRTC } from "@/hooks/useWebRTC"

const cameraUrls = [
  "http://192.168.1.250:8889/cctv1_compressed/whep",
  "http://192.168.1.250:8889/cctv2_compressed/whep",
  "http://192.168.1.250:8889/cctv3_compressed/whep",
  "http://192.168.1.250:8889/cctv4_compressed/whep",
  "http://192.168.1.250:8889/cctv5_compressed/whep",
  "http://192.168.1.250:8889/cctv6_compressed/whep",
  "http://192.168.1.250:8889/cctv7_compressed/whep",
  "http://192.168.1.250:8889/cctv8_compressed/whep",
]

export default function SecurityCameraPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Live View Cameras</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cameraUrls.map((url, idx) => (
          <CameraChannel key={idx} url={url} label={`Channel ${idx + 1}`} />
        ))}
      </div>
    </div>
  )
}

function CameraChannel({ url, label }: { url: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { stream } = useWebRTC(url)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return (
    <div className="rounded-2xl shadow-xl bg-white dark:bg-gray-900 overflow-hidden p-3 flex flex-col">
      <h2 className="text-lg font-semibold mb-2 text-center text-gray-800 dark:text-white">{label}</h2>
      <div className="bg-black rounded-xl overflow-hidden aspect-video">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          controls
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}
