import type { Meta, StoryObj } from "@storybook/react";
import HeaderSidebarLayout from "./HeaderSidebarLayout";
import { HeaderBar, SidebarNav, PageContent } from "../../.storybook/helpers";

const meta: Meta<typeof HeaderSidebarLayout> = {
  title: "Dashboard/HeaderSidebarLayout",
  component: HeaderSidebarLayout,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof HeaderSidebarLayout>;

export const Default: Story = {
  args: {
    header: <HeaderBar />,
    sidebar: <SidebarNav />,
    breadcrumbs: (
      <span className="text-text-secondary">Home / Dashboard</span>
    ),
    children: <PageContent />,
  },
};

export const NoBreadcrumbs: Story = {
  args: {
    header: <HeaderBar />,
    sidebar: <SidebarNav />,
    children: <PageContent />,
  },
};

export const WiderSidebar: Story = {
  args: {
    ...Default.args,
    sidebarWidth: 300,
  },
};
