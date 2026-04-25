import React from "react";

interface Reservation {
  id: string;
  bookTitle: string;
  bookGenre: string;
  userName: string;
  reservedAt: string;
  status: "active" | "cancelled" | "fulfilled";
}

interface ReservationsTableProps {
  reservations: Reservation[];
  onCancelReservation?: (reservationId: string) => void;
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservations,
  onCancelReservation,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-subtle border border-neutral-200 overflow-hidden transition-all duration-200 hover:shadow-medium">
      <table className="w-full">
        <thead className="bg-neutral-100 border-b border-neutral-200">
          <tr>
            <th className="px-lg py-md text-left text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Libro
            </th>
            <th className="px-lg py-md text-left text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Género
            </th>
            <th className="px-lg py-md text-left text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Usuario
            </th>
            <th className="px-lg py-md text-left text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Fecha Reserva
            </th>
            <th className="px-lg py-md text-left text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-lg py-md text-left text-caption font-semibold text-neutral-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {reservations.map((reservation) => (
            <tr
              key={reservation.id}
              className="hover:bg-neutral-50 transition-colors duration-150"
            >
              <td className="px-lg py-md font-medium text-neutral-900 text-body-sm">
                {reservation.bookTitle}
              </td>
              <td className="px-lg py-md text-neutral-600 text-body-sm">
                {reservation.bookGenre || "N/A"}
              </td>
              <td className="px-lg py-md text-neutral-600 text-body-sm">
                {reservation.userName}
              </td>
              <td className="px-lg py-md text-neutral-600 text-body-sm">
                {reservation.reservedAt}
              </td>
              <td className="px-lg py-md">
                <span
                  className={`px-md py-xs caption font-semibold rounded-base inline-block transition-all duration-200 ${
                    reservation.status === "active"
                      ? "bg-info/20 text-info"
                      : reservation.status === "cancelled"
                        ? "bg-error/20 text-error"
                        : "bg-success/20 text-success"
                  }`}
                >
                  {reservation.status === "active"
                    ? "Activa"
                    : reservation.status === "cancelled"
                      ? "Cancelada"
                      : "Cumplida"}
                </span>
              </td>
              <td className="px-lg py-md font-medium">
                {reservation.status === "active" && onCancelReservation && (
                  <button
                    onClick={() => onCancelReservation(reservation.id)}
                    className="text-error hover:text-error/80 transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-1 rounded-base px-sm py-xs text-body-sm"
                  >
                    Cancelar
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

export default ReservationsTable;
