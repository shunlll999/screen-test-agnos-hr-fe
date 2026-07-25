"use client";

import { useEffect, useState } from "react";
import { IDLE_THRESHOLD_MS, type PatientRecord, type SessionStatus } from "@/lib/types";

export interface LiveSession extends PatientRecord {
  status: SessionStatus;
}

function deriveStatus(record: PatientRecord, now: number): SessionStatus {
  if (record.submittedAt) return "submitted";
  return now - record.lastUpdated < IDLE_THRESHOLD_MS ? "active" : "idle";
}

export function useLiveSessions() {
  const [sessions, setSessions] = useState<Record<string, PatientRecord>>(() => {
    if (typeof window === "undefined") return {};
    return JSON.parse(localStorage.getItem("sessions") || "{}");
  });
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 2000);
    return () => clearInterval(tick);
  }, []);

  const liveSessions: LiveSession[] = Object.values(sessions)
    .map((record) => ({ ...record, status: deriveStatus(record, now) }))
    .sort((a, b) => b.lastUpdated - a.lastUpdated);

  return liveSessions;
}
