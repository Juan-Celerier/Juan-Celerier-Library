import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { apiClient } from "../../utils/api-client";
import { useAuth } from "../../application/hooks/useAuth";
import { Badge } from "../../ui/Badge";
import Button from "../../components/Button";
import { Modal } from "../../components/Modal/modal";

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
  const [cancellingReservationId, setCancellingReservationId] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient.call<ReservationWithBook[]>(`reservations/user/${user.id}`);
        if (res && typeof res === "object" && "error" in (res as any)) {
          console.error("Error fetching reservations:", (res as any).error);
          setReservations([]);
        } else {
          const mappedReservations = (res as any[]).map((reservation: any) => ({
            id: reservation.id,
            bookTitle: reservation.book?.title || "Título desconocido",
            bookGenre: reservation.book?.genre || "Género desconocido",
            userName: reservation.user?.name || "Usuario desconocido",
            reservationDate: new Date(reservation.reservationDate),
            expirationDate: new Date(reservation.expirationDate),
            status: reservation.status as "PENDING" | "EXPIRED" | "CANCELLED" | "FULFILLED",
            book: reservation.book,
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
        setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== reservationId));
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
    const diffDays = Math.ceil((new Date(expirationDate).getTime() - today.getTime()) / oneDay);
    return diffDays;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-[420px] items-center justify-center">
          <div className="rounded-[32px] border border-neutral-200 bg-white p-14 text-center shadow-sm">
            <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 text-primary">
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-lg font-semibold text-neutral-900">Cargando tus reservas...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-10">
        <section className="rounded-[32px] border border-neutral-200 bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Cuenta</p>
              <h1 className="mt-3 text-3xl font-bold text-neutral-900">Mis reservas</h1>
              <p className="mt-3 text-body-md text-gray-600">Gestiona tus reservas de libros y fechas de expiración.</p>
            </div>
            <Button
              onClick={() => (window.location.href = "/books")}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Explorar catálogo
            </Button>
          </div>
        </section>

        {reservations.length === 0 ? (
          <section className="rounded-[32px] border border-neutral-200 bg-white p-14 shadow-sm text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl">
              📅
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-3">No tienes reservas activas</h2>
            <p className="mx-auto max-w-xl text-gray-600 leading-7 mb-8">
              Cuando reserves libros que no estén disponibles, aparecerán aquí.
            </p>
            <Button
              onClick={() => (window.location.href = "/books")}
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Explorar catálogo
            </Button>
          </section>
        ) : (
          <div className="grid gap-6">
            {reservations.map((reservation) => {
              const expired = isExpired(reservation.expirationDate, reservation.status);
              const daysUntilExpiration = reservation.status === "PENDING" ? getDaysUntilExpiration(reservation.expirationDate) : null;

              return (
                <div
                  key={reservation.id}
                  className={`bg-white rounded-[28px] border p-6 shadow-sm ${expired ? "border-error bg-error/5" : "border-neutral-200"}`}
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                    <div className="h-44 w-32 flex-shrink-0 overflow-hidden rounded-3xl bg-neutral-100">
                      <img
                        src={
                          reservation.book.imageUrl ||
                          "https://via.placeholder.com/120x160?text=Sin+imagen"
                        }
                        alt={reservation.book.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-900">{reservation.book.title}</h3>
                          <p className="mt-2 text-sm text-gray-600">
                            por {reservation.book.author?.name || (reservation.book.author?.firstName && reservation.book.author?.lastName ? `${reservation.book.author.firstName} ${reservation.book.author.lastName}` : "Autor desconocido")}
                          </p>
                        </div>
                        <div className="space-y-2 text-right">
                          <Badge variant={getStatusBadgeVariant(reservation.status)}>{getStatusText(reservation.status)}</Badge>
                          {reservation.status === "PENDING" && daysUntilExpiration !== null && (
                            <p className="text-sm text-gray-500">{daysUntilExpiration} día{daysUntilExpiration !== 1 ? "s" : ""} restantes</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-gray-600">
                        <div>
                          <p className="font-semibold text-neutral-900">Reserva</p>
                          <p className="mt-1">{formatDate(reservation.reservationDate)}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">Expira</p>
                          <p className="mt-1">{formatDate(reservation.expirationDate)}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {reservation.status === "PENDING" && (
                          <>
                            <Button
                              onClick={() => openCancelModal(reservation)}
                              disabled={cancellingReservationId === reservation.id}
                              className={`rounded-full px-5 py-3 text-sm font-medium transition ${expired ? "bg-error text-white hover:bg-error/90" : "bg-neutral-600 text-white hover:bg-neutral-700"}`}
                            >
                              {cancellingReservationId === reservation.id ? "Cancelando..." : "Cancelar reserva"}
                            </Button>
                            <Button
                              onClick={handleReservationCreated}
                              className="rounded-full bg-success px-5 py-3 text-sm font-medium text-white hover:bg-success/90"
                            >
                              Refrescar
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Modal isOpen={showCancelModal} onClose={() => setShowCancelModal(false)} title="Cancelar reserva">
          <div className="space-y-6">
            {selectedReservation && (
              <>
                <p className="text-body-md text-neutral-700">
                  ¿Estás seguro de que quieres cancelar la reserva del libro <strong>"{selectedReservation.book.title}"</strong>?
                </p>

                <div className="rounded-[24px] border border-warning/30 bg-warning/5 p-6">
                  <p className="text-body-sm text-warning">
                    Una vez cancelada la reserva, perderás tu lugar en la cola para este libro. Si deseas reservarlo nuevamente, tendrás que esperar a que vuelva a estar disponible.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button onClick={() => setShowCancelModal(false)} className="rounded-full bg-neutral-500 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-600">
                    Mantener reserva
                  </Button>
                  <Button
                    onClick={() => handleCancelReservation(selectedReservation.id)}
                    disabled={cancellingReservationId === selectedReservation.id}
                    className="rounded-full bg-error px-5 py-3 text-sm font-medium text-white hover:bg-error/90 disabled:opacity-50"
                  >
                    {cancellingReservationId === selectedReservation.id ? "Cancelando..." : "Confirmar cancelación"}
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
