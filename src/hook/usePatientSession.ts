"use client";

import { useCallback, useState } from "react";
import { PatientFormValues } from "@/lib/schema";
import { getExistingById, getSessionId } from "@/lib/session";
import { publish, update } from "@/lib/adapter";
import { EMPTY_PATIENT_RECORD, PatientRecord, SessionStatus } from "@/lib/types";

export const usePatientSession = () => {
  const [sessionId, setSessionId] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [defaultData, setDefaultData] = useState<PatientRecord & { status: SessionStatus }>();

  const createSession = useCallback(async () => {
    try {
      const response = await getSessionId();
      setSessionId(response.sessionId);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  }, []);

  const publishDraft = useCallback(
    async (
      data: PatientFormValues,
      status: SessionStatus = "active",
      targetId?: string
    ) => {
      const currentId = targetId || sessionId;
      if (!currentId) return;

      try {
        const existing = await getExistingById(currentId);
        const now = Date.now();

        const record: PatientRecord = {
          ...EMPTY_PATIENT_RECORD,
          ...existing?.data,
          ...data,
          sessionId: currentId,
          createdAt: existing?.createdAt ?? now,
          lastUpdated: now,
          submittedAt: existing?.submittedAt ?? null,
          status,
        } as PatientRecord;

        await update(record);
      } catch (error) {
        console.error("Error publishing draft:", error);
      }
    },
    [sessionId]
  );

  const submitForm = useCallback(
    async (values: PatientFormValues) => {
      if (!sessionId) return;

      try {
        const now = Date.now();
        const existing = await getExistingById(sessionId);

        const record: PatientRecord & { status: SessionStatus } = {
          ...EMPTY_PATIENT_RECORD,
          ...existing?.data,
          ...values,
          sessionId,
          createdAt: existing?.createdAt ?? now,
          lastUpdated: now,
          submittedAt: now,
          status: "submitted",
        };

        await publish(record);
        setSubmitted(true);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [sessionId]
  );

  const defaultSession = useCallback(
    async (id: string) => {
      try {
        const sessionData = await getExistingById(id);

        setSessionId(id);
        setDefaultData(sessionData?.data);
        await publishDraft(sessionData?.data, "active", id);
      } catch (error) {
        console.error("Error loading default session:", error);
      }
    },
    [publishDraft]
  );

  const finishUpdate = useCallback(() => {
    setSubmitted(true);
  }, []);

  return {
    sessionId,
    setSessionId,
    submitted,
    defaultData,
    createSession,
    defaultSession,
    publishDraft,
    submitForm,
    finishUpdate,
  };
};
