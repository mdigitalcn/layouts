import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DualSidebarLayout from "./DualSidebarLayout";
import { PageContent } from "../../.storybook/helpers";

const meta: Meta<typeof DualSidebarLayout> = {
  title: "Dashboard/DualSidebarLayout",
  component: DualSidebarLayout,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof DualSidebarLayout>;

const railItems = [
  { id: "files", icon: <span>📁</span>, label: "Files", active: true },
  { id: "search", icon: <span>🔍</span>, label: "Search" },
  { id: "git", icon: <span>🔀</span>, label: "Git" },
  { id: "debug", icon: <span>🐛</span>, label: "Debug" },
  { id: "extensions", icon: <span>🧩</span>, label: "Extensions" },
];

const FileTree = () => (
  <div className="space-y-1 p-2 text-sm">
    {[
      "src/",
      "  components/",
      "    Button.tsx",
      "    Input.tsx",
      "  pages/",
      "    Home.tsx",
      "  App.tsx",
      "  main.tsx",
      "package.json",
    ].map((f, i) => (
      <div
        key={i}
        className="cursor-pointer rounded px-2 py-1 font-mono text-xs hover:bg-surface"
      >
        {f}
      </div>
    ))}
  </div>
);

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("files");
    return (
      <DualSidebarLayout
        railItems={railItems.map((r) => ({ ...r, active: r.id === active }))}
        onRailSelect={setActive}
        sidePanel={<FileTree />}
        sidePanelTitle="Explorer"
        header={
          <div className="flex items-center px-4 py-2 text-sm font-medium">
            editor — main.tsx
          </div>
        }
      >
        <PageContent />
      </DualSidebarLayout>
    );
  },
};

export const WithRailFooter: Story = {
  render: () => {
    const [active, setActive] = useState("files");
    return (
      <DualSidebarLayout
        railItems={railItems.map((r) => ({ ...r, active: r.id === active }))}
        onRailSelect={setActive}
        sidePanel={<FileTree />}
        sidePanelTitle="Explorer"
        railFooter={
          <div className="flex flex-col items-center gap-1">
            <button className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary hover:bg-surface">
              ⚙️
            </button>
          </div>
        }
        header={
          <div className="flex items-center px-4 py-2 text-sm font-medium">
            editor — main.tsx
          </div>
        }
      >
        <PageContent />
      </DualSidebarLayout>
    );
  },
};
