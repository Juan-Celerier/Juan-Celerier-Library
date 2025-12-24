import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { apiClient } from "../../utils/api-client";
import { useAuth } from "../../application/hooks/useAuth";
import type { Reservation } from "app-domain/entities/Reservation";

const MyReservationsPage = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user?.id) return;

      const res = await apiClient.call<Reservation[]>(
        `reservations/user/${user.id}`
      );
      if (res && typeof res === "object" && "error" in (res as any)) {
        setReservations([]);
      } else {
        setReservations(res as Reservation[]);
      }
      setLoading(false);
    };

    fetchReservations();
  }, [user?.id]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Mis reservas</h1>
        </header>

        <div className="space-y-4">
          {reservations.length === 0 ? (
            <p>No tienes reservas activas.</p>
          ) : (
            reservations.map((reservation) => (
              <div key={reservation.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">
                  Libro ID: {reservation.bookId}
                </h3>
                <p>
                  Fecha de reserva:{" "}
                  {reservation.reservationDate.toLocaleDateString()}
                </p>
                <p>
                  Fecha de expiración:{" "}
                  {reservation.expirationDate.toLocaleDateString()}
                </p>
                <p>Estado: {reservation.status}</p>
                <button className="mt-2 bg-red-600 text-white px-3 py-1 rounded">
                  Cancelar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyReservationsPage;
