import type { SessionStatus } from "@/lib/types";

const BAR_DELAYS = [0, 0.15, 0.3, 0.45];

const PulseIndicator = ({ status }: { status: SessionStatus })  =>{
  if (status === "submitted") {
    return (
      <span className="flex h-3 w-3 items-center justify-center rounded-full bg-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </span>
    );
  }

  if (status === "idle") {
    return <span className="h-2.5 w-2.5 rounded-full bg-idle" />;
  }

  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden>
      {BAR_DELAYS.map((delay, i) => (
        <span
          key={i}
          className="wave-bar w-[3px] rounded-full bg-amber"
          style={{ height: "100%", animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

export default PulseIndicator
