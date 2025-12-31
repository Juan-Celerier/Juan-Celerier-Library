import { Link } from "react-router-dom";
import { Home, BookOpen, Search } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md mx-auto text-center px-6">
        {/* Ilustración */}
        <div className="mb-8">
          <div className="relative">
            <BookOpen className="h-32 w-32 text-gray-300 mx-auto" />
            <div className="absolute -top-2 -right-2">
              <Search className="h-12 w-12 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Contenido */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida. Puede
          que hayas escrito mal la dirección o que el enlace haya expirado.
        </p>

        {/* Acciones */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            <Home className="h-5 w-5" />
            Ir al inicio
          </Link>

          <div className="text-sm text-gray-500">
            <p>¿Buscas algo específico?</p>
            <Link
              to="/books"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Explorar nuestro catálogo de libros →
            </Link>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <p>Si crees que esto es un error, puedes:</p>
            <ul className="text-left max-w-xs mx-auto space-y-1">
              <li>• Verificar la dirección URL</li>
              <li>• Regresar a la página anterior</li>
              <li>• Contactar al soporte técnico</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
