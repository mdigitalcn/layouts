import type { Meta, StoryObj } from "@storybook/react";
import TopnavLayout from "./TopnavLayout";
import { Logo, PageContent } from "../../.storybook/helpers";

const meta: Meta<typeof TopnavLayout> = {
  title: "Page/TopnavLayout",
  component: TopnavLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    maxWidth: { control: "select", options: ["sm", "md", "lg", "xl", "2xl", "full"] },
    sticky: { control: "boolean" },
    blurHeader: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof TopnavLayout>;

const topNavItems = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Projects", href: "#" },
  { label: "Team", href: "#" },
  { label: "Reports", href: "#" },
];

export const Default: Story = {
  args: {
    logo: <Logo />,
    navItems: topNavItems,
    actions: (
      <div className="flex items-center gap-2">
        <button className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-surface">
          Sign in
        </button>
        <button className="rounded-md bg-primary px-3 py-1.5 text-sm text-white">
          Get started
        </button>
      </div>
    ),
    sticky: true,
    children: <PageContent />,
  },
};

export const Constrained: Story = {
  args: { ...Default.args, maxWidth: "lg" },
};

export const NoBlur: Story = {
  args: { ...Default.args, blurHeader: false },
};

export const LogoOnly: Story = {
  args: {
    logo: <Logo />,
    actions: (
      <button className="rounded-md bg-primary px-3 py-1.5 text-sm text-white">
        Get started
      </button>
    ),
    children: <PageContent />,
  },
};
