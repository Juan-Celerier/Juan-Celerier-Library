import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";

// 1. IMPORTA TUS PÁGINAS Y LOADERS
import Index, { indexLoader } from "./pages/index";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

// Auth
import { AuthProvider } from "./application/hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

// 2. CONFIGURA LA RUTA
const BooksPage = React.lazy(() => import("./pages/books/index"));
const BookDetailPage = React.lazy(() => import("./pages/books/[id]"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
    loader: indexLoader,
  },
  {
    path: "/books",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Cargando libros...</div>}>
          <BooksPage />
        </Suspense>
      </ProtectedRoute>
    ),
    // loader will be handled inside the page via useLoaderData when wired; alternatively we used client-side call
  },
  {
    path: "/books/:id",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Cargando detalle...</div>}>
          <BookDetailPage />
        </Suspense>
      </ProtectedRoute>
    ),
    // loader inside page
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  // 3. RENDERIZA EL PROVEEDOR envuelto en Suspense y AuthProvider
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Cargando...
        </div>
      }
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Suspense>
  );
}

export default App;
