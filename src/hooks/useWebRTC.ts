import { useEffect, useRef, useState } from "react";

// MediaMTX WebRTC hook for WHEP
export const useWebRTC = (whepUrl: string) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const pc = new RTCPeerConnection({
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
          ],
        });
        pcRef.current = pc;

        const remoteStream = new MediaStream();
        pc.ontrack = (event) => {
          remoteStream.addTrack(event.track);
          setStream(remoteStream);
        };

        // Mandatory for WHEP: Create transceivers first!
        pc.addTransceiver("video", { direction: "recvonly" });
        pc.addTransceiver("audio", { direction: "recvonly" });

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const res = await fetch(whepUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/sdp",
          },
          body: offer.sdp,
        });

        const answerSdp = await res.text();

        if (!answerSdp.startsWith("v=0")) {
          throw new Error("Invalid SDP: missing v=0");
        }

        await pc.setRemoteDescription({
          type: "answer",
          sdp: answerSdp,
        });
      } catch (err) {
        console.error("WebRTC connection failed:", err);
      }
    };

    run();

    return () => {
      pcRef.current?.close();
    };
  }, [whepUrl]);

  return { stream };
};
