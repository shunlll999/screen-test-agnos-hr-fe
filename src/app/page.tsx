import { LinkCard } from "@/components/pack";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-3xl flex-col items-center gap-10 text-center">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            Patient intake — frontend Screen test for Agnos
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-medium text-ink">
            Choose a view
          </h1>
          <p className="text-sm text-ink-soft">
            This simulates real-time sync between the two roles <u><i><b>Patient Input</b></i></u> and <u><i><b>Staff View</b></i></u> and this for developer screen testing to perform how manage both area as Front-End and Back-End (simple BE)</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <LinkCard route="/patient" title="Patient Form" description="Fill in your details before your visit." />
          <LinkCard route="/staff" title="Staff View" description="Monitor patient forms as they're filled in, live." />
        </div>
      </div>
    </main>
  );
}
