'use client';
import { LiveSession } from "@/hook/useLiveSessions";
import StatusPill from "../StatusPill";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";


const FIELD_ROWS: { key: keyof LiveSession; label: string }[] = [
  { key: "dateOfBirth", label: "Date of birth" },
  { key: "gender", label: "Gender" },
  { key: "phoneNumber", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "preferredLanguage", label: "Language" },
  { key: "nationality", label: "Nationality" },
  { key: "religion", label: "Religion" },
];

const PatientCard = ({ pateint }: { pateint: LiveSession }) => {
  const router = useRouter();
  const fullName = [pateint.firstName, pateint.middleName, pateint.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const emergencyContact =
    pateint.emergencyContactName || pateint.emergencyContactRelationship
      ? `${pateint.emergencyContactName || "—"}${
          pateint.emergencyContactRelationship ? ` (${pateint.emergencyContactRelationship})` : ""
        }`
      : "";

  return (
    <article onClick={() => router.push(`/patient?sessionId=${pateint.sessionId}&status=edit`)} className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:border-primary/40">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium text-ink">
            {fullName || "New patient"}
          </h3>
          <p className="text-[11px] text-muted truncate w-15">
            {pateint.sessionId}
          </p>
        </div>
        <StatusPill status={pateint.status} />
      </header>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {FIELD_ROWS.map(({ key, label }) => (
          <div key={key} className="flex flex-col">
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="truncate text-ink-soft">{(pateint[key] as string) || "—"}</dd>
          </div>
        ))}
        {emergencyContact && (
          <div className="col-span-2 flex flex-col">
            <dt className="text-xs text-muted">Emergency contact</dt>
            <dd className="text-ink-soft">{emergencyContact}</dd>
          </div>
        )}
      </dl>

      <footer className="border-t border-border pt-3 text-xs text-muted">
        {pateint.status === "submitted"
          ? `Submitted ${formatDistanceToNow(pateint.submittedAt ?? pateint.lastUpdated, { addSuffix: true })}`
          : `Updated ${formatDistanceToNow(pateint.lastUpdated, { addSuffix: true })}`}
      </footer>
    </article>
  );
};

export default PatientCard
