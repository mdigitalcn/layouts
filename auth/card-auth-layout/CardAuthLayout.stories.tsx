import type { Meta, StoryObj } from "@storybook/react";
import CardAuthLayout from "./CardAuthLayout";
import { Logo, MockForm } from "../../.storybook/helpers";

const meta: Meta<typeof CardAuthLayout> = {
  title: "Auth/CardAuth",
  component: CardAuthLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    background: { control: "select", options: ["plain", "gradient", "dots", "grid"] },
    maxWidth: { control: "select", options: ["xs", "sm", "md"] },
    cardVariant: { control: "select", options: ["elevated", "outlined", "flat"] },
  },
};
export default meta;
type Story = StoryObj<typeof CardAuthLayout>;

const baseArgs = {
  logo: <Logo />,
  title: "Welcome back",
  description: "Sign in to continue",
  children: <MockForm />,
  footer: (
    <span>
      No account?{" "}
      <a href="#" className="text-primary hover:underline">Sign up</a>
    </span>
  ),
};

export const Gradient: Story = {
  args: { ...baseArgs, background: "gradient" },
};

export const Dots: Story = {
  args: { ...baseArgs, background: "dots" },
};

export const Grid: Story = {
  args: { ...baseArgs, background: "grid" },
};

export const Plain: Story = {
  args: { ...baseArgs, background: "plain" },
};

export const Elevated: Story = {
  args: { ...baseArgs, cardVariant: "elevated" },
};

export const Outlined: Story = {
  args: { ...baseArgs, cardVariant: "outlined" },
};

export const Flat: Story = {
  args: { ...baseArgs, cardVariant: "flat", background: "dots" },
};
