# Contributing (Contribuyendo)

¡Gracias por tu interés en contribuir a Library System! Aquí está la guía para hacerlo correctamente.

## 🚀 Cómo Empezar

### 1. Fork y Clone

```bash
# Clonar tu fork
git clone https://github.com/tu-usuario/library-system.git
cd library-system

# Agregar upstream (repositorio original)
git remote add upstream https://github.com/autor-original/library-system.git
```

### 2. Crear Rama

```bash
# Actualizar main desde upstream
git fetch upstream
git rebase upstream/main

# Crear rama para tu cambio
git checkout -b feature/mi-feature
# o
git checkout -b fix/mi-bug-fix
```

### 3. Configurar Entorno

```bash
# Ejecutar script de inicialización
./init.sh  # Linux/Mac
init.bat   # Windows
```

---

## 📋 Principios de Desarrollo

### Clean Architecture

```
Respeta la separación de capas:
- Domain:       Lógica de negocio (entidades, use cases)
- Application:  Casos de uso y servicios
- Infrastructure: HTTP, BD, servicios externos
```

### TDD (Test Driven Development)

```typescript
// 1. Escribe el test PRIMERO
describe("MyFeature", () => {
  it("debería hacer X", () => {
    expect(myFunction()).toBe(true);
  });
});

// 2. Implementa el código
function myFunction() {
  return true;
}

// 3. Refactoriza si es necesario
```

### TypeScript Strict

```typescript
// ❌ NO
const user: any = {};

// ✅ SÍ
interface User {
  id: string;
  name: string;
}
const user: User = { id: "1", name: "Juan" };
```

---

## 🧪 Pruebas

### Ejecutar Tests

```bash
# Todos los tests
yarn test

# En modo watch
yarn test:watch

# Con cobertura
yarn test --coverage

# Solo un archivo
yarn test BookEntity.spec.ts
```

### Escribir Tests

```typescript
// domain/entities/Book.spec.ts
import { describe, it, expect } from "vitest";
import { Book } from "./Book";

describe("Book Entity", () => {
  it("debería crear un libro con datos válidos", () => {
    const book = new Book("1", "El Quijote", "Cervantes");

    expect(book.id).toBe("1");
    expect(book.title).toBe("El Quijote");
    expect(book.author).toBe("Cervantes");
  });

  it("debería lanzar error con datos inválidos", () => {
    expect(() => {
      new Book("", "", "");
    }).toThrow();
  });
});
```

---

## 📝 Código y Estilo

### Linting

```bash
# Verificar linting
yarn lint

# Arreglar automáticamente
yarn lint --fix

# Formatear código
yarn format
```

### Convenciones de Nombres

```typescript
// Archivos
entity.ts; // singular, lowercase
entity.spec.ts; // test
entity.spec.ts; // mock

// Carpetas
entities / repositories / use -
  cases /
    // Clases
    class BookEntity {};
class BorrowUseCase {}

// Funciones
function getBooks() {}
function createBook() {}

// Constantes
const MAX_BORROW_DAYS = 14;
const DEFAULT_TIMEOUT = 5000;

// Variables
let currentBook;
const isValid = true;
```

---

## 🎨 Frontend (React + Storybook)

### Crear Nuevo Componente

```typescript
// components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <div onClick={onClick}>
      {title}
    </div>
  );
}
```

### Crear Historia en Storybook

```typescript
// components/MyComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  title: "Design System/Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Click me",
  },
};

export const WithClickHandler: Story = {
  args: {
    title: "Click me",
    onClick: () => console.log("Clicked!"),
  },
};
```

### Ver en Storybook

```bash
yarn workspace web storybook
# http://localhost:6006
```

---

## 🔌 Backend (Express)

### Crear Nueva Ruta

```typescript
// apps/api/src/routes/example.routes.ts
import { Router } from "express";
import { exampleController } from "../controllers/example.controller";
import { authMiddleware } from "../middlewares/auth-middlewares";

const router = Router();

router.get("/", authMiddleware, exampleController.getAll);
router.post("/", authMiddleware, exampleController.create);

export default router;
```

### Crear Controlador

```typescript
// apps/api/src/controllers/example.controller.ts
import { Request, Response } from "express";

export const exampleController = {
  async getAll(req: Request, res: Response) {
    try {
      // Tu lógica aquí
      res.json({ data: [] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      // Tu lógica aquí
      res.status(201).json({ id: "1" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
```

---

## 🐳 Docker

### Testear Localmente

```bash
# Build de imágenes
docker-compose build

# Ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f api
docker-compose logs -f web

# Detener
docker-compose down
```

### Cambios Rápidos

```bash
# Si cambias código en desarrollo
docker-compose build --no-cache <service>
docker-compose restart <service>
```

---

## 📤 Submitting Changes (Enviando Cambios)

### Commit

```bash
# Hacer commits pequeños y descriptivos
git add .
git commit -m "feat: Add book search functionality"

# Tipos de commit recomendados:
# feat:     Nueva funcionalidad
# fix:      Corrección de bug
# docs:     Cambios en documentación
# style:    Cambios en formato (sin lógica)
# refactor: Refactorización sin cambios funcionales
# test:     Agregar o actualizar tests
# chore:    Cambios en setup, deps, etc
```

### Push y Pull Request

```bash
# Push a tu fork
git push origin feature/mi-feature

# Crear Pull Request en GitHub
# 1. Ir a https://github.com/tu-usuario/library-system
# 2. Click en "Compare & pull request"
# 3. Describir el cambio claramente
# 4. Esperar revisión
```

### Descripción de PR (Pull Request)

```markdown
## Descripción

Breve descripción de qué hace el cambio

## Tipo de Cambio

- [ ] Bugfix
- [ ] Nueva funcionalidad
- [ ] Cambio breaking

## Checklist

- [ ] He ejecutado `yarn test` y todos pasan
- [ ] He ejecutado `yarn lint` sin errores
- [ ] He actualizado la documentación
- [ ] He añadido tests para los cambios
- [ ] He probado manualmente

## Screenshots (si aplica)

[Agregar screenshots]

## Testing realizado

Describir cómo probaste el cambio...
```

---

## 🚨 Guía de Revisión de Código

Cuando revises un PR, verifica:

- ✅ El código sigue las convenciones del proyecto
- ✅ Hay tests para la nueva funcionalidad
- ✅ No hay console.log() dejados
- ✅ No hay código comentado innecesariamente
- ✅ Los tipos TypeScript son correctos
- ✅ El código es fácil de entender
- ✅ Las historias de Storybook están actualizadas (si aplica)

---

## 📚 Recursos Útiles

- [Documentación del Proyecto](./README.md)
- [Guía de Frontend](./FRONTEND_GUIDE.md)
- [Guía de Despliegue](./DEPLOYMENT.md)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com/en/api.html)

---

## 💬 Preguntas o Problemas?

- Abre una Issue en GitHub
- Participa en las Discussions
- Contacta a los mantenedores

¡Gracias por contribuir! 🎉
