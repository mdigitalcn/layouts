import type { Meta, StoryObj } from "@storybook/react";
import SidebarLayout from "./SidebarLayout";
import { Logo, LogoSmall, PageContent, navItems } from "../../.storybook/helpers";

const meta: Meta<typeof SidebarLayout> = {
  title: "Dashboard/SidebarLayout",
  component: SidebarLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: { control: "select", options: ["fixed", "collapsible"] },
  },
};
export default meta;
type Story = StoryObj<typeof SidebarLayout>;

export const Fixed: Story = {
  args: {
    navItems,
    sidebarHeader: <div className="p-1"><Logo /></div>,
    header: (
      <div className="flex items-center px-4 py-2 font-medium">Dashboard</div>
    ),
    children: <PageContent />,
  },
};

export const Collapsible: Story = {
  args: {
    ...Fixed.args,
    variant: "collapsible",
    defaultCollapsed: false,
  },
};

export const CollapsedByDefault: Story = {
  args: {
    ...Fixed.args,
    variant: "collapsible",
    defaultCollapsed: true,
    sidebarHeader: (
      <div className="flex justify-center p-1">
        <LogoSmall />
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    ...Fixed.args,
    sidebarFooter: (
      <div className="flex items-center gap-2 text-sm">
        <div className="h-7 w-7 rounded-full bg-primary/20" />
        <span className="truncate text-text-secondary">user@email.com</span>
      </div>
    ),
    footer: (
      <div className="px-4 py-2 text-xs text-text-secondary">
        © 2026 MDigital
      </div>
    ),
    children: <PageContent />,
  },
};
