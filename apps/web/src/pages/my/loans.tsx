import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { apiClient } from "../../utils/api-client";
import { useAuth } from "../../application/hooks/useAuth";
import { Badge } from "../../ui/Badge";
import Button from "../../components/Button";
import { Modal } from "../../components/Modal/modal";

// Extender el tipo Loan para incluir la información del libro
interface LoanWithBook {
  id: string;
  bookId: string;
  borrowerId: string;
  loanDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "active" | "returned" | "overdue";
  fineAmount?: number;
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

const MyLoansPage = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState<LoanWithBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningLoanId, setReturningLoanId] = useState<string | null>(null);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<LoanWithBook | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient.call<LoanWithBook[]>(
          `loans/user/${user.id}`
        );
        if (res && typeof res === "object" && "error" in (res as any)) {
          console.error("Error fetching loans:", (res as any).error);
          setLoans([]);
        } else {
          setLoans(res as LoanWithBook[]);
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user?.id]);

  const handleReturnBook = async (loanId: string) => {
    setReturningLoanId(loanId);
    try {
      // Actualizar el préstamo con la fecha de devolución actual
      const returnDate = new Date().toISOString();
      const res = await apiClient.call(`loans/${loanId}`, {
        returnDate: returnDate,
        _method: "PUT",
      });

      if (res && typeof res === "object" && "error" in (res as any)) {
        alert(`Error al devolver el libro: ${(res as any).error}`);
      } else {
        // Actualizar el estado local
        setLoans((prevLoans) =>
          prevLoans.map((loan) =>
            loan.id === loanId
              ? { ...loan, status: "returned" as const, returnDate: new Date() }
              : loan
          )
        );
        alert("Libro devuelto exitosamente!");
      }
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Error al devolver el libro. Inténtalo de nuevo.");
    } finally {
      setReturningLoanId(null);
      setShowReturnModal(false);
      setSelectedLoan(null);
    }
  };

  const openReturnModal = (loan: LoanWithBook) => {
    setSelectedLoan(loan);
    setShowReturnModal(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "primary";
      case "overdue":
        return "destructive";
      case "returned":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo";
      case "overdue":
        return "Vencido";
      case "returned":
        return "Devuelto";
      default:
        return status;
    }
  };

  const isOverdue = (dueDate: Date, status: string) => {
    return status === "active" && new Date() > dueDate;
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando tus préstamos...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Mis préstamos</h1>
          <p className="text-gray-600 mt-1">
            Gestiona tus libros prestados y fechas de devolución
          </p>
        </header>

        {loans.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tienes préstamos activos
            </h3>
            <p className="text-gray-600 mb-6">
              Cuando prestes libros de la biblioteca, aparecerán aquí.
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
            {loans.map((loan) => {
              const overdue = isOverdue(loan.dueDate, loan.status);
              const daysUntilDue =
                loan.status === "active" ? getDaysUntilDue(loan.dueDate) : null;

              return (
                <div
                  key={loan.id}
                  className={`bg-white rounded-lg shadow-sm border p-6 ${
                    overdue ? "border-red-200 bg-red-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Imagen del libro */}
                    <div className="flex-shrink-0">
                      <img
                        src={
                          loan.book.imageUrl ||
                          "https://via.placeholder.com/120x160?text=Sin+imagen"
                        }
                        alt={loan.book.title}
                        className="w-20 h-28 object-cover rounded-lg shadow-sm"
                      />
                    </div>

                    {/* Información del libro */}
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {loan.book.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            por{" "}
                            {loan.book.author?.name ||
                              (loan.book.author?.firstName &&
                              loan.book.author?.lastName
                                ? `${loan.book.author.firstName} ${loan.book.author.lastName}`
                                : "Autor desconocido")}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">
                                Fecha de préstamo:
                              </span>
                              <br />
                              {formatDate(loan.loanDate)}
                            </div>
                            <div>
                              <span className="font-medium">
                                Fecha de devolución:
                              </span>
                              <br />
                              {loan.returnDate
                                ? formatDate(loan.returnDate)
                                : formatDate(loan.dueDate)}
                            </div>
                            {daysUntilDue !== null && daysUntilDue > 0 && (
                              <div>
                                <span className="font-medium">
                                  Días restantes:
                                </span>
                                <br />
                                <span
                                  className={
                                    daysUntilDue <= 3
                                      ? "text-orange-600 font-semibold"
                                      : ""
                                  }
                                >
                                  {daysUntilDue} día
                                  {daysUntilDue !== 1 ? "s" : ""}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Estado y acciones */}
                        <div className="flex flex-col items-start lg:items-end gap-3">
                          <Badge variant={getStatusBadgeVariant(loan.status)}>
                            {getStatusText(loan.status)}
                          </Badge>

                          {loan.fineAmount && loan.fineAmount > 0 && (
                            <div className="text-red-600 font-medium">
                              Multa: ${loan.fineAmount}
                            </div>
                          )}

                          {loan.status === "active" && (
                            <Button
                              onClick={() => openReturnModal(loan)}
                              disabled={returningLoanId === loan.id}
                              className={`!px-4 !py-2 !text-sm !font-medium !rounded-md !transition-colors ${
                                overdue
                                  ? "!bg-red-600 !text-white hover:!bg-red-700"
                                  : "!bg-emerald-600 !text-white hover:!bg-emerald-700"
                              } disabled:!opacity-50`}
                            >
                              {returningLoanId === loan.id
                                ? "Devolviendo..."
                                : "Devolver libro"}
                            </Button>
                          )}

                          {loan.status === "returned" && (
                            <div className="text-green-600 font-medium flex items-center gap-2">
                              ✅ Devuelto
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

        {/* Modal de confirmación de devolución */}
        <Modal
          isOpen={showReturnModal}
          onClose={() => setShowReturnModal(false)}
          title="Confirmar devolución"
        >
          <div className="space-y-4">
            {selectedLoan && (
              <>
                <p className="text-gray-700">
                  ¿Estás seguro de que quieres devolver el libro
                  <strong> "{selectedLoan.book.title}"</strong>?
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Una vez devuelto, el libro estará disponible para otros
                    usuarios. Si tienes alguna multa pendiente, deberás pagarla
                    antes de poder realizar nuevos préstamos.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setShowReturnModal(false)}
                    className="!bg-gray-500 !text-white hover:!bg-gray-600"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => handleReturnBook(selectedLoan.id)}
                    disabled={returningLoanId === selectedLoan.id}
                    className="!bg-emerald-600 !text-white hover:!bg-emerald-700 disabled:!opacity-50"
                  >
                    {returningLoanId === selectedLoan.id
                      ? "Devolviendo..."
                      : "Confirmar devolución"}
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

export default MyLoansPage;
