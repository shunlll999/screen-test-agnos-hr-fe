'use client';
import { useLiveSessions } from "@/hook/useLiveSessions";
import { PatientCard } from "../pack";
import { useMemo } from "react";

const StaffDashboard = () => {
  const liveSessions = useLiveSessions();
  const counts = useMemo(
    () => ({
      active: liveSessions.pateints.filter((s) => s.status === "active").length,
      idle: liveSessions.pateints.filter((s) => s.status === "idle").length,
      submitted: liveSessions.pateints.filter((s) => s.status === "submitted").length,
    }),
    [liveSessions.pateints]
  );


  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">Staff view</p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-medium text-ink">
          Front desk monitor
        </h1>
        <p className="text-sm text-ink-soft">
          Every open patient form updates here live — no refresh needed.
        </p>
      </header>

       <div className="flex flex-wrap gap-3 text-sm">
        <span className="rounded-full bg-amber-soft px-3 py-1 text-amber">{counts.active} filling in</span>
        <span className="rounded-full bg-idle-soft px-3 py-1 text-idle">{counts.idle} inactive</span>
        <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">{counts.submitted} submitted</span>
      </div>


      {liveSessions.pateints.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveSessions.pateints.map((session, index) => (
            <PatientCard key={index} pateint={session} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-surface/60 py-20 text-center">
          <p className="text-sm text-ink-soft">No patient forms are open right now.</p>
          <p className="text-xs text-muted">
            Open the patient form in another tab to see it appear here in real time.
          </p>
        </div>
      )}


    </div>
  );
};

export default StaffDashboard;
