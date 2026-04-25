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
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingReservationId, setCancellingReservationId] = useState<
    string | null
  >(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any | null>(
    null,
  );

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient.call<ReservationWithBook[]>(
          `reservations/user/${user.id}`,
        );
        if (res && typeof res === "object" && "error" in (res as any)) {
          console.error("Error fetching reservations:", (res as any).error);
          setReservations([]);
        } else {
          const mappedReservations = (res as any[]).map((reservation: any) => ({
            id: reservation.id,
            bookTitle: reservation.book?.title || "Título desconocido",
            bookGenre: reservation.book?.genre || "Género desconocido",
            userName: reservation.user?.name || "Usuario desconocido",
            reservedAt: new Date(
              reservation.reservationDate,
            ).toLocaleDateString(),
            status: reservation.status.toLowerCase() as
              | "active"
              | "cancelled"
              | "fulfilled",
          }));
          setReservations(mappedReservations);
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

  const handleReservationCreated = async () => {
    // Refrescar la lista de reservas después de crear una nueva
    setReservations((prevReservations) => [...prevReservations]);
  };

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
            (reservation) => reservation.id !== reservationId,
          ),
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

  const getDaysUntilExpiration = (expirationDate: Date): number => {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.ceil(
      (new Date(expirationDate).getTime() - today.getTime()) / oneDay,
    );
    return diffDays;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-3xl w-3xl border-b-2 border-primary mx-auto mb-lg"></div>
            <p className="text-body-md text-neutral-600">
              Cargando tus reservas...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-xl">
        <header>
          <h1 className="text-heading-lg font-bold text-neutral-900">
            Mis reservas
          </h1>
          <p className="text-body-md text-neutral-600 mt-sm">
            Gestiona tus reservas de libros y fechas de expiración
          </p>
        </header>

        {reservations.length === 0 ? (
          <div className="text-center py-3xl">
            <div className="text-6xl mb-lg">📅</div>
            <h3 className="text-heading-md font-medium text-neutral-900 mb-md">
              No tienes reservas activas
            </h3>
            <p className="text-body-md text-neutral-600 mb-xl">
              Cuando reserves libros que no estén disponibles, aparecerán aquí.
            </p>
            <Button
              onClick={() => (window.location.href = "/books")}
              className="!bg-primary !text-primary-foreground hover:!bg-primary/90 !shadow-subtle hover:!shadow-medium transition-all duration-200"
            >
              Explorar catálogo
            </Button>
          </div>
        ) : (
          <div className="grid gap-lg">
            {reservations.map((reservation) => {
              const expired = isExpired(
                reservation.expirationDate,
                reservation.status,
              );
              const daysUntilExpiration =
                reservation.status === "PENDING"
                  ? getDaysUntilExpiration(reservation.expirationDate)
                  : null;

              return (
                <div
                  key={reservation.id}
                  className={`bg-white rounded-lg shadow-subtle border px-lg py-lg ${
                    expired ? "border-error bg-error/5" : "border-neutral-200"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-xl">
                    {/* Imagen del libro */}
                    <div className="flex-shrink-0">
                      <img
                        src={
                          reservation.book.imageUrl ||
                          "https://via.placeholder.com/120x160?text=Sin+imagen"
                        }
                        alt={reservation.book.title}
                        className="w-xl h-4xl object-cover rounded-base shadow-subtle"
                      />
                    </div>

                    {/* Información del libro */}
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-lg">
                        <div>
                          <h3 className="text-heading-md font-semibold text-neutral-900 mb-sm">
                            {reservation.book.title}
                          </h3>
                          <p className="text-body-md text-neutral-600 mb-lg">
                            por{" "}
                            {reservation.book.author?.name ||
                              (reservation.book.author?.firstName &&
                              reservation.book.author?.lastName
                                ? `${reservation.book.author.firstName} ${reservation.book.author.lastName}`
                                : "Autor desconocido")}
                          </p>

                          <div className="flex flex-wrap gap-lg text-body-sm text-neutral-600">
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
                                        ? "text-warning font-semibold"
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
                        <div className="flex flex-col items-start lg:items-end gap-md">
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
                              className={`!px-md !py-sm !text-body-sm !font-medium !rounded-base !transition-colors ${
                                expired
                                  ? "!bg-error !text-white hover:!bg-error/90"
                                  : "!bg-neutral-600 !text-white hover:!bg-neutral-700"
                              } disabled:!opacity-50`}
                            >
                              {cancellingReservationId === reservation.id
                                ? "Cancelando..."
                                : "Cancelar reserva"}
                            </Button>
                          )}

                          {reservation.status === "PENDING" && (
                            <Button
                              onClick={() => handleReservationCreated()}
                              className="!px-md !py-sm !text-body-sm !font-medium !rounded-base !transition-colors !bg-success !text-white hover:!bg-success/90"
                            >
                              Refrescar
                            </Button>
                          )}

                          {reservation.status === "EXPIRED" && (
                            <div className="text-error font-medium flex items-center gap-sm">
                              ⏰ Expirada
                            </div>
                          )}

                          {reservation.status === "CANCELLED" && (
                            <div className="text-neutral-600 font-medium flex items-center gap-sm">
                              ❌ Cancelada
                            </div>
                          )}

                          {reservation.status === "FULFILLED" && (
                            <div className="text-success font-medium flex items-center gap-sm">
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
          <div className="space-y-lg">
            {selectedReservation && (
              <>
                <p className="text-body-md text-neutral-700">
                  ¿Estás seguro de que quieres cancelar la reserva del libro
                  <strong> "{selectedReservation.book.title}"</strong>?
                </p>

                <div className="bg-warning/5 px-lg py-lg rounded-base border border-warning/30">
                  <p className="text-body-sm text-warning">
                    Una vez cancelada la reserva, perderás tu lugar en la cola
                    para este libro. Si deseas reservarlo nuevamente, tendrás
                    que esperar a que vuelva a estar disponible.
                  </p>
                </div>

                <div className="flex justify-end gap-lg">
                  <Button
                    onClick={() => setShowCancelModal(false)}
                    className="!bg-neutral-500 !text-white hover:!bg-neutral-600 transition-all duration-200"
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
                    className="!bg-error !text-white hover:!bg-error/90 disabled:!opacity-50 transition-all duration-200"
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
