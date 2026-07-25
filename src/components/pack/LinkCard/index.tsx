import Link from "next/link";

type LinkCardProps = {
  route: string;
  title: string;
  description: string;
};

const LinkCard = ({
  route,
  title,
  description,
}: LinkCardProps) =>  (
  <Link
      href={route}
      className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-8 text-left shadow-sm transition hover:border-primary hover:shadow-md"
    >
      <span className="text-xs font-medium uppercase tracking-wide text-muted">Role</span>
      <span className="text-xl font-medium text-ink">
        {title}
      </span>
     <span className="text-sm text-ink-soft">
        {description}
      </span>
      <span className="mt-4 text-sm font-medium text-primary group-hover:underline">
        Open form →
      </span>
    </Link>
);

export default LinkCard
