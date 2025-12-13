import type { Meta, StoryObj } from "@storybook/react";
import { UserActions } from "./UserActions";

const meta: Meta<typeof UserActions> = {
  title: "Components/Common/UserActions",
  component: UserActions,
  tags: ["autodocs"],
  argTypes: {
    isAuthenticated: { control: "boolean" },
    onLoginClick: { action: "login" },
    onLogoutClick: { action: "logout" },
  },
};

export default meta;
type Story = StoryObj<typeof UserActions>;

export const LoggedOut: Story = {
  args: { isAuthenticated: false },
};

export const LoggedIn: Story = {
  args: { isAuthenticated: true, userName: "Estudiante" },
};
