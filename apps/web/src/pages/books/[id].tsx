import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import type { BookDTO } from "app-domain/dtos/dashboard";
import { apiClient } from "../../utils/api-client";
import { useAuth } from "../../application/hooks/useAuth";
import Button from "../../components/Button";
import { Badge } from "../../ui/Badge";
import { Modal } from "../../components/Modal/modal";

export const bookLoader = async ({ params }: any) => {
  const res = await apiClient.call<BookDTO>(`books/${params.id}`);
  if (res && typeof res === "object" && "error" in (res as any)) {
    throw new Response("Not Found", { status: 404 });
  }
  return { book: res as BookDTO };
};

const BookDetailPage = () => {
  const { book } = useLoaderData() as { book: BookDTO };
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isRequesting, setIsRequesting] = useState(false);
  const [message, setMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const isAvailable = (book.availableCopies ?? 0) > 0;
  const availableCopies = book.availableCopies ?? 0;

  const handleRequestBook = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmRequestBook = async () => {
    setIsRequesting(true);
    setMessage("");
    setShowConfirmModal(false);

    try {
      // Intentar crear una reserva primero
      const result = await apiClient.call("createReservation", {
        bookId: book.id,
      });

      if (result && typeof result === "object" && "error" in result) {
        setMessage(`Error: ${result.error}`);
      } else {
        setMessage(
          "¡Reserva creada exitosamente! Te notificaremos cuando el libro esté disponible."
        );
      }
    } catch (error) {
      console.error("Error requesting book:", error);
      setMessage("Error al procesar la solicitud. Inténtalo de nuevo.");
    } finally {
      setIsRequesting(false);
    }
  };

  const formatAuthorName = (author: any) => {
    if (typeof author === "string") {
      return author;
    }
    if (author?.firstName && author?.lastName) {
      return `${author.firstName} ${author.lastName}`;
    }
    return author?.name || "Autor desconocido";
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-emerald-600">
            Inicio
          </Link>
          <span>/</span>
          <Link to="/books" className="hover:text-emerald-600">
            Catálogo
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">
            {book.title}
          </span>
        </nav>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Imagen y acciones */}
          <div className="lg:col-span-1 space-y-6">
            {/* Imagen del libro */}
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <img
                src={
                  book.imageUrl ||
                  "https://via.placeholder.com/400x600?text=Sin+imagen"
                }
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Información de disponibilidad */}
            <div className={`rounded-lg shadow-sm border-2 p-6 space-y-4 ${
              isAvailable
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  Estado del libro
                </span>
                <Badge variant={isAvailable ? "success" : "destructive"} className="text-sm px-3 py-1">
                  {isAvailable ? "📚 Disponible" : "❌ No disponible"}
                </Badge>
              </div>

              <div className="text-center py-4">
                <div className={`text-4xl font-bold mb-2 ${
                  isAvailable ? "text-green-600" : "text-red-600"
                }`}>
                  {availableCopies}
                </div>
                <div className="text-base text-gray-700 font-medium">
                  {availableCopies === 1
                    ? "copia disponible para préstamo"
                    : availableCopies === 0
                      ? "copias disponibles (agotado)"
                      : "copias disponibles para préstamo"}
                </div>
              </div>

              {/* Indicador visual adicional */}
              <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
                isAvailable
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {isAvailable ? (
                  <>
                    <span className="text-2xl">✅</span>
                    <span className="font-medium">¡Puedes solicitar este libro ahora!</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">⏳</span>
                    <span className="font-medium">Libro actualmente prestado</span>
                  </>
                )}
              </div>

              {/* Botón de acción */}
              <Button
                onClick={handleRequestBook}
                disabled={!isAvailable || isRequesting}
                className={`w-full py-3 text-base font-semibold ${
                  isAvailable
                    ? "!bg-emerald-600 !text-white hover:!bg-emerald-700 !shadow-lg"
                    : "!bg-gray-400 !text-gray-200 !cursor-not-allowed"
                } disabled:!opacity-50`}
              >
                {isRequesting
                  ? "⏳ Procesando solicitud..."
                  : isAvailable
                    ? "📖 Solicitar préstamo"
                    : "❌ No disponible actualmente"}
              </Button>

              {!user && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800 text-center font-medium">
                    🔐 Debes iniciar sesión para solicitar préstamos
                  </p>
                </div>
              )}
            </div>

            {/* Mensaje de resultado */}
            {message && (
              <div
                className={`p-4 rounded-lg border ${
                  message.includes("exitosamente")
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <p className="text-sm">{message}</p>
              </div>
            )}
          </div>

          {/* Información del libro */}
          <div className="lg:col-span-2 space-y-8">
            {/* Título y autor */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {book.title || "Sin título"}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                por {formatAuthorName(book.author)}
              </p>

              {/* Metadatos */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Categoría:</span>
                  <span>Ficción</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Idioma:</span>
                  <span>Español</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Estado:</span>
                  <Badge variant={isAvailable ? "success" : "secondary"}>
                    {isAvailable ? "Disponible" : "Prestado"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Descripción */}
            {book.description && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Sinopsis
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>
            )}

            {/* Información adicional */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Detalles del libro */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Detalles del libro
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Título
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {book.title || "No disponible"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Autor</dt>
                    <dd className="text-sm text-gray-900">
                      {formatAuthorName(book.author)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Categoría
                    </dt>
                    <dd className="text-sm text-gray-900">Ficción</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Idioma
                    </dt>
                    <dd className="text-sm text-gray-900">Español</dd>
                  </div>
                </dl>
              </div>

              {/* Información de préstamo */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Información de préstamo
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-700">
                      Copias disponibles
                    </dt>
                    <dd className="text-sm text-gray-900">{availableCopies}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-700">
                      Estado
                    </dt>
                    <dd className="text-sm text-gray-900">
                      <Badge variant={isAvailable ? "success" : "secondary"}>
                        {isAvailable ? "Disponible" : "No disponible"}
                      </Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-700">
                      Tiempo de préstamo
                    </dt>
                    <dd className="text-sm text-gray-900">30 días</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-700">
                      Renovaciones permitidas
                    </dt>
                    <dd className="text-sm text-gray-900">
                      Hasta 2 renovaciones
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Acciones adicionales */}
            <div className="flex flex-wrap gap-4 pt-6 border-t">
              <Link to="/books">
                <Button className="!bg-gray-500 !text-white hover:!bg-gray-600">
                  ← Volver al catálogo
                </Button>
              </Link>

              {user && (
                <>
                  <Link to="/my/loans">
                    <Button className="!bg-blue-600 !text-white hover:!bg-blue-700">
                      Ver mis préstamos
                    </Button>
                  </Link>
                  <Link to="/my/reservations">
                    <Button className="!bg-green-600 !text-white hover:!bg-green-700">
                      Ver mis reservas
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal de confirmación */}
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="Confirmar solicitud de préstamo"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <img
                src={
                  book.imageUrl ||
                  "https://via.placeholder.com/80x120?text=Sin+imagen"
                }
                alt={book.title}
                className="w-20 h-28 object-cover rounded-lg shadow-sm flex-shrink-0"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{book.title}</h3>
                <p className="text-gray-600">{formatAuthorName(book.author)}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Información importante:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• El préstamo tendrá una duración de 30 días</li>
                <li>• Puedes renovar el préstamo hasta 2 veces</li>
                <li>• Debes devolver el libro en buen estado</li>
                <li>• Se aplicarán multas por retrasos</li>
              </ul>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowConfirmModal(false)}
                className="!bg-gray-500 !text-white hover:!bg-gray-600"
              >
                Cancelar
              </Button>
              <Button
                onClick={confirmRequestBook}
                disabled={isRequesting}
                className="!bg-emerald-600 !text-white hover:!bg-emerald-700 disabled:!opacity-50"
              >
                {isRequesting ? "Procesando..." : "Confirmar préstamo"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default BookDetailPage;
