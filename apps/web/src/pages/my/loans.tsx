import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { apiClient } from "../../utils/api-client";
import { useAuth } from "../../application/hooks/useAuth";
import type { Loan } from "app-domain/entities/Loan";

const MyLoansPage = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      if (!user?.id) return;

      const res = await apiClient.call<Loan[]>(`loans/user/${user.id}`);
      if (res && typeof res === "object" && "error" in (res as any)) {
        setLoans([]);
      } else {
        setLoans(res as Loan[]);
      }
      setLoading(false);
    };

    fetchLoans();
  }, [user?.id]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Mis préstamos</h1>
        </header>

        <div className="space-y-4">
          {loans.length === 0 ? (
            <p>No tienes préstamos activos.</p>
          ) : (
            loans.map((loan) => (
              <div key={loan.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">Libro ID: {loan.bookId}</h3>
                <p>Fecha de préstamo: {loan.loanDate.toLocaleDateString()}</p>
                <p>Fecha de vencimiento: {loan.dueDate.toLocaleDateString()}</p>
                <p>Estado: {loan.status}</p>
                {loan.fineAmount && loan.fineAmount > 0 && (
                  <p className="text-red-600">Multa: ${loan.fineAmount}</p>
                )}
                <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
                  Devolver
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyLoansPage;
