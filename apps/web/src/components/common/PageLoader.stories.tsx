import type { Meta, StoryObj } from "@storybook/react";
import { PageLoader } from "./PageLoader";

const meta: Meta<typeof PageLoader> = {
  title: "Components/Common/PageLoader",
  component: PageLoader,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageLoader>;

export const Default: Story = {};

export const FullScreen: Story = {
  args: {
    fullScreen: true,
    text: "Preparando la biblioteca...",
  },
  parameters: {
    layout: "fullscreen",
  },
};
