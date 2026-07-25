export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3006/api";


export const GENDER_OPTIONS: { value: string; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-Binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export const LANGUAGE_OPTIONS = [
  "English",
  "Thai",
  "Mandarin",
  "Japanese",
  "Korean",
  "Vietnamese",
  "Burmese",
  "Khmer",
  "Lao",
  "French",
  "German",
  "Spanish",
  "Arabic",
  "Other",
];

export const NATIONALITY_OPTIONS = [
  "Thai",
  "American",
  "British",
  "Chinese",
  "Japanese",
  "Korean",
  "Vietnamese",
  "Singaporean",
  "Malaysian",
  "Indian",
  "Australian",
  "Other",
];

export const RELATIONSHIP_OPTIONS = [
  "Parent",
  "Spouse",
  "Sibling",
  "Child",
  "Friend",
  "Guardian",
  "Other",
];
