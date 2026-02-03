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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Libro
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Género
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Reserva
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {reservation.bookTitle}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {reservation.bookGenre || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {reservation.userName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {reservation.reservedAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    reservation.status === "active"
                      ? "bg-blue-100 text-blue-800"
                      : reservation.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {reservation.status === "active"
                    ? "Activa"
                    : reservation.status === "cancelled"
                      ? "Cancelada"
                      : "Cumplida"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {reservation.status === "active" && onCancelReservation && (
                  <button
                    onClick={() => onCancelReservation(reservation.id)}
                    className="text-indigo-600 hover:text-indigo-900"
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
