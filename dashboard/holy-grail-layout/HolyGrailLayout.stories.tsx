import type { Meta, StoryObj } from "@storybook/react";
import HolyGrailLayout from "./HolyGrailLayout";
import { HeaderBar, SidebarNav, PageContent, Placeholder } from "../../.storybook/helpers";

const meta: Meta<typeof HolyGrailLayout> = {
  title: "Dashboard/HolyGrailLayout",
  component: HolyGrailLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    rightPanelOpen: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof HolyGrailLayout>;

const RightPanel = () => (
  <div className="space-y-4 p-4">
    <h3 className="text-sm font-semibold">Details</h3>
    <Placeholder label="Info card" className="h-24" />
    <Placeholder label="Activity" className="h-32" />
    <Placeholder label="Related" className="h-20" />
  </div>
);

export const Default: Story = {
  args: {
    header: <HeaderBar />,
    leftSidebar: <SidebarNav />,
    rightPanel: <RightPanel />,
    children: <PageContent />,
  },
};

export const NoRightPanel: Story = {
  args: {
    ...Default.args,
    rightPanel: undefined,
  },
};

export const RightPanelClosed: Story = {
  args: {
    ...Default.args,
    rightPanelOpen: false,
  },
};

export const WithFooter: Story = {
  args: {
    ...Default.args,
    footer: (
      <div className="px-4 py-2 text-xs text-text-secondary">
        3 items selected • Last updated 5 min ago
      </div>
    ),
  },
};
