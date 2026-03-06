import type { Reservation } from "app-domain/entities/Reservation";
import { useState, useEffect } from "react";

export const useReservations = (
  status?: "PENDING" | "EXPIRED" | "CANCELLED" | "FULFILLED",
) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredReservations = reservations;
      if (status) {
        filteredReservations = reservations.filter(
          (res) => res.status === status,
        );
      }
      setReservations(filteredReservations);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [reservations, status]);

  return { reservations, isLoading };
};
