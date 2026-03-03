import type { Meta, StoryObj } from "@storybook/react";
import InsetSidebarLayout from "./InsetSidebarLayout";
import { HeaderBar, SidebarNav, PageContent } from "../../.storybook/helpers";

const meta: Meta<typeof InsetSidebarLayout> = {
  title: "Dashboard/InsetSidebarLayout",
  component: InsetSidebarLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    sidebarPosition: { control: "select", options: ["left", "right"] },
    gap: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof InsetSidebarLayout>;

export const Left: Story = {
  args: {
    sidebar: <SidebarNav />,
    header: <HeaderBar />,
    sidebarPosition: "left",
    children: <PageContent />,
  },
};

export const Right: Story = {
  args: { ...Left.args, sidebarPosition: "right" },
};

export const LargeGap: Story = {
  args: { ...Left.args, gap: "lg" },
};

export const SmallGap: Story = {
  args: { ...Left.args, gap: "sm" },
};
