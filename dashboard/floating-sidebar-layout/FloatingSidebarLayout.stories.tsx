import type { Meta, StoryObj } from "@storybook/react";
import FloatingSidebarLayout from "./FloatingSidebarLayout";
import { Logo, PageContent, navItems } from "../../.storybook/helpers";

const meta: Meta<typeof FloatingSidebarLayout> = {
  title: "Dashboard/FloatingSidebarLayout",
  component: FloatingSidebarLayout,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof FloatingSidebarLayout>;

export const Default: Story = {
  args: {
    navItems,
    sidebarHeader: (
      <div className="p-1">
        <Logo />
      </div>
    ),
    header: (
      <div className="flex items-center px-4 py-3 font-medium">Dashboard</div>
    ),
    children: <PageContent />,
  },
};

export const WithFooter: Story = {
  args: {
    ...Default.args,
    sidebarFooter: (
      <div className="flex items-center gap-2 text-sm">
        <div className="h-7 w-7 rounded-full bg-primary/20" />
        <span className="truncate text-text-secondary">user@email.com</span>
      </div>
    ),
  },
};

export const WiderInset: Story = {
  args: {
    ...Default.args,
    inset: 20,
  },
};

export const NarrowSidebar: Story = {
  args: {
    ...Default.args,
    sidebarWidth: 200,
  },
};
