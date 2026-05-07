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
    className: "bg-[#e6f4ea] text-[#137333]",
  },
  visited: {
    label: "Visited",
    className: "bg-[#fef7e0] text-[#ea8600]",
  },
  rejected: {
    label: "Rejected",
    className: "bg-[#fce8e6] text-[#c5221f]",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = statusConfig[status];
  return (
    <span
      className={`px-3 py-1 text-[12px] font-medium rounded-full ${className}`}
    >
      {label}
    </span>
  );
}
