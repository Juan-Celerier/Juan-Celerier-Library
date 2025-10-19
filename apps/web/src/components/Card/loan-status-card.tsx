import { Badge, type BadgeVariant } from "../../ui/Badge";
// Assuming a Badge component exists or will be created in the ui folder

// Props based on Loan and potentially Book entities
export interface LoanStatusCardProps {
  /** Title of the borrowed book */
  bookTitle: string;
  /** Due date for returning the book */
  dueDate: Date;
  /** Current status of the loan ('active', 'returned', 'overdue') */
  status: "active" | "returned" | "overdue";
  /** Optional function to execute on click */
  onClick?: () => void;
  /** Additional Tailwind classes */
  className?: string;
}

// Helper to map status to Badge variant
const getBadgeVariant = (
  status: LoanStatusCardProps["status"]
): BadgeVariant => {
  switch (status) {
    case "active":
      return "success"; // Or your theme's equivalent for 'active'
    case "overdue":
      return "destructive"; // Or your theme's equivalent for 'overdue'
    case "returned":
      return "secondary"; // Or your theme's equivalent for 'returned'
    default:
      return "secondary";
  }
};

export const LoanStatusCard = ({
  bookTitle,
  dueDate,
  status,
  onClick,
  className = "",
}: LoanStatusCardProps) => {
  const formattedDueDate = dueDate.toLocaleDateString();
  const badgeVariant = getBadgeVariant(status);
  const statusText = {
    active: "Activo",
    overdue: "Vencido",
    returned: "Devuelto",
  }[status];

  return (
    <button
      onClick={onClick}
      disabled={!onClick} // Disable button styles if no onClick is provided
      className={`flex w-full items-center justify-between rounded-lg border border-neutral-100 bg-paper p-4 shadow-subtle transition-shadow duration-smooth hover:shadow-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-default disabled:hover:shadow-subtle ${className}`}
    >
      {/* Book Info */}
      <div className="text-left">
        <p className="truncate font-semibold text-neutral-900">{bookTitle}</p>
        <p className="text-sm text-neutral-500">
          Fecha de devolución: {formattedDueDate}
        </p>
      </div>

      {/* Status Badge */}
      <Badge variant={badgeVariant}>{statusText}</Badge>
    </button>
  );
};

export default LoanStatusCard;
