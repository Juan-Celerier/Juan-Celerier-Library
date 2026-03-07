# 📚 Library Management System

Una **plataforma de gestión de bibliotecas** moderna y modular construida con **TypeScript**, siguiendo **Clean Architecture** y **Test Driven Development (TDD)**.

El sistema proporciona una experiencia completa con:

- ✅ **Backend REST API** con Express
- ✅ **Frontend moderno** con React + Vite + Storybook
- ✅ **Docker Compose** para despliegue con un solo comando
- ✅ **Arquitectura limpia** y código mantenible
- ✅ **Autenticación JWT** y control de roles
- ✅ **Testing completo** (unitarios, integración)

---

## 🚀 Quick Start

### Opción 1: Docker Compose (Recomendado)

```bash
# Clonar el repositorio
git clone <repo-url>
cd library-system

# Crear archivo de configuración
cp .env.example .env

# Iniciar todo el sistema
docker-compose up -d

# Acceder a las aplicaciones
# Frontend: http://localhost:4173
# API:      http://localhost:3000
```

### Opción 2: Desarrollo Local

```bash
# Instalar dependencias
yarn install

# Terminal 1: Iniciar API
yarn workspace api dev

# Terminal 2: Iniciar Frontend
yarn workspace web dev

# Frontend estará en http://localhost:5173
# API estará en http://localhost:3000
```

---

## 📋 Requisitos

- **Node.js** 18+ y **Yarn**
- **Docker** y **Docker Compose** (para opción 1)
- **Git**

---

## ✨ Características

### 📖 Gestión de Libros

- Crear, actualizar y eliminar libros
- Listar libros disponibles
- Buscar y filtrar por categoría/autor
- Ver detalles y disponibilidad
- Agregar a favoritos

### 👤 Usuarios y Autenticación

- Registro e inicio de sesión
- Roles: BORROWER (usuario) y LIBRARIAN (administrador)
- Gestión de perfiles
- Autenticación JWT

### 📦 Préstamos y Devoluciones

- Solicitar préstamos de libros
- Devolver libros
- Renovar préstamos
- Calcular multas por atrasos
- Historial de préstamos

### 📌 Reservas

- Reservar libros no disponibles
- Cancelar reservas
- Listar mis reservas
- Notificación cuando estén listos

### 🏷️ Administración

- Panel administrativo (LIBRARIAN)
- Gestionar libros, autores, editoriales
- Gestionar categorías
- Ver estadísticas del sistema
- Usuarios registrados y activos

---

## 🏗️ Arquitectura

El proyecto sigue **Clean Architecture** con 3 capas claramente separadas:

```
project-root/
├── apps/
│   ├── api/              # Express API
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── middlewares/
│   │   │   └── container/  (Inyección de dependencias)
│   │   └── Dockerfile
│   │
│   └── web/              # React Frontend
│       ├── src/
│       │   ├── components/  (Componentes reutilizables)
│       │   ├── pages/       (Páginas con rutas)
│       │   ├── application/ (Hooks y servicios)
│       │   ├── utils/       (API client, helpers)
│       │   └── ui/          (Componentes base)
│       └── Dockerfile
│
├── domain/              # Lógica de negocio (framework-independent)
│   ├── entities/
│   ├── use-cases/
│   ├── repositories/
│   ├── errors/
│   └── services/
│
├── docker-compose.yml   # Orquestación de contenedores
├── DEPLOYMENT.md        # Guía de despliegue en servidor
└── package.json
```

### Capas de Arquitectura

**Domain Layer**

- Entidades y reglas de negocio
- Use cases independientes del framework
- Definición de repositorios
- Errores del dominio

**Application Layer**

- Orquestación de use cases
- Inyección de dependencias
- Asignación de rutas
- Autenticación y autorización

**Infrastructure Layer**

- Controladores HTTP
- Implementación de repositorios
- Servicios externos
- Cliente HTTP para frontend

---

## 🧪 Testing

### Backend

```bash
# Tests unitarios
yarn workspace api test

# Tests en watch mode
yarn workspace api test:watch

# Coverage
yarn workspace api test --coverage
```

### Frontend

```bash
# Tests unitarios
yarn workspace web test

# Tests en watch mode
yarn workspace web test:watch

# Coverage
yarn workspace web test --coverage
```

---

## 📖 Storybook (Visual TDD)

Visualizar componentes en aislamiento:

```bash
# Iniciar Storybook
yarn workspace web storybook

# Acceder a http://localhost:6006
```

Componentes principales:

- `Header` - Barra de navegación
- `Footer` - Pie de página
- `Button` - Botones reutilizables
- `Card` - Tarjetas de contenido
- `Modal` - Diálogos modales
- `Pagination` - Paginación
- `Table` - Tablas de datos

---

## 🔌 API del Backend

### Autenticación

```bash
# Registro
POST /auth/register
{
  "name": "Juan",
  "surname": "Pérez",
  "email": "juan@example.com",
  "password": "secure-password"
}

# Login
POST /auth/login
{
  "email": "juan@example.com",
  "password": "secure-password"
}

# Perfil (requiere token JWT)
GET /auth/me
```

### Libros

```bash
# Listar todos
GET /books

# Obtener uno
GET /books/:id

# Crear (solo LIBRARIAN)
POST /books
{
  "title": "...",
  "isbn": "...",
  "authorId": "...",
  "publisherId": "...",
  "categoryId": "..."
}

# Actualizar
PUT /books/:id

# Eliminar
DELETE /books/:id
```

