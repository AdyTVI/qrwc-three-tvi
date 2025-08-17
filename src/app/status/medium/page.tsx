"use client"

import React from "react"
import { useString } from "@/hooks/useString"
import { useEffect } from "react";

export default function SystemStatus() {
  const componentName = "Status_Core-BSJ"

  // Temperature strings (like "51.0°C")
  const cpuTemperature = useString({ componentName, controlName: "processor.temperature", field: "String" })
  const systemTemperature = useString({ componentName, controlName: "system.temperature", field: "String" })
  //const ioCardTemperature = useString({ componentName, controlName: "io.card.temperature", field: "String" })

  // Network info strings
  const lanAAddress = useString({ componentName, controlName: "lan.a.address", field: "String" })
  const lanAMode = useString({ componentName, controlName: "lan.a.mode", field: "String" })
  //const lanAState = useString({ componentName, controlName: "lan.a.state", field: "String" })
  const lanBAddress = useString({ componentName, controlName: "lan.b.address", field: "String" })
  const lanBMode = useString({ componentName, controlName: "lan.b.mode", field: "String" })
  //const lanBState = useString({ componentName, controlName: "lan.b.state", field: "String" })

  // Boolean status strings ("true" / "false")
  //const systemAuxPower = useString({ componentName, controlName: "system.aux.power", field: "String" })
  //const poePlusPlusA = useString({ componentName, controlName: "system.poe.plus.plus.status.A", field: "String" })
  //const poeStatusA = useString({ componentName, controlName: "system.poe.status.A", field: "String" })


  // Extract numeric temperature value (remove °C)
  const tempValue = (tempStr: string | null) => {
    if (!tempStr) return 0
    const match = tempStr.match(/([\d.]+)/)
    return match ? parseFloat(match[1]) : 0
  }

  // Max temperature for progress bars
  const MAX_TEMP = 100

  useEffect(() => {
    console.log("reload start")
    const interval = setInterval(() => {
      console.log("reload")
      window.location.reload();
    }, 1000 * 300); // setiap 60 detik

    return () => clearInterval(interval); // bersihkan saat unmount
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-900 rounded-xl shadow-lg text-gray-100 font-sans">
      <h1 className="text-3xl font-extrabold mb-8 text-center tracking-wide">System Status - TownHall</h1>

      {/* Temperatures */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[ 
          { label: "CPU Temperature", value: cpuTemperature.state },
          { label: "System Temperature", value: systemTemperature.state },
          //{ label: "IO Card Temperature", value: ioCardTemperature.state },
        ].map(({ label, value }) => {
          const temp = tempValue(value)
          const percent = Math.min(100, (temp / MAX_TEMP) * 100)
          return (
            <div key={label} className="bg-gradient-to-tr from-blue-900 to-blue-700 rounded-lg p-5 shadow-lg flex flex-col items-center">
              <span className="text-lg font-semibold mb-2">{label}</span>
              <span className="text-4xl font-bold mb-4">{value ?? "—"}</span>
              <div className="w-full h-3 bg-blue-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Network Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* LAN A */}
        <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b border-purple-500 pb-2">LAN A Status</h2>
          <StatusItem label="Address" value={lanAAddress.state} />
          <StatusItem label="Mode" value={lanAMode.state} />
          {/* <StatusItem label="State" value={lanAState.state} /> */}
        </div>

        {/* LAN B */}
        <div className="bg-gradient-to-br from-pink-900 to-pink-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b border-pink-500 pb-2">LAN B Status</h2>
          <StatusItem label="Address" value={lanBAddress.state} />
          <StatusItem label="Mode" value={lanBMode.state} />
          {/* <StatusItem label="State" value={lanBState.state} /> */}
        </div>
      </div>


    </div>
  )
}

function StatusItem({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-purple-500 last:border-b-0">
      <span className="font-medium">{label}</span>
      <span className="font-mono">{value ?? "—"}</span>
    </div>
  )
}
