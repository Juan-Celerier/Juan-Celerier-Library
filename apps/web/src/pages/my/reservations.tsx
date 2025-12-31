import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { apiClient } from "../../utils/api-client";
import { useAuth } from "../../application/hooks/useAuth";
import { Badge } from "../../ui/Badge";
import Button from "../../components/Button";
import { Modal } from "../../components/Modal/modal";

// Extender el tipo Reservation para incluir la información del libro
interface ReservationWithBook {
  id: string;
  bookId: string;
  borrowerId: string;
  reservationDate: Date;
  expirationDate: Date;
  status: "PENDING" | "EXPIRED" | "CANCELLED" | "FULFILLED";
  createdAt: Date;
  book: {
    id: string;
    title: string;
    imageUrl?: string;
    author?: {
      name: string;
      firstName?: string;
      lastName?: string;
    };
  };
}

const MyReservationsPage = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<ReservationWithBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingReservationId, setCancellingReservationId] = useState<
    string | null
  >(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationWithBook | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient.call<ReservationWithBook[]>(
          `reservations/user/${user.id}`
        );
        if (res && typeof res === "object" && "error" in (res as any)) {
          console.error("Error fetching reservations:", (res as any).error);
          setReservations([]);
        } else {
          setReservations(res as ReservationWithBook[]);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user?.id]);

  const handleCancelReservation = async (reservationId: string) => {
    setCancellingReservationId(reservationId);
    try {
      const res = await apiClient.call(`reservations/${reservationId}`, {
        _method: "DELETE",
      });

      if (res && typeof res === "object" && "error" in (res as any)) {
        alert(`Error al cancelar la reserva: ${(res as any).error}`);
      } else {
        // Actualizar el estado local removiendo la reserva cancelada
        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation.id !== reservationId
          )
        );
        alert("Reserva cancelada exitosamente!");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      alert("Error al cancelar la reserva. Inténtalo de nuevo.");
    } finally {
      setCancellingReservationId(null);
      setShowCancelModal(false);
      setSelectedReservation(null);
    }
  };

  const openCancelModal = (reservation: ReservationWithBook) => {
    setSelectedReservation(reservation);
    setShowCancelModal(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "PENDING":
        return "primary";
      case "EXPIRED":
        return "destructive";
      case "CANCELLED":
        return "secondary";
      case "FULFILLED":
        return "success";
      default:
        return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendiente";
      case "EXPIRED":
        return "Expirada";
      case "CANCELLED":
        return "Cancelada";
      case "FULFILLED":
        return "Cumplida";
      default:
        return status;
    }
  };

  const isExpired = (expirationDate: Date, status: string) => {
    return status === "PENDING" && new Date() > expirationDate;
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysUntilExpiration = (expirationDate: Date) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const diffTime = expiration.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando tus reservas...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Mis reservas</h1>
          <p className="text-gray-600 mt-1">
            Gestiona tus reservas de libros y fechas de expiración
          </p>
        </header>

        {reservations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tienes reservas activas
            </h3>
            <p className="text-gray-600 mb-6">
              Cuando reserves libros que no estén disponibles, aparecerán aquí.
            </p>
            <Button
              onClick={() => (window.location.href = "/books")}
              className="!bg-emerald-600 !text-white hover:!bg-emerald-700"
            >
              Explorar catálogo
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {reservations.map((reservation) => {
              const expired = isExpired(
                reservation.expirationDate,
                reservation.status
              );
              const daysUntilExpiration =
                reservation.status === "PENDING"
                  ? getDaysUntilExpiration(reservation.expirationDate)
                  : null;

              return (
                <div
                  key={reservation.id}
                  className={`bg-white rounded-lg shadow-sm border p-6 ${
                    expired ? "border-red-200 bg-red-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Imagen del libro */}
                    <div className="flex-shrink-0">
                      <img
                        src={
                          reservation.book.imageUrl ||
                          "https://via.placeholder.com/120x160?text=Sin+imagen"
                        }
                        alt={reservation.book.title}
                        className="w-20 h-28 object-cover rounded-lg shadow-sm"
                      />
                    </div>

                    {/* Información del libro */}
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {reservation.book.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            por{" "}
                            {reservation.book.author?.name ||
                              (reservation.book.author?.firstName &&
                              reservation.book.author?.lastName
                                ? `${reservation.book.author.firstName} ${reservation.book.author.lastName}`
                                : "Autor desconocido")}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">
                                Fecha de reserva:
                              </span>
                              <br />
                              {formatDate(reservation.reservationDate)}
                            </div>
                            <div>
                              <span className="font-medium">
                                Fecha de expiración:
                              </span>
                              <br />
                              {formatDate(reservation.expirationDate)}
                            </div>
                            {daysUntilExpiration !== null &&
                              daysUntilExpiration > 0 && (
                                <div>
                                  <span className="font-medium">
                                    Días restantes:
                                  </span>
                                  <br />
                                  <span
                                    className={
                                      daysUntilExpiration <= 2
                                        ? "text-orange-600 font-semibold"
                                        : ""
                                    }
                                  >
                                    {daysUntilExpiration} día
                                    {daysUntilExpiration !== 1 ? "s" : ""}
                                  </span>
                                </div>
                              )}
                          </div>
                        </div>

                        {/* Estado y acciones */}
                        <div className="flex flex-col items-start lg:items-end gap-3">
                          <Badge
                            variant={getStatusBadgeVariant(reservation.status)}
                          >
                            {getStatusText(reservation.status)}
                          </Badge>

                          {reservation.status === "PENDING" && (
                            <Button
                              onClick={() => openCancelModal(reservation)}
                              disabled={
                                cancellingReservationId === reservation.id
                              }
                              className={`!px-4 !py-2 !text-sm !font-medium !rounded-md !transition-colors ${
                                expired
                                  ? "!bg-red-600 !text-white hover:!bg-red-700"
                                  : "!bg-gray-600 !text-white hover:!bg-gray-700"
                              } disabled:!opacity-50`}
                            >
                              {cancellingReservationId === reservation.id
                                ? "Cancelando..."
                                : "Cancelar reserva"}
                            </Button>
                          )}

                          {reservation.status === "EXPIRED" && (
                            <div className="text-red-600 font-medium flex items-center gap-2">
                              ⏰ Expirada
                            </div>
                          )}

                          {reservation.status === "CANCELLED" && (
                            <div className="text-gray-600 font-medium flex items-center gap-2">
                              ❌ Cancelada
                            </div>
                          )}

                          {reservation.status === "FULFILLED" && (
                            <div className="text-green-600 font-medium flex items-center gap-2">
                              ✅ Cumplida
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal de confirmación de cancelación */}
        <Modal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          title="Cancelar reserva"
        >
          <div className="space-y-4">
            {selectedReservation && (
              <>
                <p className="text-gray-700">
                  ¿Estás seguro de que quieres cancelar la reserva del libro
                  <strong> "{selectedReservation.book.title}"</strong>?
                </p>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    Una vez cancelada la reserva, perderás tu lugar en la cola
                    para este libro. Si deseas reservarlo nuevamente, tendrás
                    que esperar a que vuelva a estar disponible.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setShowCancelModal(false)}
                    className="!bg-gray-500 !text-white hover:!bg-gray-600"
                  >
                    Mantener reserva
                  </Button>
                  <Button
                    onClick={() =>
                      handleCancelReservation(selectedReservation.id)
                    }
                    disabled={
                      cancellingReservationId === selectedReservation.id
                    }
                    className="!bg-red-600 !text-white hover:!bg-red-700 disabled:!opacity-50"
                  >
                    {cancellingReservationId === selectedReservation.id
                      ? "Cancelando..."
                      : "Confirmar cancelación"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default MyReservationsPage;
