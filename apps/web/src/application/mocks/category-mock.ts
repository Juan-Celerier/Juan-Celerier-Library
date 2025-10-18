import type { Category } from "app-domain/entities/Category";

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Ficción",
    description:
      "Novelas y relatos imaginarios que exploran la condición humana.",
    image: "https://example.com/images/ficcion.jpg",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Tecnología",
    description: "Libros sobre innovación, programación y avances científicos.",
    image: "https://example.com/images/tecnologia.jpg",
    createdAt: new Date("2023-01-02"),
  },
  {
    id: "3",
    name: "Historia",
    description:
      "Relatos de eventos pasados, biografías y análisis históricos.",
    createdAt: new Date("2023-01-03"),
  },
  {
    id: "4",
    name: "Arte",
    description:
      "Obras sobre pintura, escultura, arquitectura y cultura visual.",
    image: "https://example.com/images/arte.jpg",
    createdAt: new Date("2023-01-04"),
  },
  {
    id: "5",
    name: "Ciencia",
    description: "Textos sobre física, biología, astronomía y descubrimientos.",
    createdAt: new Date("2023-01-05"),
  },
  {
    id: "6",
    name: "Negocios",
    description: "Guías de emprendimiento, management y economía.",
    image: "https://example.com/images/negocios.jpg",
    createdAt: new Date("2023-01-06"),
  },
];
