import { BASE_API_URL } from "./constants";
import { PatientRecord } from "./types";


export const publish = async (record: PatientRecord) => {
  const response = await fetch(`${BASE_API_URL}/patients/intake`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record)
    }
  );

  if (response.ok) {
    const pateintData = await response.json();
    return pateintData;
  }else {
    throw new Error(`Failed to publish patient data: ${response.status}`);
  }
}

export const update = async (record: PatientRecord) => {
  const response = await fetch(`${BASE_API_URL}/patients/intake`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record)
  });

  if (response.ok) {
    const patientData = await response.json();
    return patientData;
  } else {
    throw new Error(`Failed to update patient data: ${response.status}`);
  }
}
