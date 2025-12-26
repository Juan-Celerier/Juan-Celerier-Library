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
import RoleProtectedRoute from "./components/RoleProtectedRoute";

// 2. CONFIGURA LA RUTA
const BooksPage = React.lazy(() => import("./pages/books/index"));
const BookDetailPage = React.lazy(() => import("./pages/books/[id]"));
const AdminIndexPage = React.lazy(() => import("./pages/admin/index"));
const AdminBooksPage = React.lazy(() => import("./pages/admin/books"));
const AdminCategoriesPage = React.lazy(
  () => import("./pages/admin/categories")
);
const AdminAuthorsPage = React.lazy(() => import("./pages/admin/authors"));
const AdminPublishersPage = React.lazy(
  () => import("./pages/admin/publishers")
);
const MyLoansPage = React.lazy(() => import("./pages/my/loans"));
const MyReservationsPage = React.lazy(() => import("./pages/my/reservations"));

const AboutPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
      <p className="text-gray-600">Página en construcción...</p>
    </div>
  </div>
);

// Loaders para las páginas de libros (los exportan sus módulos)
import { bookLoader } from "./pages/books/[id]";
import { adminBooksLoader } from "./pages/admin/books";
import { adminCategoriesLoader } from "./pages/admin/categories";
import { adminAuthorsLoader } from "./pages/admin/authors";
import { adminPublishersLoader } from "./pages/admin/publishers";

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
    path: "/admin",
    element: (
      <RoleProtectedRoute allowedRoles={["LIBRARIAN"]}>
        <Suspense fallback={<div>Cargando administración...</div>}>
          <AdminIndexPage />
        </Suspense>
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/admin/books",
    element: (
      <RoleProtectedRoute allowedRoles={["LIBRARIAN"]}>
        <Suspense fallback={<div>Cargando administración...</div>}>
          <AdminBooksPage />
        </Suspense>
      </RoleProtectedRoute>
    ),
    loader: adminBooksLoader,
  },
  {
    path: "/admin/categories",
    element: (
      <RoleProtectedRoute allowedRoles={["LIBRARIAN"]}>
        <Suspense fallback={<div>Cargando administración...</div>}>
          <AdminCategoriesPage />
        </Suspense>
      </RoleProtectedRoute>
    ),
    loader: adminCategoriesLoader,
  },
  {
    path: "/admin/authors",
    element: (
      <RoleProtectedRoute allowedRoles={["LIBRARIAN"]}>
        <Suspense fallback={<div>Cargando administración...</div>}>
          <AdminAuthorsPage />
        </Suspense>
      </RoleProtectedRoute>
    ),
    loader: adminAuthorsLoader,
  },
  {
    path: "/admin/publishers",
    element: (
      <RoleProtectedRoute allowedRoles={["LIBRARIAN"]}>
        <Suspense fallback={<div>Cargando administración...</div>}>
          <AdminPublishersPage />
        </Suspense>
      </RoleProtectedRoute>
    ),
    loader: adminPublishersLoader,
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
  {
    path: "/about",
    element: <AboutPage />,
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
