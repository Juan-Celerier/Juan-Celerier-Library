import type { BookAuthor } from "app-domain/entities/BookAuthor";

export const mockBookAuthors: BookAuthor[] = [
  {
    id: "1",
    name: "Gabriel",
    surname: "García Márquez",
    biography: "Nobel de Literatura colombiano, maestro del realismo mágico.",
    birthDate: new Date("1927-03-06"),
    nationality: "Colombiana",
    image: "https://example.com/images/gabriel-garcia-marquez.jpg",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Isabel",
    surname: "Allende",
    biography:
      "Escritora chilena conocida por sus novelas históricas y familiares.",
    birthDate: new Date("1942-08-02"),
    nationality: "Chilena",
    image: "https://example.com/images/isabel-allende.jpg",
    createdAt: new Date("2023-01-02"),
  },
  {
    id: "3",
    name: "Jorge Luis",
    surname: "Borges",
    biography: "Poeta y ensayista argentino, precursor del realismo mágico.",
    birthDate: new Date("1899-08-24"),
    nationality: "Argentina",
    createdAt: new Date("2023-01-03"),
  },
  {
    id: "4",
    name: "Mario",
    surname: "Vargas Llosa",
    biography: "Nobel peruano, autor de obras como La Ciudad y los Perros.",
    birthDate: new Date("1936-03-28"),
    nationality: "Peruana",
    image: "https://example.com/images/mario-vargas-llosa.jpg",
    createdAt: new Date("2023-01-04"),
  },
  {
    id: "5",
    name: "Elena",
    surname: "Poniatowska",
    biography: "Periodista y escritora mexicana, activista social.",
    birthDate: new Date("1932-05-19"),
    nationality: "Mexicana",
    createdAt: new Date("2023-01-05"),
  },
];
