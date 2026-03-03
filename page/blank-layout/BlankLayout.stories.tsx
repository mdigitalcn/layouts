import type { Meta, StoryObj } from "@storybook/react";
import BlankLayout from "./BlankLayout";
import { Placeholder } from "../../.storybook/helpers";

const meta: Meta<typeof BlankLayout> = {
  title: "Page/BlankLayout",
  component: BlankLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    maxWidth: { control: "select", options: ["sm", "md", "lg", "xl", "2xl", "full"] },
    centered: { control: "boolean" },
    padding: { control: "select", options: ["none", "sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof BlankLayout>;

export const Default: Story = {
  args: {
    maxWidth: "lg",
    children: (
      <div className="space-y-4 py-8">
        <h1 className="text-2xl font-bold">Blank Layout</h1>
        <p className="text-text-secondary">
          Content with optional max-width constraint.
        </p>
        <Placeholder label="Your content here" className="h-64" />
      </div>
    ),
  },
};

export const Centered: Story = {
  args: {
    maxWidth: "sm",
    centered: true,
    children: (
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Centered</h1>
        <p className="text-text-secondary">
          Vertically and horizontally centered.
        </p>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    maxWidth: "full",
    padding: "none",
    children: <Placeholder label="Edge-to-edge content" className="h-96" />,
  },
};
