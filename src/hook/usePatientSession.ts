"use client";

import { useCallback, useState } from "react";

export function usePatientSession() {
  const [submitted, setSubmitted] = useState(false);

  const submitForm = useCallback(
    (values: Record<string, string>) => {
      console.log(values);
      setSubmitted(true);
    },
    []
  );

  const startNewForm = useCallback(() => {
    setSubmitted(false);
  }, []);

  return { submitted, startNewForm, submitForm };
}
