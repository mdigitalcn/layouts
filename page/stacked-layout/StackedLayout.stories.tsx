import type { Meta, StoryObj } from "@storybook/react";
import StackedLayout from "./StackedLayout";
import { HeaderBar, PageContent } from "../../.storybook/helpers";

const meta: Meta<typeof StackedLayout> = {
  title: "Page/StackedLayout",
  component: StackedLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    maxWidth: { control: "select", options: ["sm", "md", "lg", "xl", "2xl", "full"] },
    stickyHeader: { control: "boolean" },
    blurHeader: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof StackedLayout>;

const Tabs = () => (
  <div className="flex items-center gap-4 text-sm">
    {["All", "Active", "Archived"].map((tab, i) => (
      <button
        key={tab}
        className={
          i === 0
            ? "border-b-2 border-primary pb-1 font-medium text-primary"
            : "pb-1 text-text-secondary"
        }
      >
        {tab}
      </button>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    header: <HeaderBar />,
    subheader: <Tabs />,
    footer: (
      <div className="py-4 text-center text-sm text-text-secondary">
        © 2026 mdigitalcn
      </div>
    ),
    maxWidth: "xl",
    children: <PageContent />,
  },
};

export const FullWidth: Story = {
  args: { ...Default.args, maxWidth: "full" },
};

export const NoStickyHeader: Story = {
  args: { ...Default.args, stickyHeader: false, blurHeader: false },
};

export const Minimal: Story = {
  args: {
    header: <HeaderBar />,
    children: <PageContent />,
  },
};
