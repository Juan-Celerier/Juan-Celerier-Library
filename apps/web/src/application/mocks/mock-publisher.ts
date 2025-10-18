import type { Publisher } from "app-domain/entities/Publisher";

export const mockPublishers: Publisher[] = [
  {
    id: "1",
    name: "Penguin Random House",
    address: "Calle de la Literatura 123, Madrid, España",
    phone: "+34 91 123 4567",
    email: "info@penguin.com",
    image: "https://example.com/images/penguin.jpg",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Planeta",
    address: "Avenida de los Libros 456, Barcelona, España",
    phone: "+34 93 765 4321",
    email: "contacto@planeta.es",
    createdAt: new Date("2023-01-02"),
  },
  {
    id: "3",
    name: "Anagrama",
    address: "Ronda de la Cultura 789, Barcelona, España",
    phone: "+34 93 987 6543",
    email: "editorial@anagrama.es",
    image: "https://example.com/images/anagrama.jpg",
    createdAt: new Date("2023-01-03"),
  },
  {
    id: "4",
    name: "Seix Barral",
    address: "Paseo del Saber 101, Barcelona, España",
    phone: "+34 93 111 2223",
    email: "info@seixbarral.es",
    createdAt: new Date("2023-01-04"),
  },
];
