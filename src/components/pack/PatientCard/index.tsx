import StatusPill from "../StatusPill";


const FIELD_ROWS = [
  { key: "dateOfBirth", label: "Date of birth" },
  { key: "gender", label: "Gender" },
  { key: "phoneNumber", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "preferredLanguage", label: "Language" },
  { key: "nationality", label: "Nationality" },
  { key: "religion", label: "Religion" },
];

const PatientCard = () => {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:border-primary/40">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-medium text-ink">
            New patient
          </h3>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted">
            sessionId
          </p>
        </div>
        <StatusPill status='submitted' />
      </header>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {FIELD_ROWS.map(({ key, label }) => (
          <div key={key} className="flex flex-col">
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="truncate text-ink-soft">—</dd>
          </div>
        ))}
      </dl>
    </article>
  );
};

export default PatientCard
