// 1. IMPORTAMOS TUS MOCKS REALES (Con los nombres correctos que vi en tus archivos)
import { mockBooks } from "../application/mocks/book-mock";
import { mockLoans } from "../application/mocks/mock-loan";
import { mockUsers } from "../application/mocks/user-mock";
import type { BookDTO } from "app-domain/dtos/dashboard";
// Si quieres, puedes importar mockCategories para mapear el género, pero por ahora simplificaremos.

export type RemoteResult<T> = T | { error: string };

// Controlar mocks vía variable de entorno en tiempo de build
const env: any = (import.meta as any).env || {};
// Forzar uso de API real para probar, pero usar mocks en tests
const USE_MOCKS =
  import.meta.env.MODE === "test" ||
  (env.VITE_USE_MOCKS !== undefined ? env.VITE_USE_MOCKS === "true" : false);

// 2. FUNCIÓN PARA CALCULAR ESTADÍSTICAS REALES
const getDynamicStats = () => {
  // Calculamos datos reales basados en tus arrays
  const totalBooks = mockBooks.length;
  // Filtramos préstamos que estén activos (tus mocks usan 'active' o 'overdue')
  const activeLoans = mockLoans.filter(
    (l) => l.status === "active" || l.status === "overdue",
  ).length;
  const totalUsers = mockUsers.length;

  return [
    {
      title: "Libros en Catálogo",
      value: totalBooks.toString(),
      change: "+2", // Esto lo dejamos fijo por ahora
      changeType: "positive",
      color: "text-emerald-600",
      iconName: "BookOpen",
    },
    {
      title: "Préstamos Activos",
      value: activeLoans.toString(),
      change: activeLoans > 5 ? "+High" : "Normal",
      changeType: "neutral",
      color: "text-amber-500",
      iconName: "Clock",
    },
    {
      title: "Usuarios Registrados",
      value: totalUsers.toString(),
      change: "+12%",
      changeType: "positive",
      color: "text-blue-600",
      iconName: "Users",
    },
    {
      title: "Favoritos",
      value: "12", // Dato fijo (ya que no tenemos mock de favoritos)
      change: "+5%",
      changeType: "positive",
      color: "text-red-500",
      iconName: "Heart",
    },
  ];
};

// 3. MAPPER PARA LIBROS DESTACADOS
// Tu BookCard espera 'rating' y 'status' (enum), pero tu mock tiene 'availableCopies'.
// Aquí lo adaptamos para que la UI no falle.
const getFeaturedBooks = () => {
  return mockBooks.slice(0, 4).map((book) => ({
    ...book,
    // Agregamos campos que la UI necesita y el mock crudo no tiene:
    rating: 4.8, // Valor por defecto para diseño
    genre: "General", // Podríamos cruzarlo con mockCategories, pero 'General' funciona por ahora
    status: book.availableCopies > 0 ? "AVAILABLE" : "BORROWED", // Lógica real basada en tus copias
  }));
};

