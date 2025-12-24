import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";

// 1. IMPORTA TUS PÁGINAS Y LOADERS
import Index, { indexLoader } from "./pages/index";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
const ProfilePage = React.lazy(() => import("./pages/profile"));

// Auth
import { AuthProvider } from "./application/hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

// 2. CONFIGURA LA RUTA
const BooksPage = React.lazy(() => import("./pages/books/index"));
const BookDetailPage = React.lazy(() => import("./pages/books/[id]"));
const MyLoansPage = React.lazy(() => import("./pages/my/loans"));
const MyReservationsPage = React.lazy(() => import("./pages/my/reservations"));

// Loaders para las páginas de libros (los exportan sus módulos)
import { booksLoader } from "./pages/books/index";
import { bookLoader } from "./pages/books/[id]";

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
    loader: booksLoader,
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
    loader: bookLoader,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Cargando perfil...</div>}>
          <ProfilePage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/my/loans",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Cargando préstamos...</div>}>
          <MyLoansPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/my/reservations",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Cargando reservas...</div>}>
          <MyReservationsPage />
        </Suspense>
      </ProtectedRoute>
    ),
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
