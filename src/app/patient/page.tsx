import { Suspense } from "react";
import { PatientForm } from "@/components";

const PatientPage = () => {
  return (
    <main className="min-h-screen px-4 py-10 sm:py-16">
      <Suspense>
        <PatientForm />
      </Suspense>
    </main>
  );
}

export default PatientPage
