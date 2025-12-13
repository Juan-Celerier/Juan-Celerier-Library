import type { Meta, StoryObj } from "@storybook/react";
import SearchBox from "./Search";

const meta: Meta<typeof SearchBox> = {
  title: "Components/Common/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
  argTypes: {
    onSearchChange: { action: "search changed" },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {};
