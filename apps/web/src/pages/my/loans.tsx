import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { apiClient } from "../../utils/api-client";
import { useAuth } from "../../application/hooks/useAuth";
import Button from "../../components/Button";
import LoansTable from "../../components/Table/LoansTable";

const MyLoansPage = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient.call<any[]>(`loans/user/${user.id}`);
        if (res && typeof res === "object" && "error" in (res as any)) {
          console.error("Error fetching loans:", (res as any).error);
          setLoans([]);
        } else {
          const mappedLoans = (res as any[]).map((loan: any) => ({
            id: loan.id,
            bookTitle: loan.book?.title || "Título desconocido",
            bookGenre: loan.book?.genre || "Género desconocido",
            borrowerName: loan.user?.name || "Usuario desconocido",
            loanDate: new Date(loan.loanDate).toLocaleDateString(),
            returnDate: loan.returnDate
              ? new Date(loan.returnDate).toLocaleDateString()
              : "No devuelto",
            status: loan.status === "active" ? "active" : "returned",
          }));
          setLoans(mappedLoans);
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

  const handleReturnLoan = async (loanId: string) => {
    try {
      const res = await apiClient.call(`loans/${loanId}/return`, {
        _method: "PUT",
      });

      if (res && typeof res === "object" && "error" in (res as any)) {
        alert(`Error al devolver el préstamo: ${(res as any).error}`);
      } else {
        // Actualizar el estado local removiendo el préstamo devuelto
        setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== loanId));
        alert("Préstamo devuelto exitosamente!");
      }
    } catch (error) {
      console.error("Error returning loan:", error);
      alert("Error al devolver el préstamo. Inténtalo de nuevo.");
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo";
      case "returned":
        return "Devuelto";
      default:
        return status;
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-3xl w-3xl border-b-2 border-primary mx-auto mb-lg"></div>
            <p className="text-body-md text-neutral-600">
              Cargando tus préstamos...
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
            Mis préstamos
          </h1>
          <p className="text-body-md text-neutral-600 mt-sm">
            Gestiona tus préstamos de libros y fechas de devolución
          </p>
        </header>

        {loans.length === 0 ? (
          <div className="text-center py-3xl">
            <div className="text-6xl mb-lg">📚</div>
            <h3 className="text-heading-md font-medium text-neutral-900 mb-md">
              No tienes préstamos activos
            </h3>
            <p className="text-body-md text-neutral-600 mb-xl">
              Cuando tomes prestados libros, aparecerán aquí.
            </p>
            <Button
              onClick={() => (window.location.href = "/books")}
              className="!bg-primary !text-primary-foreground hover:!bg-primary/90 !shadow-subtle hover:!shadow-medium transition-all duration-200"
            >
              Explorar catálogo
            </Button>
          </div>
        ) : (
          <LoansTable
            loans={loans.map((loan) => ({
              id: loan.id,
              bookTitle: loan.book.title,
              bookGenre: loan.book.category?.name || "N/A",
              borrowerName: `${loan.borrower.firstName} ${loan.borrower.lastName}`,
              loanDate: formatDate(loan.loanDate),
              returnDate: formatDate(loan.returnDate),
              status: loan.status,
              statusText: getStatusText(loan.status),
            }))}
            onReturnLoan={handleReturnLoan}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default MyLoansPage;
