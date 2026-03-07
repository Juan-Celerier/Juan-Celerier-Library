# Guía de Implementación del Frontend

## Configuración del Ambiente

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCKS=false
```

### Instalación Local

```bash
# Instalar dependencias
yarn install

# Desarrollo en modo local
yarn workspace web dev

# Compilar para producción
yarn workspace web build

# Preview de producción
yarn workspace web preview
```

---

## Cliente HTTP para API

### Ubicación

`apps/web/src/utils/api.ts`

### Uso Básico

```typescript
import { api } from "@/utils/api";

// Libros
const books = await api.books.getAll();
const book = await api.books.getById("123");
const newBook = await api.books.create({ title: "..." });
const updated = await api.books.update("123", { title: "..." });
await api.books.delete("123");

// Autenticación
const loginResult = await api.auth.login("email@example.com", "password");
const profile = await api.auth.getProfile();
const registerResult = await api.auth.register({
  name: "Juan",
  surname: "Pérez",
  email: "juan@example.com",
  password: "secure-password",
});

// Préstamos
const loans = await api.loans.getAll();
const userLoans = await api.loans.getUserLoans("userId");
const newLoan = await api.loans.create({ bookCopyId: "123" });
const returned = await api.loans.returnBook("loanId");

// Reservas
const reservations = await api.reservations.getAll();
const userReservations = await api.reservations.getUserReservations("userId");
const reserved = await api.reservations.create("bookId");
await api.reservations.cancel("reservationId");

// Favoritos
const favorites = await api.favorites.getAll();
const userFavorites = await api.favorites.getUserFavorites("userId");
await api.favorites.addFavorite("bookId");
await api.favorites.removeFavorite("bookId");
```

### Manejo de Errores

```typescript
const result = await api.books.getAll();

if ("error" in result) {
  // Es un error
  console.error("Error:", result.error);
} else {
  // Es éxito con datos
  const books = result;
  console.log("Libros:", books);
}
```

### En React con Hooks

```typescript
import { useState, useEffect } from 'react';
import { api } from '@/utils/api';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const result = await api.books.getAll();

        if ('error' in result) {
          setError(result.error);
        } else {
          setBooks(result);
        }
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {books.map(book => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}
```

---

## Estructura de Componentes

### Jerarquía Recomendada

```
pages/
├── books/
│   ├── index.tsx          (Listado de libros)
│   └── [id].tsx           (Detalle de libro)
├── admin/
│   ├── books.tsx          (Gestión de libros)
│   ├── categories.tsx     (Gestión de categorías)
│   ├── authors.tsx        (Gestión de autores)
│   └── publishers.tsx     (Gestión de editoriales)
├── my/
│   ├── loans.tsx          (Mis préstamos)
│   └── reservations.tsx   (Mis reservas)
├── login.tsx
├── register.tsx
└── profile.tsx

components/
├── Card/
│   ├── index.tsx
│   ├── Card.stories.tsx
│   └── Book-card.tsx
├── Button.tsx
├── Input/
│   ├── Input.tsx
│   └── Input.stories.tsx
├── Modal/
│   ├── Modal.tsx
│   └── Modal.stories.tsx
├── Table/
│   ├── Table.tsx
│   └── Table.stories.tsx
├── common/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Search.tsx
│   └── Navigation.tsx
└── ui/
    ├── Badge.tsx
    └── Spinner.tsx
```

---

## Testes de Componentes

### Estructura de Test

```typescript
// components/BookCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookCard } from './Book-card';

describe('BookCard', () => {
  it('debería renderizar la tarjeta con datos del libro', () => {
    const book = {
      id: '1',
      title: 'Test Book',
      author: 'Test Author',
      image: 'https://example.com/image.jpg'
    };

    render(<BookCard book={book} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('debería ser interactivo', () => {
    const handleClick = vi.fn();
    const book = { ... };

    render(<BookCard book={book} onClick={handleClick} />);

    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## Integración con Backend

### Headers Requeridos

El cliente HTTP añade automáticamente:

- `Authorization: Bearer <token>` (si existe)
- `Content-Type: application/json`

### Manejo de Tokens JWT

```typescript
// Después del login
const result = await api.auth.login("email", "password");

if (!("error" in result)) {
  // Guardar token
  localStorage.setItem("token", result.token);

  // Guardar datos del usuario
  localStorage.setItem("user", JSON.stringify(result.user));
}
```

### CORS

El backend está configurado para permitir:

- `http://localhost:5173` (desarrollo)
- `http://localhost:4173` (producción local)
- Configurable vía variable de entorno

---

## Storybook

### Visiona Componentes Aislados

```bash
yarn workspace web storybook
```

Acceder a `http://localhost:6006`

### Crear Nueva Historia

```typescript
// components/MyComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import MyComponent from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  title: "Design System/Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MyComponent prop="value" />
};

export const Variant: Story = {
  render: () => <MyComponent prop="other-value" />
};
```

---

## Ruteo y Navegación

### Configuración en App.tsx

```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><HomePage /></ProtectedRoute>,
    loader: homeLoader,
  },
  {
    path: '/books',
    element: <ProtectedRoute><BooksPage /></ProtectedRoute>,
  },
  {
    path: '/books/:id',
    element: <ProtectedRoute><BookDetailPage /></ProtectedRoute>,
    loader: bookLoader,
  },
  // ... más rutas
]);
```

### Loaders para Precarga de Datos

```typescript
export const bookLoader = async ({ params }: any) => {
  const result = await api.books.getById(params.id);

  if ("error" in result) {
    throw new Response("Book not found", { status: 404 });
  }

  return result;
};
```

---

## Autenticación y Autorización

### useAuth Hook

```typescript
import { useAuth } from '@/application/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Por favor inicia sesión</div>;
  }

  return (
    <div>
      Bienvenido, {user?.name}
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
```

### Rutas Protegidas por Rol

```typescript
<RoleProtectedRoute allowedRoles={['LIBRARIAN']}>
  <AdminPanel />
</RoleProtectedRoute>
```

---

## Performance

### Code Splitting

El runtime está configurado para lazy loading automático:

```typescript
const AdminPage = React.lazy(() => import('./pages/admin'));

// En la ruta:
element: (
  <Suspense fallback={<Loader />}>
    <AdminPage />
  </Suspense>
)
```

### Optimización de Imágenes

```typescript
<img
  src={book.image}
  alt={book.title}
  className="w-full object-cover"
  loading="lazy"
/>
```

---

## Despliegue

### Build para Producción

```bash
yarn workspace web build

# Resultado en: apps/web/dist/
```

### Servido por Docker

```bash
docker-compose up web
# Acceso en: http://localhost:4173
```

---

## Troubleshooting

### API no responde

```typescript
// Verificar que USE_MOCKS esté en false
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

// Revisar consola del navegador (F12)
// Buscar errores en Network tab
```

### Token expirado

```typescript
// El cliente maneja automáticamente refresh tokens
// Si obtienes error 401, intenta hacer login nuevamente
```

### CORS errors

```typescript
// Verificar VITE_API_BASE_URL apunta a la URL correcta
// Revisar configuración de CORS en backend
```

---

## Recursos Útiles

- [React Router v7 Docs](https://reactrouter.com)
- [Storybook Docs](https://storybook.js.org)
- [Vitest Docs](https://vitest.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
