# BiblioSys — sistema de gestión de bibliotecas

Aplicación web full-stack para consultar un catálogo y gestionar libros, préstamos y reservas. Es un proyecto de portfolio que muestra trabajo con **React, TypeScript, Node.js y Express**: interfaz, API REST, autenticación por roles, persistencia y pruebas.

> No es un e-commerce ni incorpora funciones de IA. Lo presento como muestra de desarrollo frontend y backend con tecnologías que también se usan en productos web y plataformas comerciales.

## Qué se puede revisar

- **Frontend:** React 18, TypeScript, Vite y React Router. Incluye catálogo con búsqueda y filtros, vistas de detalle, formularios, panel administrativo y componentes documentados con Storybook.
- **Backend:** API REST en Node.js y Express, con endpoints para autenticación, libros, autores, categorías, editoriales, préstamos, reservas, favoritos y usuarios.
- **Persistencia:** SQLite con TypeORM.
- **Autorización:** inicio de sesión con JWT y rutas administrativas protegidas por rol.
- **Estructura:** monorepo Yarn con aplicaciones separadas (`apps/web`, `apps/api`) y un paquete de dominio (`domain`).
- **Calidad:** pruebas con Vitest y workflow de CI en GitHub Actions.

## Probar localmente

Requisitos: Node.js 20 y Yarn 4.1.1 (el repositorio declara la versión de Yarn en `package.json`).

```bash
yarn install
```

En una terminal, inicializa la base local con datos de demostración y arranca la API:

```bash
yarn workspace library-system-api db:seed:dev
yarn workspace library-system-api dev
```

El seed crea usuarios y datos de ejemplo. Está pensado para una base local vacía; no lo ejecutes repetidamente sobre la misma base.

En otra terminal, configura y arranca el frontend:

```bash
cp apps/web/.env.example apps/web/.env
yarn workspace web dev
```

Abre <http://localhost:5173>. La API queda disponible en <http://localhost:3000>.

**Usuarios locales de demostración** (creados por el seed; no usar en producción):

| Rol           | Email            | Contraseña    |
| ------------- | ---------------- | ------------- |
| Bibliotecario | `admin@test.com` | `password123` |
| Usuario       | `user@test.com`  | `password123` |

El ejemplo de entorno del frontend apunta a la API local y desactiva los mocks para que el recorrido use el backend real.

## Comandos útiles

```bash
yarn build
yarn workspace web test:run
yarn workspace library-system-api test:run
yarn workspace domain test --run
yarn workspace web storybook
```

Storybook queda disponible en <http://localhost:6006>.

## Estructura

```text
apps/
  api/       API REST, configuración y pruebas
  web/       Aplicación React y Storybook
domain/      Entidades, contratos y lógica compartida
```

## Estado y alcance

El proyecto es una aplicación de demostración en evolución. Los usuarios y la base de datos del seed son locales; no representan un servicio público ni datos de una biblioteca real. Para evaluarlo, se puede recorrer el acceso de bibliotecario y el de usuario, y revisar los módulos de frontend, API y dominio.
