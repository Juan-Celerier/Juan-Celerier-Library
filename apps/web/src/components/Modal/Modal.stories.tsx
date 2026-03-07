import type { Meta, StoryObj } from "@storybook/react";
import Button from "../Button";
import { useState } from "react";
import Modal from "./modal";

/**
 * Modal es un componente para mostrar contenido en una ventana superpuesta.
 * Bloquea la interacción con el contenido de fondo hasta que se cierre.
 */
const meta: Meta<typeof Modal> = {
  title: "Design System/Layouting/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controla si el modal está abierto o cerrado",
    },
    title: {
      control: "text",
      description: "Título del modal",
    },
    onClose: {
      description: "Callback cuando se cierra el modal",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Modal abierto con contenido simple
 */
export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
        <Modal
          isOpen={isOpen}
          title="Modal Básico"
          onClose={() => setIsOpen(false)}
        >
          <p>Este es un modal simple con contenido de texto.</p>
        </Modal>
      </>
    );
  },
};

/**
 * Modal con acciones (botones)
 */
export const WithActions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Confirmar Acción</Button>
        <Modal
          isOpen={isOpen}
          title="¿Estás seguro?"
          onClose={() => setIsOpen(false)}
        >
          <div className="space-y-4">
            <p>
              ¿Deseas proceder con esta acción? Esta operación no se puede
              deshacer.
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirmar
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Modal de formulario
 */
export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Nuevo Libro</Button>
        <Modal
          isOpen={isOpen}
          title="Agregar Nuevo Libro"
          onClose={() => setIsOpen(false)}
        >
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <input
                type="text"
                placeholder="Título del libro"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Autor</label>
              <input
                type="text"
                placeholder="Nombre del autor"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ISBN</label>
              <input
                type="text"
                placeholder="ISBN"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Guardar
              </Button>
            </div>
          </form>
        </Modal>
      </>
    );
  },
};

/**
 * Modal de información
 */
export const InfoModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Ver Información</Button>
        <Modal
          isOpen={isOpen}
          title="Información de Ayuda"
          onClose={() => setIsOpen(false)}
        >
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-semibold mb-1">¿Cómo reservar un libro?</h4>
              <p>Selecciona el libro de tu interés y haz clic en "Reservar".</p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Período de préstamo</h4>
              <p>Los libros se pueden tomar prestados por 14 días.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Multas por atrasos</h4>
              <p>Se aplica una multa de $1.00 por día de retraso.</p>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Entendido
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Modal con contenido largo (scrollable)
 */
export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Términos y Condiciones</Button>
        <Modal
          isOpen={isOpen}
          title="Términos y Condiciones"
          onClose={() => setIsOpen(false)}
        >
          <div className="max-h-96 overflow-y-auto space-y-4 text-sm">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis.
            </p>

            <div className="flex gap-2 justify-end pt-4 border-t">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Rechazar
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Aceptar
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};
