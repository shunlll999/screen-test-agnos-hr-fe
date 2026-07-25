export type Gender = "female" | "male" | "non-binary" | "prefer-not-to-say";

export interface EmergencyContact {
  name: string;
  relationship: string;
}

/** Derived, never stored directly except "submitted" */
export type SessionStatus = "active" | "idle" | "submitted";

export interface PatientRecord {
  sessionId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender | "";
  phoneNumber: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  religion: string;
  /** epoch ms of the most recent field edit */
  lastUpdated: number;
  /** epoch ms this session was first created */
  createdAt: number;
  /** set once the patient submits the form */
  submittedAt: number | null;
}

export const EMPTY_PATIENT_RECORD: Omit<
  PatientRecord,
  "sessionId" | "createdAt" | "lastUpdated" | "submittedAt"
> = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phoneNumber: "",
  email: "",
  address: "",
  preferredLanguage: "",
  nationality: "",
  emergencyContactName: "",
  emergencyContactRelationship: "",
  religion: "",
};

/** How long a session can go without an edit before it's considered idle. */
export const IDLE_THRESHOLD_MS = 15_000;
