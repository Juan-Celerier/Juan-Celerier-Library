import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./index";
import Button from "../Button";

/**
 * Card es un componente contenedor versátil para agrupar contenido relacionado.
 * Se utiliza en dashboards, listas de items, y secciones de contenido.
 */
const meta: Meta<typeof Card> = {
  title: "Design System/Layouting/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Card básica con contenido simple
 */
export const Basic: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description or subtitle</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Este es un ejemplo de contenido dentro de una tarjeta. Puede incluir
          texto, imágenes u otros elementos.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card con acciones en el footer
 */
export const WithActions: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Libro Destacado</CardTitle>
        <CardDescription>
          Nuestro libro recomendado de esta semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="font-semibold">El Quijote</p>
          <p className="text-sm text-gray-600">Miguel de Cervantes Saavedra</p>
          <p className="text-sm text-amber-600 font-medium">★★★★★ (4.8)</p>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="primary" size="sm" className="flex-1">
          Reservar
        </Button>
        <Button variant="secondary" size="sm" className="flex-1">
          Detalles
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Card con contenido de usuario
 */
export const UserProfile: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold">JD</span>
          </div>
          <div>
            <CardTitle>Juan Diaz</CardTitle>
            <CardDescription>juan.diaz@example.com</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Préstamos activos:</span>
            <span className="font-semibold">3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Reservas:</span>
            <span className="font-semibold">1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Multas pendientes:</span>
            <span className="font-semibold text-red-600">$0.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

/**
 * Card sin bordes (flat)
 */
export const Flat: Story = {
  render: () => (
    <Card className="w-full max-w-sm border-0 bg-gray-50">
      <CardHeader>
        <CardTitle>Card Flat</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Esta tarjeta tiene un estilo más plano sin bordes prominentes, ideal
          para dashboards.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card hover con efectos
 */
export const Interactive: Story = {
  render: () => (
    <Card className="w-full max-w-sm cursor-pointer transition-all hover:shadow-lg hover:scale-105">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Pasa el ratón para ver el efecto</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Esta tarjeta responde a la interacción del usuario con sombra y
          escala.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Múltiples cards en grid (ejemplo de uso común)
 */
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      {[1, 2, 3].map((num) => (
        <Card key={num}>
          <CardHeader>
            <CardTitle>Libro {num}</CardTitle>
            <CardDescription>Autor Nombre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-200 rounded mb-2"></div>
            <p className="text-sm text-amber-600 font-medium">★★★★☆ (4.2)</p>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm" className="w-full">
              Ver más
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};
