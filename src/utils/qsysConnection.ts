"use client";

import { Qrwc, Component } from "@q-sys/qrwc";

export const setupQrwc = (
  onControlsUpdated: (qrwc: Qrwc, updatedComponent: Component<string>) => void,
  startComplete: (qrwc: Qrwc) => void,
  disconnect: (qrwc: Qrwc) => void
) => {
  let socket: WebSocket | null = null;
  let reconnectAttempts = 0;
  let shouldReconnect = true;
  let currentQrwc: Qrwc | null = null;

  const connectQrwc = async () => {
    const wsUrl = `ws://${process.env.NEXT_PUBLIC_QSYS_IP}/qrc-public-api/v0`;
    socket = new WebSocket(wsUrl);

    socket.onopen = async () => {
      console.log("[WebSocket] Connected to Q-SYS Core");

      reconnectAttempts = 0; // reset retry count

      try {
        currentQrwc = await Qrwc.createQrwc({ socket, pollingInterval: 350 });

        currentQrwc.on("update", (updatedComponent) => {
          console.log(updatedComponent)
          onControlsUpdated(currentQrwc!, updatedComponent);
        });

        currentQrwc.on("disconnected", () => {
          console.warn("[Qrwc] Disconnected from core.");
          disconnect(currentQrwc!);
        });

        startComplete(currentQrwc);
      } catch (err) {
        console.error("[Qrwc] Failed to initialize:", err);
        reconnectWithDelay();
      }
    };

    socket.onerror = (error) => {
      console.error("[WebSocket] Error:", error);
    };

    socket.onclose = () => {
      console.warn("[WebSocket] Connection closed.");
      reconnectWithDelay();
    };
  };

  const reconnectWithDelay = () => {
    if (!shouldReconnect) return;

    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 15000); // exponential backoff max 15s
    console.log(`[WebSocket] Reconnecting in ${delay / 1000}s...`);
    reconnectAttempts++;

    setTimeout(connectQrwc, delay);
  };

  connectQrwc();

  // Optional cleanup method
  return () => {
    shouldReconnect = false;
    socket?.close();
    //currentQrwc?.destroy?.(); // in case Qrwc supports cleanup
  };
};
