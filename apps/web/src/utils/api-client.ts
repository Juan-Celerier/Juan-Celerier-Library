import { mockBooks } from "../application/mocks/book-mock";
import { mockLoans } from "../application/mocks/mock-loan";
import { mockUsers } from "../application/mocks/user-mock";
import type { BookDTO } from "app-domain/dtos/dashboard";

export type RemoteResult<T> = T | { error: string };

const env: any = (import.meta as any).env || {};
const USE_MOCKS =
  import.meta.env.MODE === "test" ||
  (env.VITE_USE_MOCKS !== undefined ? env.VITE_USE_MOCKS === "true" : false);

const getDynamicStats = () => {
  const totalBooks = mockBooks.length;
  const activeLoans = mockLoans.filter(
    (l) => l.status === "active" || l.status === "overdue",
  ).length;
  const totalUsers = mockUsers.length;

  return [
    {
      title: "Libros en Catálogo",
      value: totalBooks.toString(),
      change: "+2",
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
      value: "12",
      change: "+5%",
      changeType: "positive",
      color: "text-red-500",
      iconName: "Heart",
    },
  ];
};

const getFeaturedBooks = () => {
  return mockBooks.slice(0, 4).map((book) => ({
    ...book,
    rating: 4.8,
    genre: "General",
    status: book.availableCopies > 0 ? "AVAILABLE" : "BORROWED",
  }));
};

const MOCK_REGISTRY: Record<string, any> = {
  dashboard: {
    get stats() {
      return getDynamicStats();
    },
    get featuredBooks() {
      return getFeaturedBooks();
    },
  },
  "auth/login": async ({ email }: { email: string }) => {
    const user = mockUsers.find((u: any) => u.email === email?.toLowerCase());
    if (!user) return { error: "Usuario inválido" };
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
  "auth/register": async (data: any) => {
    return {
      token: `mock-token-${Date.now()}`,
      user: {
        id: `user-${Date.now()}`,
        name: data.name || "Nuevo Usuario",
        email: data.email,
        role: "BORROWER",
      },
    };
  },
  books: (): BookDTO[] =>
    mockBooks.map((b: any) => ({
      id: b.id,
      title: b.title,
      author:
        typeof b.author === "string"
          ? b.author
          : b.author?.name || "Desconocido",
      availableCopies: b.availableCopies,
      imageUrl: b.image || b.imageUrl,
      description: b.description,
    })),
};

// --- EL CORAZÓN DEL CAMBIO: API CLIENT ---
export const apiClient = {
  call: async <T = any>(
    endpoint: string,
    _params: Record<string, any> = {},
  ): Promise<RemoteResult<T>> => {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 500));
      const data = MOCK_REGISTRY[endpoint];
      if (data)
        return (typeof data === "function" ? await data(_params) : data) as T;
      return { error: `Mock no encontrado: ${endpoint}` };
    }

    try {
      const base = env.VITE_API_BASE_URL || "http://localhost:3000";
      const { _method, ...params } = _params;

      // Definimos el método: POST para auth/dashboard o si se especifica, si no GET
      let method = _method;
      if (!method) {
        method =
          endpoint.startsWith("auth/") || endpoint.startsWith("dashboard")
            ? "POST"
            : "GET";
      }

      let body: any;
      const headers: Record<string, string> = {};

      // CORRECCIÓN PARA SUBIDA DE ARCHIVOS (FormData)
      // Si enviamos una propiedad 'body' que es FormData o si params es FormData
      if (_params.body instanceof FormData) {
        body = _params.body;
        method = "POST";
        // IMPORTANTE: NO ponemos Content-Type. El navegador debe poner el boundary.
      } else if (method !== "GET" && method !== "DELETE") {
        // Para peticiones normales, enviamos JSON
        body = JSON.stringify(params);
        headers["Content-Type"] = "application/json";
      }

      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${base}/${endpoint}`, {
        method,
        headers,
        body,
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          return { error: json.error || json.message || `Error ${res.status}` };
        } catch {
          return { error: `Error ${res.status}: ${text}` };
        }
      }

      return (await res.json()) as T;
    } catch (err: any) {
      return { error: err?.message || String(err) };
    }
  },
};