const MOCK_REGISTRY: Record<string, any> = {
  dashboard: {
    // Usamos getters para que se recalculen cada vez
    get stats() {
      return getDynamicStats();
    },
    get featuredBooks() {
      return getFeaturedBooks();
    },
  },
  getDashboard: {
    // Usamos getters para que se recalculen cada vez
    get stats() {
      return getDynamicStats();
    },
    get featuredBooks() {
      return getFeaturedBooks();
    },
  },
  "auth/login": async ({ email }: { email: string; password: string }) => {
    // Very simple mock auth: any password is accepted if email exists in mockUsers
    const user = mockUsers.find(
      (u: any) => u.email === email || u.email === email?.toLowerCase(),
    );
    if (!user) return { error: "Usuario o contraseña inválidos" };
    return {
      token: `mock-token-${user.id}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
  "auth/register": async ({
    name,
    surname,
    email,
  }: {
    name: string;
    surname: string;
    email: string;
  }) => {
    // Simple register mock: create a new user with incremental id
    const exists = mockUsers.find(
      (u: any) => u.email === email || u.email === email?.toLowerCase(),
    );
    if (exists) return { error: "El usuario ya existe" };
    const newId = String(mockUsers.length + 1);
    const newUser = {
      id: newId,
      name,
      surname,
      email,
      passwordHash: "hashed_password_placeholder",
      validated: true,
      locked: false,
      role: "BORROWER",
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser as any);
    return {
      token: `mock-token-${newId}`,
      user: { id: newId, name, email, role: "BORROWER" },
    };
  },
  "auth/refresh": async ({ token }: { token?: string }) => {
    // Very simple refresh: if token matches mock-token-<id>, return a new token
    if (!token) return { error: "No token provided" };
    const parts = String(token).split("mock-token-");
    const id = parts[1];
    const user = mockUsers.find((u: any) => u.id === id);
    if (!user) return { error: "Token inválido" };
    return {
      token: `mock-token-${user.id}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
  books: (): BookDTO[] => {
    return mockBooks.map((b: any) => ({
      id: b.id,
      title: b.title,
      author:
        typeof (b as any).author === "string"
          ? (b as any).author
          : (b as any).author?.name || "Desconocido",
      availableCopies: (b as any).availableCopies,
      imageUrl: (b as any).image || (b as any).imageUrl,
      image: (b as any).image || (b as any).imageUrl,
      description: (b as any).description,
    }));
  },
  getBooks: (): BookDTO[] => {
    return mockBooks.map((b: any) => ({
      id: b.id,
      title: b.title,
      author:
        typeof (b as any).author === "string"
          ? (b as any).author
          : (b as any).author?.name || "Desconocido",
      availableCopies: (b as any).availableCopies,
      imageUrl: (b as any).image || (b as any).imageUrl,
      image: (b as any).image || (b as any).imageUrl,
      description: (b as any).description,
    }));
  },
  getBookById: (params: { id: string }) => {
    const book = (mockBooks as any[]).find((b) => b.id === params.id);
    if (!book) return { error: "Book not found" };
    return {
      id: book.id,
      title: book.title,
      author:
        typeof book.author === "string"
          ? book.author
          : book.author?.name || "Desconocido",
      availableCopies: book.availableCopies,
      imageUrl: book.image || book.imageUrl,
      image: book.image || book.imageUrl,
      description: book.description,
    } as BookDTO;
  },
  createReservation: async (params: { bookId: string }) => {
    const reservationId = `res-${Date.now()}`;

    const book = (mockBooks as any[]).find((b) => b.id === params.bookId);
    if (!book) return { error: "Libro no encontrado" };
    if (book.availableCopies <= 0)
      return { error: "No hay copias disponibles" };
    return { id: reservationId, bookId: params.bookId, status: "active" };
  },
  getUserLoans: (params: { userId: string }) => {
    // Mock: filtrar loans por borrowerId
    return mockLoans.filter((loan) => loan.borrowerId === params.userId);
  },
  getUserReservations: (_params: { userId: string }) => {
    // Mock: por ahora devolver vacío, ya que no hay mockReservations
    return [];
  },
};

export const apiClient = {
  call: async <T = any>(
    endpoint: string,
    _params: Record<string, any> = {},
  ): Promise<RemoteResult<T>> => {
    if (USE_MOCKS) {
      // Simula delay de red
      await new Promise((r) => setTimeout(r, 500));

      const data = MOCK_REGISTRY[endpoint];
      if (data) {
        // If the registry entry is a function, call it with params (supports async)
        if (typeof data === "function") {
          try {
            const result = await data(_params);
            return result as T;
          } catch (err: any) {
            return { error: err?.message || String(err) };
          }
        }
        return data as T;
      }

      return { error: `Mock no encontrado para: ${endpoint}` };
    }

    // Intento simple de llamar a la API real si config no usa mocks.
    try {
      const base = env.VITE_API_BASE_URL || "";
      if (!base) return { error: "VITE_API_BASE_URL no configurada" };

      const { _method, ...params } = _params;
      let method = _method;

      if (!method) {
        method =
          endpoint.startsWith("auth/") || endpoint.startsWith("dashboard")
            ? "POST"
            : "GET";
      }

      const body =
        method !== "GET" && method !== "DELETE"
          ? JSON.stringify(params)
          : undefined;

      // Get token from localStorage
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers: Record<string, string> = body
        ? { "Content-Type": "application/json" }
        : {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${base}/${endpoint}`, {
        method,
        headers,
        body,
      });

      if (!res.ok) {
        try {
          const text = await res.text();
          console.log("API Error Response:", text);
          try {
            const json = JSON.parse(text);
            if (json && json.error) {
              const error = json.error;
              const message =
                typeof error === "string"
                  ? error
                  : error?.message || `API error: ${res.status}`;
              return { error: message };
            }
          } catch (parseError) {
            // If it's not JSON, just return the text
            return { error: `API error: ${res.status} ${text}` };
          }
          return { error: `API error: ${res.status} ${text}` };
        } catch (e) {
          console.log("Error reading response:", e);
          return { error: `API error: ${res.status}` };
        }
      }

      const json = await res.json();
      return json as T;
    } catch (err: any) {
      return { error: err?.message || String(err) };
    }
  },
};

export interface GetPropsContext {
  params: any;
  remote: typeof apiClient;
}
