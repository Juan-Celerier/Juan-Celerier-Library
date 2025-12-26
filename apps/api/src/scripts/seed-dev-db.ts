import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data.js";
import { AuthorEntity } from "../entities/author.entity.js";
import { BookEntity } from "../entities/book.entity.js";
import { CategoryEntity } from "../entities/category.entity.js";
import { LoanEntity } from "../entities/loan.entity.js";
import { PublisherEntity } from "../entities/publisher-entity.js";
import { ReservationEntity } from "../entities/reservation.entity.js";
import { UserEntity } from "../entities/user.entity.js";

async function seedDevDB() {
  const ds = await AppDataSource.initialize();
  const em = ds.manager;

  // Crear categorías
  const categories = await em.save(CategoryEntity, [
    { name: "Ficción" },
    { name: "Historia" },
  ]);

  // Crear autores
  const authors = await em.save(AuthorEntity, [
    {
      firstName: "Gabriel",
      lastName: "García Márquez",
      biography: "Nobel Prize winner",
      birthDate: new Date("1927-03-06"),
      nationality: "Colombian",
      isPopular: true,
    },
    {
      firstName: "Isabel",
      lastName: "Allende",
      biography: "Famous Chilean author",
      birthDate: new Date("1942-08-02"),
      nationality: "Chilean",
      isPopular: true,
    },
  ]);

  // Crear publishers
  const publishers = await em.save(PublisherEntity, [
    { name: "Penguin" },
    { name: "Debate" },
  ]);

  // Crear usuarios
  const hashedAdminPassword = await bcrypt.hash("password123", 12);
  const hashedUserPassword = await bcrypt.hash("password123", 12);

  const users = await em.save(UserEntity, [
    {
      name: "Admin",
      email: "admin@test.com",
      hashedPassword: hashedAdminPassword,
      role: "LIBRARIAN",
    },
    {
      name: "User",
      email: "user@test.com",
      hashedPassword: hashedUserPassword,
      role: "BORROWER",
    },
  ]);

  // Crear libros
  const books = await em.save(BookEntity, [
    {
      title: "1984",
      category: categories[0],
      author: authors[0],
      publisher: publishers[0],
    },
    {
      title: "Sapiens: De animales a dioses",
      category: categories[1],
      author: authors[1],
      publisher: publishers[1],
    },
  ]);

  // Crear préstamos
  await em.save(LoanEntity, [
    {
      user: users[1],
      book: books[0],
      loanDate: new Date("2025-09-01"),
      returnDate: null,
    },
  ]);

  // Crear reservas
  await em.save(ReservationEntity, [
    {
      user: users[1],
      book: books[1],
      reservedAt: new Date("2025-09-10"),
    },
  ]);

  console.log("✅ Seed de desarrollo completado");
  await ds.destroy();
}

seedDevDB().catch((err) => {
  console.error("❌ Error en el seed", err);
});
