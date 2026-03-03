import type { Meta, StoryObj } from "@storybook/react";
import CenteredAuthLayout from "./CenteredAuthLayout";
import { Logo, MockForm } from "../../.storybook/helpers";

const meta: Meta<typeof CenteredAuthLayout> = {
  title: "Auth/CenteredAuth",
  component: CenteredAuthLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    maxWidth: { control: "select", options: ["xs", "sm", "md"] },
    background: { control: "select", options: ["plain", "subtle", "gradient"] },
  },
};
export default meta;
type Story = StoryObj<typeof CenteredAuthLayout>;

export const Default: Story = {
  args: {
    logo: <Logo />,
    title: "Welcome back",
    description: "Sign in to your account",
    children: <MockForm />,
    footer: (
      <span>
        Don&apos;t have an account?{" "}
        <a href="#" className="text-primary hover:underline">Sign up</a>
      </span>
    ),
  },
};

export const Minimal: Story = {
  args: {
    title: "Sign in",
    children: <MockForm />,
  },
};

export const Gradient: Story = {
  args: {
    ...Default.args,
    background: "gradient",
  },
};

export const Narrow: Story = {
  args: {
    ...Default.args,
    maxWidth: "xs",
  },
};
