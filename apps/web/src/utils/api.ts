/**
 * Configuración centralizada del API client
 * Soporta tanto mocks como API real
 */

export type RemoteResult<T> = T | { error: string };

const getApiBaseUrl = (): string => {
  // En navegador
  if (typeof window !== "undefined") {
    return import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  }
  // En servidor
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
};

interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

/**
 * Cliente HTTP para comunicación con el backend
 * Maneja autenticación, errores y reintentos
 */
export const httpClient = {
  /**
   * Realiza una petición HTTP
   * @param url La URL relativa (ej: "books" o "auth/login")
   * @param options Opciones de la petición
   */
  async request<T = any>(
    url: string,
    options: RequestOptions = {},
  ): Promise<RemoteResult<T>> {
    try {
      const baseUrl = getApiBaseUrl();
      const fullUrl = `${baseUrl}/${url.startsWith("/") ? url.slice(1) : url}`;

      // Obtener token del localStorage
      let token: string | null = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
      }

      // Preparar headers
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(fullUrl, {
        ...options,
        headers,
      });

      // Manejar respuestas no OK
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = `HTTP ${response.status}`;

        try {
          if (contentType?.includes("application/json")) {
            const errorData = await response.json();
            errorMessage =
              errorData.error?.message || errorData.error || errorMessage;
          } else {
            const text = await response.text();
            errorMessage = text || errorMessage;
          }
        } catch {
          // Si no se puede parsear, usar el mensaje por defecto
        }

        return { error: errorMessage };
      }

      // Parsear respuesta
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const data = await response.json();
        return data as T;
      }

      return { error: "Invalid response format" };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { error: message };
    }
  },

  /**
   * GET request
   */
  get<T = any>(
    url: string,
    options?: RequestOptions,
  ): Promise<RemoteResult<T>> {
    return this.request<T>(url, {
      ...options,
      method: "GET",
    });
  },

  /**
   * POST request
   */
  post<T = any>(
    url: string,
    data?: Record<string, any>,
    options?: RequestOptions,
  ): Promise<RemoteResult<T>> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * PUT request
   */
  put<T = any>(
    url: string,
    data?: Record<string, any>,
    options?: RequestOptions,
  ): Promise<RemoteResult<T>> {
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * DELETE request
   */
  delete<T = any>(
    url: string,
    options?: RequestOptions,
  ): Promise<RemoteResult<T>> {
    return this.request<T>(url, {
      ...options,
      method: "DELETE",
    });
  },

  /**
   * PATCH request
   */
  patch<T = any>(
    url: string,
    data?: Record<string, any>,
    options?: RequestOptions,
  ): Promise<RemoteResult<T>> {
    return this.request<T>(url, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  },
};

/**
 * API específico del dominio
 * Define endpoints y tipos para la API de la librería
 */
export const api = {
  // ============= AUTH =============
  auth: {
    login(email: string, password: string) {
      return httpClient.post("/auth/login", { email, password });
    },

    register(data: {
      name: string;
      surname: string;
      email: string;
      password: string;
    }) {
      return httpClient.post("/auth/register", data);
    },

    getProfile() {
      return httpClient.get("/auth/me");
    },
  },

  // ============= BOOKS =============
  books: {
    getAll() {
      return httpClient.get("/books");
    },

    getById(id: string) {
      return httpClient.get(`/books/${id}`);
    },

    create(data: Record<string, any>) {
      return httpClient.post("/books", data);
    },

    update(id: string, data: Record<string, any>) {
      return httpClient.put(`/books/${id}`, data);
    },

    delete(id: string) {
      return httpClient.delete(`/books/${id}`);
    },
  },

  // ============= AUTHORS =============
  authors: {
    getAll() {
      return httpClient.get("/authors");
    },

    getById(id: string) {
      return httpClient.get(`/authors/${id}`);
    },

    create(data: Record<string, any>) {
      return httpClient.post("/authors", data);
    },

    update(id: string, data: Record<string, any>) {
      return httpClient.put(`/authors/${id}`, data);
    },

    delete(id: string) {
      return httpClient.delete(`/authors/${id}`);
    },
  },

  // ============= CATEGORIES =============
  categories: {
    getAll() {
      return httpClient.get("/categories");
    },

    getById(id: string) {
      return httpClient.get(`/categories/${id}`);
    },

    create(data: Record<string, any>) {
      return httpClient.post("/categories", data);
    },

    update(id: string, data: Record<string, any>) {
      return httpClient.put(`/categories/${id}`, data);
    },

    delete(id: string) {
      return httpClient.delete(`/categories/${id}`);
    },
  },

  // ============= PUBLISHERS =============
  publishers: {
    getAll() {
      return httpClient.get("/publishers");
    },

    getById(id: string) {
      return httpClient.get(`/publishers/${id}`);
    },

    create(data: Record<string, any>) {
      return httpClient.post("/publishers", data);
    },

    update(id: string, data: Record<string, any>) {
      return httpClient.put(`/publishers/${id}`, data);
    },

    delete(id: string) {
      return httpClient.delete(`/publishers/${id}`);
    },
  },

  // ============= LOANS =============
  loans: {
    getAll() {
      return httpClient.get("/loans");
    },

    getById(id: string) {
      return httpClient.get(`/loans/${id}`);
    },

    getUserLoans(userId: string) {
      return httpClient.get(`/loans?userId=${userId}`);
    },

    create(data: Record<string, any>) {
      return httpClient.post("/loans", data);
    },

    update(id: string, data: Record<string, any>) {
      return httpClient.put(`/loans/${id}`, data);
    },

    returnBook(id: string) {
      return httpClient.patch(`/loans/${id}/return`);
    },
  },

  // ============= RESERVATIONS =============
  reservations: {
    getAll() {
      return httpClient.get("/reservations");
    },

    getById(id: string) {
      return httpClient.get(`/reservations/${id}`);
    },

    getUserReservations(userId: string) {
      return httpClient.get(`/reservations?userId=${userId}`);
    },

    create(bookId: string) {
      return httpClient.post("/reservations", { bookId });
    },

    cancel(id: string) {
      return httpClient.delete(`/reservations/${id}`);
    },
  },

  // ============= FAVORITES =============
  favorites: {
    getAll() {
      return httpClient.get("/favorites");
    },

    getUserFavorites(userId: string) {
      return httpClient.get(`/favorites?userId=${userId}`);
    },

    addFavorite(bookId: string) {
      return httpClient.post("/favorites", { bookId });
    },

    removeFavorite(bookId: string) {
      return httpClient.delete(`/favorites/${bookId}`);
    },
  },

  // ============= DASHBOARD =============
  dashboard: {
    getStats() {
      return httpClient.get("/dashboard");
    },
  },

  // ============= USERS =============
  users: {
    getAll() {
      return httpClient.get("/users");
    },

    getById(id: string) {
      return httpClient.get(`/users/${id}`);
    },

    update(id: string, data: Record<string, any>) {
      return httpClient.put(`/users/${id}`, data);
    },
  },
};

/**
 * Interfaz de contexto para loaders de React Router
 */
export interface GetPropsContext {
  params: any;
  remote: typeof api;
}