### Préstamos

```bash
# Listar préstamos del usuario
GET /loans

# Crear préstamo
POST /loans
{
  "bookCopyId": "..."
}

# Devolver libro
PATCH /loans/:id/return
```

### Reservas

```bash
# Listar mis reservas
GET /reservations

# Crear reserva
POST /reservations
{
  "bookId": "..."
}

# Cancelar
DELETE /reservations/:id
```

Todos los endpoints requieren encabezado:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🌐 Comunicación Frontend-Backend

El frontend consume la API real del backend usando un cliente HTTP optimizado:

```typescript
// En src/utils/api.ts
import { api } from "@/utils/api";

// Usar en componentes
const books = await api.books.getAll();
const book = await api.books.getById("123");
const newBook = await api.books.create({ title: "..." });
```

Variables de entorno en `.env`:

```
VITE_API_BASE_URL=http://localhost:3000  # Desarrollo
VITE_API_BASE_URL=https://api.prod.com   # Producción
```

---

## 📦 Docker Compose

### Servicios Disponibles

1. **API** - Express en puerto 3000
2. **Web** - React/Vite en puerto 4173

```yaml
# docker-compose.yml incluye:
- Health checks automáticos
- Restart policies
- Variables de entorno
- Volúmenes persistentes para la BD
- Network aislada entre servicios
```

### Comandos Útiles

```bash
# Iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Logs de un servicio específico
docker-compose logs -f api
docker-compose logs -f web

# Detener
docker-compose down

# Eliminar volúmenes (resetear BD)
docker-compose down -v

# Rebuild después de cambios
docker-compose build --no-cache
docker-compose up -d
```

---

## 🚀 Despliegue en Producción

Para hostear en un servidor, ver [DEPLOYMENT.md](./DEPLOYMENT.md).

### Puntos clave:

1. **SSL/HTTPS** - Certificados Let's Encrypt
2. **Nginx** - Reverse proxy y balanceo
3. **Variables de entorno** - Configuración segura
4. **Backups** - Base de datos persistente
5. **Monitoreo** - Health checks y logs
6. **Seguridad** - Rates limiting, CORS, headers

Plataformas recomendadas:

- AWS ECS / Fargate
- DigitalOcean App Platform
- Google Cloud Run
- Railway / Render.com
- Hetzner Cloud

---

## 🧹 Calidad de Código

```bash
# Linting
yarn lint

# Formateo
yarn format

# Verificar todo
yarn verify
```

Reglas aplicadas:

- **ESLint** - Estilo y errores comunes
- **Prettier** - Formateo consistente
- **TypeScript strict** - Tipado seguro

---

## 📚 Tecnologías Utilizadas

### Backend

- **Node.js** 20 + Express
- **TypeScript** - Tipado estático
- **SQLite** - Base de datos
- **JWT** - Autenticación
- **Vitest** - Testing

### Frontend

- **React** 18 + Vite
- **React Router** - Routing
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos
- **Storybook** - Component library
- **Vitest** - Testing

### DevOps

- **Docker** & **Docker Compose** - Containerización
- **Nginx** - Reverse proxy
- **Let's Encrypt** - SSL/TLS

---

## 📝 Variables de Entorno

Ver [.env.example](./.env.example) para todas las opciones.

**Entrada mínima:**

```
NODE_ENV=development
JWT_SECRET=<valor-aleatorio>
VITE_API_BASE_URL=http://localhost:3000
```

---

## 🤝 Estructura de Carpetas

```
library-system/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── middlewares/
│   │   │   └── container/
│   │   ├── data/           (BD SQLite)
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── web/
│       ├── src/
│       │   ├── App.tsx
│       │   ├── pages/
│       │   ├── components/
│       │   ├── application/
│       │   ├── utils/
│       │   └── ui/
│       ├── storybook/
│       ├── Dockerfile
│       └── package.json
│
├── domain/
│   ├── src/
│   │   ├── entities/
│   │   ├── use-cases/
│   │   ├── repositories/
│   │   ├── errors/
│   │   └── services/
│   └── package.json
│
├── docker-compose.yml
├── DEPLOYMENT.md
├── .env.example
└── package.json
```

---

## 🐛 Troubleshooting

### El frontend no conecta con API

```bash
# Verificar que API está corriendo
curl http://localhost:3000

# Verificar variable de entorno
echo $VITE_API_BASE_URL

# Revisar CORS en backend
# header: Access-Control-Allow-Origin
```

### Contenedor no inicia

```bash
# Ver logs detallados
docker-compose logs api

# Rebuild forzado
docker-compose build --no-cache api

# Iniciar con stdin
docker-compose up api (sin -d)
```

### Puerto en uso

```bash
# Cambiar puerto en .env
API_PORT=3001
WEB_PORT=4174

# O matar proceso existente
lsof -i :3000
kill -9 <PID>
```

---

## 📞 Soporte

Para problemas, abre un issue en el repositorio incluyendo:

- Logs (`docker-compose logs`)
- Versión de Docker
- Sistema operativo
- Pasos para reproducir

---

## 📄 Licencia

MIT

---

## 🎯 Próximos Pasos

- [ ] Integración con pagos (Stripe/MercadoPago)
- [ ] Notificaciones por email
- [ ] Mobile app (React Native)
- [ ] Analytics y reportes
- [ ] Búsqueda avanzada (Elasticsearch)
- [ ] Caché distribuido (Redis)
