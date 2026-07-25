"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { type PatientRecord, type SessionStatus } from "@/lib/types";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3006";

// create instance of socket for every component can connect
let socketInstance: Socket | null = null;

export interface LiveSession extends PatientRecord {
  status: SessionStatus;
}

export const useLiveSessions = () => {
  const [isConnected, setIsConnected] = useState(() => socketInstance?.connected ?? false);
  const [pateints, setPateints] = useState<LiveSession[]>([]);

  useEffect(() => {
    // ถ้ายังไม่มีการเชื่อมต่อ ให้สร้างขึ้นมาใหม่
    if (!socketInstance) {
      socketInstance = io(SOCKET_URL);
    }
    // สร้างฟังก์ชันอัปเดต State แยกไว้ เพื่อให้ตอน Cleanup ถอดออกได้ถูกตัว
    const onConnect = () => {
      setIsConnected(true)
    };
    const onDisconnect = () => setIsConnected(false);

    // ดักฟัง Event พื้นฐาน
    socketInstance.on("connect", onConnect);
    socketInstance.on("message:submitted", (data) => {
      setPateints(data)
    });
    socketInstance.on("disconnect", onDisconnect);

    // Cleanup: ถอดเฉพาะ Listener ของ Component นี้ออกเวลาเปลี่ยนหน้า
    return () => {
      if (socketInstance) {
        socketInstance.off("connect", onConnect);
        socketInstance.off("disconnect", onDisconnect);
      }
    };
  }, []);


  return { pateints, isConnected };
}
