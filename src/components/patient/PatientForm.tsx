const PatientForm = () => {
  return (
    <form className="mx-auto flex max-w-2xl flex-col gap-8 pb-28">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">Patient Intake Form</p>
        <h1 className="text-3xl font-medium text-ink">Please fill out the form below before your visit.</h1>
        <p className="text-sm text-ink-soft">
          Fields marked <span className="text-muted">optional</span> can be left blank. Everything else
          helps our staff prepare for your visit.
        </p>
      </header>
      <section className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-ink-soft">Identity</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="text-sm font-medium text-ink">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="middleName" className="text-sm font-medium text-ink">Middle Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="-"
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-sm font-medium text-ink">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        </section>
      </form>
  );
};

export default PatientForm;
