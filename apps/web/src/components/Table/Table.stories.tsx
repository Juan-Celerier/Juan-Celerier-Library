import type { Meta, StoryObj } from "@storybook/react";
import Button from "../Button";
import Table, { type ColumnDef } from "./Table";

// --- Tipos y Datos de Ejemplo (basados en tu entidad 'Book') ---
interface Book {
  id: string;
  title: string;
  author: string;
  publicationDate: Date;
  availableCopies: number;
}

const sampleBooks: Book[] = [
  {
    id: "1",
    title: "El Señor de los Anillos",
    author: "J.R.R. Tolkien",
    publicationDate: new Date("1954-07-29"),
    availableCopies: 3,
  },
  {
    id: "2",
    title: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    publicationDate: new Date("1967-05-30"),
    availableCopies: 0,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    publicationDate: new Date("1949-06-08"),
    availableCopies: 5,
  },
  {
    id: "4",
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    publicationDate: new Date("1605-01-16"),
    availableCopies: 1,
  },
];

// --- Definición de las Columnas ---
const columns: ColumnDef<Book>[] = [
  {
    header: "Título",
    cell: (row: {
      title:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | null
        | undefined;
    }) => <span className="font-medium">{row.title}</span>,
  },
  {
    header: "Autor",
    cell: (row: { author: any }) => row.author,
  },
  {
    header: "Publicación",
    cell: (row: { publicationDate: { toLocaleDateString: () => any } }) =>
      row.publicationDate.toLocaleDateString(),
  },
  {
    header: "Copias Disponibles",
    cell: (row: {
      availableCopies:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | null
        | undefined;
    }) => (
      <span
        className={`font-bold ${0 ? "text-academy-green" : "text-red-500"}`}
      >
        {row.availableCopies}
      </span>
    ),
  },
  {
    header: "Acciones",
    cell: () => (
      <div className="flex space-x-2">
        <Button size="sm" variant="ghost">
          Editar
        </Button>
        <Button size="sm" variant="secondary">
          Prestar
        </Button>
      </div>
    ),
  },
];

// --- Configuración base para Storybook ---
const meta: Meta<typeof Table<Book>> = {
  title: "Design System/UI/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    // Args por defecto para todas las historias
    data: sampleBooks,
    columns: columns,
  },
};

export default meta;
type Story = StoryObj<typeof Table<Book>>;

// --- Historias Individuales ---

// 1. Tabla por Defecto
export const Default: Story = {};

// 2. Tabla con Título (Caption)
export const WithCaption: Story = {
  args: {
    caption: "Listado de Libros Disponibles",
  },
};

// 3. Tabla Vacía
export const Empty: Story = {
  args: {
    data: [], // Pasamos un array vacío para mostrar el estado "sin datos"
  },
};
