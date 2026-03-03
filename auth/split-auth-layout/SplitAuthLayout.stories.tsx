import type { Meta, StoryObj } from "@storybook/react";
import SplitAuthLayout from "./SplitAuthLayout";
import { Logo, MockForm } from "../../.storybook/helpers";

const meta: Meta<typeof SplitAuthLayout> = {
  title: "Auth/SplitAuth",
  component: SplitAuthLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    panelPosition: { control: "select", options: ["left", "right"] },
    panelRatio: { control: "select", options: ["narrow", "half", "wide"] },
    formMaxWidth: { control: "select", options: ["xs", "sm", "md"] },
  },
};
export default meta;
type Story = StoryObj<typeof SplitAuthLayout>;

const FormContent = () => (
  <div className="space-y-6">
    <Logo />
    <div>
      <h1 className="text-2xl font-bold">Create an account</h1>
      <p className="mt-1 text-sm text-text-secondary">Get started for free</p>
    </div>
    <MockForm />
  </div>
);

const BrandingPanel = () => (
  <div className="flex h-full flex-col items-center justify-center p-12 text-center">
    <div className="text-6xl mb-4">🚀</div>
    <h2 className="text-2xl font-bold">Start building today</h2>
    <p className="mt-2 max-w-xs text-text-secondary">
      Join thousands of developers building with MDigital.
    </p>
  </div>
);

export const Default: Story = {
  args: {
    children: <FormContent />,
    panel: <BrandingPanel />,
  },
};

export const PanelLeft: Story = {
  args: {
    ...Default.args,
    panelPosition: "left",
  },
};

export const WidePanel: Story = {
  args: {
    ...Default.args,
    panelRatio: "wide",
  },
};

export const NarrowPanel: Story = {
  args: {
    ...Default.args,
    panelRatio: "narrow",
  },
};
