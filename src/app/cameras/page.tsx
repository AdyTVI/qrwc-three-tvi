"use client";

import {
  LuArrowDown,
  LuArrowUp,
  LuArrowLeft,
  LuArrowRight,
  LuZoomIn,
  LuZoomOut,
  LuHouse
} from "react-icons/lu";
import { useState, useRef, useEffect } from "react";
import { useMomentary } from "@/hooks/useMomentary";
import { useWebRTC } from "@/hooks/useWebRTC";

export default function CamerasPage() {
  const { trigger: moveHome } = useMomentary({ componentName: "AverCamera", controlName: "btnHome" });
  const { trigger: moveUp } = useMomentary({ componentName: "AverCamera", controlName: "btnUp" });
  const { trigger: moveDown } = useMomentary({ componentName: "AverCamera", controlName: "btnDown" });
  const { trigger: moveLeft } = useMomentary({ componentName: "AverCamera", controlName: "btnLeft" });
  const { trigger: moveRight } = useMomentary({ componentName: "AverCamera", controlName: "btnRight" });
  const { trigger: zoomIn } = useMomentary({ componentName: "AverCamera", controlName: "btnZoomIn" });
  const { trigger: zoomOut } = useMomentary({ componentName: "AverCamera", controlName: "btnZoomOut" });

  const [isPressed, setIsPressed] = useState({
    cameraHome: false,
    cameraUp: false,
    cameraDown: false,
    cameraLeft: false,
    cameraRight: false,
    cameraZoomIn: false,
    cameraZoomOut: false,
  });

  const handleMouseDown = (type: keyof typeof isPressed) => {
    setIsPressed((prev) => ({ ...prev, [type]: true }));
    switch (type) {
      case "cameraHome": moveHome(); break;
      case "cameraUp": moveUp(); break;
      case "cameraDown": moveDown(); break;
      case "cameraLeft": moveLeft(); break;
      case "cameraRight": moveRight(); break;
      case "cameraZoomIn": zoomIn(); break;
      case "cameraZoomOut": zoomOut(); break;
    }
  };

  const handleMouseUp = (type: keyof typeof isPressed) => {
    setIsPressed((prev) => ({ ...prev, [type]: false }));
    switch (type) {
      case "cameraHome": moveHome(); break;
      case "cameraUp": moveUp(); break;
      case "cameraDown": moveDown(); break;
      case "cameraLeft": moveLeft(); break;
      case "cameraRight": moveRight(); break;
      case "cameraZoomIn": zoomIn(); break;
      case "cameraZoomOut": zoomOut(); break;
    }
  };

  const webrtcVideoRef = useRef<HTMLVideoElement>(null);
  
  //Private
  //const { stream: webRTCStream } = useWebRTC("http://192.168.1.250:8889/cam1_compressed/whep");
  
  //Public
  const { stream: webRTCStream } = useWebRTC("http://139.255.254.202:8889/cam1_compressed/whep");
  
  useEffect(() => {
    if (webrtcVideoRef.current && webRTCStream) {
      webrtcVideoRef.current.srcObject = webRTCStream;
    }
  }, [webRTCStream]);

  useEffect(() => {
    console.log("reload start")
    const interval = setInterval(() => {
      console.log("reload")
      window.location.reload();
    }, 1000 * 60); // setiap 60 detik

    return () => clearInterval(interval); // bersihkan saat unmount
  }, []);

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="flex gap-6 w-full max-w-6xl">
        {/* 📺 Camera Stream Box */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-center">Camera Stream</h2>
          <div className="flex-1 bg-black rounded-xl overflow-hidden">
            <video
              ref={webrtcVideoRef}
              autoPlay
              muted
              playsInline
              controls
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 🎮 Camera Control Box */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-center">Camera Controls</h2>

          <div className="flex flex-col items-center justify-center flex-grow gap-4">
            {/* Arrow Controls */}
            <div className="flex justify-center">
              <button
                onMouseDown={() => handleMouseDown("cameraUp")}
                onMouseUp={() => handleMouseUp("cameraUp")}
                className={`p-3 rounded-full ${isPressed.cameraUp ? "bg-blue-500" : "bg-gray-300"}`}
              >
                <LuArrowUp size={24} />
              </button>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onMouseDown={() => handleMouseDown("cameraLeft")}
                onMouseUp={() => handleMouseUp("cameraLeft")}
                className={`p-3 rounded-full ${isPressed.cameraLeft ? "bg-blue-500" : "bg-gray-300"}`}
              >
                <LuArrowLeft size={24} />
              </button>

              <button
                onMouseDown={() => handleMouseDown("cameraHome")}
                onMouseUp={() => handleMouseUp("cameraHome")}
                className={`p-3 rounded-full ${isPressed.cameraHome ? "bg-green-500" : "bg-gray-300"}`}
              >
                <LuHouse size={24} />
              </button>

              <button
                onMouseDown={() => handleMouseDown("cameraRight")}
                onMouseUp={() => handleMouseUp("cameraRight")}
                className={`p-3 rounded-full ${isPressed.cameraRight ? "bg-blue-500" : "bg-gray-300"}`}
              >
                <LuArrowRight size={24} />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onMouseDown={() => handleMouseDown("cameraDown")}
                onMouseUp={() => handleMouseUp("cameraDown")}
                className={`p-3 rounded-full ${isPressed.cameraDown ? "bg-blue-500" : "bg-gray-300"}`}
              >
                <LuArrowDown size={24} />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onMouseDown={() => handleMouseDown("cameraZoomIn")}
                onMouseUp={() => handleMouseUp("cameraZoomIn")}
                className={`p-3 rounded-full ${isPressed.cameraZoomIn ? "bg-blue-500" : "bg-gray-300"}`}
              >
                <LuZoomIn size={24} />
              </button>

              <button
                onMouseDown={() => handleMouseDown("cameraZoomOut")}
                onMouseUp={() => handleMouseUp("cameraZoomOut")}
                className={`p-3 rounded-full ${isPressed.cameraZoomOut ? "bg-blue-500" : "bg-gray-300"}`}
              >
                <LuZoomOut size={24} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
