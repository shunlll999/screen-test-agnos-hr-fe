import { BASE_API_URL } from "./constants";


export const getSessionId = async () => {
  const response = await fetch(`${BASE_API_URL}/patients/session`);

  if (response.ok) {
    const sessionId = await response.json();
    return sessionId;
  }
}

export const resetSessionId = async () => {
  return await getSessionId();
}

export const getExisting = async () => {
  const response = await fetch(`${BASE_API_URL}/patients/existing`);
  if (response.ok) {
    const existingData = await response.json();
    return existingData;
  }
}

export const getExistingById = async (sessionId: string) => {
  const response = await fetch(`${BASE_API_URL}/patients/existing-id/${sessionId}`);
  if (response.ok) {
    const existingData = await response.json();
    return existingData;
  }
}
