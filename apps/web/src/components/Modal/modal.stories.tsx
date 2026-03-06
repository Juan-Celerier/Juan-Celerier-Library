import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import Button from "../Button";
import Modal from "./modal";

// --- Componente "controlador" para manejar el estado del modal en Storybook ---
const ModalWithHooks = (
  props: Omit<React.ComponentProps<typeof Modal>, "isOpen" | "onClose">,
) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} {...props} />
    </>
  );
};

// --- Configuración base para Storybook ---
const meta: Meta<typeof Modal> = {
  title: "Design System/UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  // Renderizamos el controlador en lugar del Modal directamente
  render: (args) => <ModalWithHooks {...args} />,
  args: {
    title: "Título del Modal",
    children:
      "Este es el contenido principal del cuerpo del modal. Puedes poner cualquier texto o componente aquí.",
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// --- Historias Individuales ---

// 1. Modal Básico
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simula el clic del usuario en el botón para abrir el modal
    await userEvent.click(canvas.getByRole("button", { name: /Abrir Modal/i }));
  },
};

// 2. Modal con Botones en el Footer
export const WithFooter: Story = {
  args: {
    title: "Confirmar Acción",
    children:
      "¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer.",
    footer: (
      <>
        <Button variant="secondary">Cancelar</Button>
        <Button variant="primary">Sí, Eliminar</Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Abrir Modal/i }));
  },
};

// 3. Modal con Contenido Largo
export const LongContent: Story = {
  args: {
    title: "Términos y Condiciones",
    children: (
      <div className="space-y-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </p>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Abrir Modal/i }));
  },
};
