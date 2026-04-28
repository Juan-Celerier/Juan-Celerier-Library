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
            loanDate: loan.loanDate ? new Date(loan.loanDate) : undefined,
            returnDate: loan.returnDate ? new Date(loan.returnDate) : undefined,
            status: loan.status === "active" ? "Activo" : "Devuelto",
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
        setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== loanId));
        alert("Préstamo devuelto exitosamente!");
      }
    } catch (error) {
      console.error("Error returning loan:", error);
      alert("Error al devolver el préstamo. Inténtalo de nuevo.");
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
        <div className="flex min-h-[420px] items-center justify-center">
          <div className="rounded-[32px] border border-neutral-200 bg-white p-14 text-center shadow-sm">
            <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 text-primary">
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-lg font-semibold text-neutral-900">
              Cargando tus préstamos...
            </p>
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Cuenta
              </p>
              <h1 className="mt-3 text-3xl font-bold text-neutral-900">
                Mis préstamos
              </h1>
              <p className="mt-3 text-body-md text-gray-600">
                Administra los libros que tienes prestados y verifica sus fechas
                de devolución.
              </p>
            </div>
            <Button
              onClick={() => (window.location.href = "/books")}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Explorar catálogo
            </Button>
          </div>
        </section>

        {loans.length === 0 ? (
          <section className="rounded-[32px] border border-neutral-200 bg-white p-14 shadow-sm text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl">
              📚
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
              No tienes préstamos activos
            </h2>
            <p className="mx-auto max-w-xl text-gray-600 leading-7 mb-8">
              Cuando tomes prestados libros, los verás aquí con todas las fechas
              de devolución y opciones disponibles.
            </p>
            <Button
              onClick={() => (window.location.href = "/books")}
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Ir al catálogo
            </Button>
          </section>
        ) : (
          <section className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-sm">
            <LoansTable
              loans={loans.map((loan) => ({
                id: loan.id,
                bookTitle: loan.bookTitle,
                bookGenre: loan.bookGenre,
                borrowerName: loan.borrowerName,
                loanDate: loan.loanDate
                  ? formatDate(loan.loanDate)
                  : "Fecha desconocida",
                returnDate: loan.returnDate
                  ? formatDate(loan.returnDate)
                  : "No devuelto",
                status: loan.status,
                statusText: loan.status,
              }))}
              onReturnLoan={handleReturnLoan}
            />
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default MyLoansPage;
