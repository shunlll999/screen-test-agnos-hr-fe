import { SessionStatus } from "@/lib/types";
import PulseIndicator from "../PulseIndicator";

const LABEL: Record<SessionStatus, string> = {
  active: "Actively filling in",
  idle: "Inactive",
  submitted: "Submitted",
};

const COLORS: Record<SessionStatus, string> = {
  active: "bg-amber-soft text-amber",
  idle: "bg-idle-soft text-idle",
  submitted: "bg-primary-soft text-primary",
};

const StatusPill = ({ status }: { status: SessionStatus }) => {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${COLORS[status]}`}
    >
      <PulseIndicator status={status} />
      {LABEL[status]}
    </span>
  );
}

export default StatusPill
