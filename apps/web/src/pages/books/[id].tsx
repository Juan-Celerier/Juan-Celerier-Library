import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import type { BookDTO } from "app-domain/dtos/dashboard";
import { apiClient } from "../../utils/api-client";

export const bookLoader = async ({ params }: any) => {
  const res = await apiClient.call<BookDTO>(`books/${params.id}`);
  if (res && typeof res === "object" && "error" in (res as any)) {
    throw new Response("Not Found", { status: 404 });
  }
  return { book: res as BookDTO };
};

const BookDetailPage = () => {
  const { book } = useLoaderData() as { book: BookDTO };
  const [isReserving, setIsReserving] = useState(false);
  const [message, setMessage] = useState("");

  const handleReserve = async () => {
    setIsReserving(true);
    setMessage("");
    try {
      const result = await apiClient.call("createReservation", {
        bookId: book.id,
      });
      if (result && typeof result === "object" && "error" in result) {
        setMessage(result.error);
      } else {
        setMessage("Reserva creada exitosamente!");
      }
    } catch (error) {
      setMessage("Error al crear la reserva");
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-start gap-6">
          <img
            src={book.imageUrl || "https://via.placeholder.com/200"}
            alt={book.title}
            className="w-48 h-64 object-cover rounded"
          />
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-sm text-neutral-600">
              {typeof book.author === "string"
                ? book.author
                : (book.author as any)?.name}
            </p>
            <p className="mt-4 text-neutral-700">{book.description}</p>
            {message && (
              <p
                className={`mt-4 text-sm ${message.includes("exitosamente") ? "text-green-600" : "text-red-600"}`}
              >
                {message}
              </p>
            )}
            <div className="mt-6">
              <button
                className="bg-emerald-600 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
                onClick={handleReserve}
                disabled={isReserving || (book.availableCopies ?? 0) <= 0}
              >
                {isReserving
                  ? "Reservando..."
                  : (book.availableCopies ?? 0) > 0
                    ? "Solicitar préstamo"
                    : "No disponible"}
              </button>
              <Link to="/books" className="text-sm text-emerald-600">
                Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookDetailPage;
