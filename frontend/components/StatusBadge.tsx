import { PropertyStatus } from "@/types";

interface StatusBadgeProps {
  status: PropertyStatus;
}

const statusConfig: Record<
  PropertyStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-secondary-container text-on-secondary-container",
  },
  visited: {
    label: "Visited",
    className: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  },
  rejected: {
    label: "Rejected",
    className: "bg-error-container text-on-error-container",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = statusConfig[status];
  return (
    <span
      className={`px-[16px] py-[4px] text-[12px] font-semibold tracking-widest uppercase leading-none ${className}`}
    >
      {label}
    </span>
  );
}
