import React from "react";

interface Loan {
  id: string;
  bookTitle: string;
  bookGenre: string;
  borrowerName: string;
  loanDate: string;
  returnDate: string;
  status: "active" | "returned";
}

interface LoansTableProps {
  loans: Loan[];
  onReturnLoan?: (loanId: string) => void;
}

const LoansTable: React.FC<LoansTableProps> = ({ loans, onReturnLoan }) => {
  return (
    <div className="bg-white rounded-lg shadow-subtle border border-neutral-200 overflow-hidden transition-all duration-200 hover:shadow-medium">
      <table className="w-full text-left">
        <thead className="bg-neutral-100 border-b border-neutral-200">
          <tr>
            <th className="px-lg py-md text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Libro
            </th>
            <th className="px-lg py-md text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Prestatario
            </th>
            <th className="px-lg py-md text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Fecha Prestamo
            </th>
            <th className="px-lg py-md text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Fecha Devolucion
            </th>
            <th className="px-lg py-md text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-lg py-md text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {loans.map((loan) => (
            <tr
              key={loan.id}
              className="hover:bg-neutral-50 transition-colors duration-150"
            >
              <td className="px-lg py-md font-medium text-neutral-900 text-body-sm">
                {loan.bookTitle}
              </td>
              <td className="px-lg py-md text-neutral-600 text-body-sm">
                {loan.borrowerName}
              </td>
              <td className="px-lg py-md text-neutral-600 text-body-sm">
                {loan.loanDate}
              </td>
              <td className="px-lg py-md text-neutral-600 text-body-sm">
                {loan.returnDate}
              </td>
              <td className="px-lg py-md">
                <span
                  className={`px-md py-xs caption font-semibold rounded-base inline-block transition-all duration-200 ${
                    loan.status === "active"
                      ? "bg-info/20 text-info"
                      : "bg-success/20 text-success"
                  }`}
                >
                  {loan.status === "active" ? "Activo" : "Devuelto"}
                </span>
              </td>
              <td className="px-lg py-md text-body-sm font-medium">
                {loan.status === "active" && onReturnLoan && (
                  <button
                    onClick={() => onReturnLoan(loan.id)}
                    className="text-primary hover:text-primary/80 transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-base px-sm py-xs"
                  >
                    Devolver
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoansTable;
