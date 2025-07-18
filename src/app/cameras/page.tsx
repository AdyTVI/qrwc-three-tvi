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
import { useState } from "react";
import { useMomentary } from "@/hooks/useMomentary";

export default function CamerasPage() {
 /*  const { state: isCameraPrivate, toggle: togglePrivacy } = useToggle({
    componentName: "Camera-Bridge",
    controlName: "toggle.privacy",
  }); */

  const { trigger: moveHome } = useMomentary({ componentName: "CameraControl", controlName: "momentary.2" })

/*   const { state: cameraHomePreset, toggle: moveHome } = useToggle({
    componentName: "Camera-Bridge",
    controlName: "preset.home.load",
  }); */

  const { trigger: moveUp } = useMomentary({ componentName: "CameraControl", controlName: "momentary.5" })


/*   const { state: cameraUp, toggle: moveUp } = useToggle({
    componentName: "Camera-Bridge",
    controlName: "tilt.up",
  }); */

  const { trigger: moveDown} = useMomentary({ componentName: "CameraControl", controlName: "momentary.1" })

/*   const { state: cameraDown, toggle: moveDown } = useToggle({
    componentName: "Camera-Bridge",
    controlName: "tilt.down",
  }); */

  const { trigger: moveLeft } = useMomentary({ componentName: "CameraControl", controlName: "momentary.3" })

/*   const { state: cameraLeft, toggle: moveLeft } = useToggle({
    componentName: "Camera-Bridge",
    controlName: "pan.left",
  }); */

  const { trigger: moveRight } = useMomentary({ componentName: "CameraControl", controlName: "momentary.4" })

/*   const { state: cameraRight, toggle: moveRight } = useToggle({
    componentName: "Camera-Bridge",
    controlName: "pan.right",
  }); */

  const { trigger: zoomIn } = useMomentary({ componentName: "CameraControl", controlName: "momentary.6" })
  
/*   const { state: cameraZoomIn, toggle: zoomIn } = useToggle({
    componentName: "Camera-Bridge",
    controlName: "zoom.in",
  }); */

  const { trigger: zoomOut } = useMomentary({ componentName: "CameraControl", controlName: "momentary.7" })
  
/*   const { state: cameraZoomOut, toggle: zoomOut } = useToggle({
    componentName: "Camera-Bridge",
    controlName: "zoom.out",
  }); */

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
    setIsPressed((prevState) => ({ ...prevState, [type]: true }));
    switch (type) {
      case "cameraHome":
        moveHome();
        break;
      case "cameraUp":
        moveUp();
        break;
      case "cameraDown":
        moveDown();
        break;
      case "cameraLeft":
        moveLeft();
        break;
      case "cameraRight":
        moveRight();
        break;
      case "cameraZoomIn":
        zoomIn();
        break;
      case "cameraZoomOut":
        zoomOut();
        break;
    }
  };

  const handleMouseUp = (type: keyof typeof isPressed) => {
    setIsPressed((prevState) => ({ ...prevState, [type]: false }));
    switch (type) {
      case "cameraHome":
        moveHome();
        break;
      case "cameraUp":
        moveUp();
        break;
      case "cameraDown":
        moveDown();
        break;
      case "cameraLeft":
        moveLeft();
        break;
      case "cameraRight":
        moveRight();
        break;
      case "cameraZoomIn":
        zoomIn();
        break;
      case "cameraZoomOut":
        zoomOut();
        break;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="p-6 rounded-2xl bg-white shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Camera Controls</h2>

        <div className="flex flex-col items-center gap-3">
          {/* Arrow controls */}
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

          {/* Zoom controls */}
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

          {/* Privacy toggle */}
          <div className="flex justify-center mt-4">
{/*             <button
              onClick={togglePrivacy}
              className={`p-3 rounded-full ${isCameraPrivate ? "bg-red-500" : "bg-gray-300"}`}
            >
              {isCameraPrivate ? <LuVideoOff size={24} /> : <LuVideo size={24} />}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
