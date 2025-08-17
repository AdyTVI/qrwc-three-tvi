"use client";

import { Qrwc, Component } from "@q-sys/qrwc";

/**
 * Creates WebSocket connections to multiple Q-SYS cores.
 */
export const setupQrwc = (
  onControlsUpdated: (qrwc: Qrwc, updatedComponent: Component<string>) => void,
  startComplete: (qrwc: Qrwc) => void,
  disconnect: (qrwc: Qrwc) => void
) => {
  const ipList = (process.env.NEXT_PUBLIC_QSYS_IPS || "")
    .split(",")
    .map(ip => ip.trim())
    .filter(Boolean);

  if (ipList.length === 0) {
    console.error("[setupQrwc] No Q-SYS IPs provided");
    return;
  }

  const cleanupFunctions: (() => void)[] = [];

  ipList.forEach(ip => {
    let socket: WebSocket | null = null;
    let reconnectAttempts = 0;
    let shouldReconnect = true;
    let currentQrwc: Qrwc | null = null;

    const connectQrwc = async () => {
      socket = new WebSocket(`ws://${ip}/qrc-public-api/v0`);

      socket.onopen = async () => {
        reconnectAttempts = 0;

        try {
          currentQrwc = await Qrwc.createQrwc({ socket, pollingInterval: 100 });

          currentQrwc.on("update", updatedComponent => {
            // console.log(`[QSYS:${ip}] Component Updated:`, updatedComponent.name, updatedComponent);
            onControlsUpdated(currentQrwc!, updatedComponent);
          });

          currentQrwc.on("disconnected", () => {
            disconnect(currentQrwc!);
          });

          startComplete(currentQrwc);
        } catch (err) {
          console.error(`[Qrwc:${ip}] Initialization error:`, err);
          reconnectWithDelay();
        }
      };

      socket.onerror = () => reconnectWithDelay();
      socket.onclose = () => reconnectWithDelay();
    };

    const reconnectWithDelay = () => {
      if (!shouldReconnect) return;
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 15000);
      reconnectAttempts++;
      setTimeout(connectQrwc, delay);
    };

    connectQrwc();

    cleanupFunctions.push(() => {
      shouldReconnect = false;
      socket?.close();
    });
  });

  return () => {
    cleanupFunctions.forEach(fn => fn());
  };
};
