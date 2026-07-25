type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children?: React.ReactNode;
};

export const Field = ({ label, htmlFor, error, optional, children }: FieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-sm font-medium text-ink-soft">
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {error && <p className="text-xs text-danger" role="alert">{error}</p>}
    </div>
  );
};

export const inputClasses =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

