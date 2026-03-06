# 📚 Library Management System

A modular library management system built with **TypeScript**, following **Clean Architecture** and **Test Driven Development (TDD)** principles.

The project demonstrates how to design a scalable backend with strong domain modeling, clear separation of concerns, and maintainable code.

---

# ✨ Features

Core library functionality implemented through domain use cases:

### 📖 Books

- Create books
- Update book metadata
- Delete books
- List available books

### 👤 Users

- User registration
- User login
- Role assignment
- User management

### 📦 Loans

- Borrow books
- Return books
- Loan renewal
- Fine calculation
- Overdue detection

### 📌 Reservations

- Reserve books
- Cancel reservations
- Expire reservations
- View reservations by user or book

### 🏷 Publishers & Categories

- CRUD for publishers
- Book categorization

---

# 🧠 Architecture

The project follows **Clean Architecture**, separating responsibilities across layers.

```text
apps/
  api/        → Express API (controllers, routes)
  web/        → Frontend application
domain/       → Business rules and entities
```

### Domain Layer

The **domain layer** contains:

- Entities
- Business rules
- Use cases
- Domain errors

Example:

```text
domain/
  entities/
  errors/
  use-cases/
```

Domain code is **framework independent**.

---

### Application Layer

Responsible for:

- orchestrating use cases
- dependency injection
- connecting domain with infrastructure

---

### Infrastructure Layer

Implements external concerns such as:

- database access
- HTTP controllers
- external services

---

# 🧪 Testing

The project uses **Vitest** for unit testing.

Tests follow the **TDD approach**, validating:

- domain entities
- business rules
- use cases

Run tests:

```bash
yarn test
```

Run tests in watch mode:

```bash
yarn test:watch
```

---

# 🧹 Code Quality

The project enforces code quality with:

- **ESLint**
- **Prettier**
- **TypeScript strict mode**

Verify code quality:

```bash
yarn verify
```

---

# 🚀 Getting Started

## Install dependencies

```bash
yarn install
```

## Run development server

```bash
yarn dev
```

## Build project

```bash
yarn build
```

---

# 🧩 Technologies

Main technologies used in this project:

- **TypeScript**
- **Node.js**
- **Express**
- **Vitest**
- **ESLint**
- **Prettier**

---

# 📂 Project Structure

```text
library-system
│
├── apps
│   ├── api
│   └── web
│
├── domain
│   ├── entities
│   ├── errors
│   └── use-cases
│
├── package.json
└── tsconfig.json
```

---

# 📈 Future Improvements

Possible improvements for the project:

- Docker environment
- CI/CD pipeline
- API documentation with Swagger
- Integration tests
- Authentication middleware
- Rate limiting

---

# 📄 License

MIT
