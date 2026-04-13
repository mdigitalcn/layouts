import type { Meta, StoryObj } from "@storybook/react";
import DocsLayout from "./DocsLayout";
import { Logo } from "../../.storybook/helpers";

const meta: Meta<typeof DocsLayout> = {
  title: "Page/DocsLayout",
  component: DocsLayout,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof DocsLayout>;

const sidebarItems = [
  {
    id: "getting-started",
    label: "Getting Started",
    active: true,
    children: [
      { id: "installation", label: "Installation", href: "#", active: true },
      { id: "quickstart", label: "Quick Start", href: "#" },
      { id: "configuration", label: "Configuration", href: "#" },
    ],
  },
  {
    id: "components",
    label: "Components",
    children: [
      { id: "button", label: "Button", href: "#" },
      { id: "input", label: "Input", href: "#" },
      { id: "card", label: "Card", href: "#" },
      { id: "modal", label: "Modal", href: "#" },
    ],
  },
  {
    id: "layouts",
    label: "Layouts",
    children: [
      { id: "sidebar", label: "Sidebar", href: "#" },
      { id: "stacked", label: "Stacked", href: "#" },
    ],
  },
];

const tocItems = [
  { id: "overview", label: "Overview", level: 1, active: true },
  { id: "prerequisites", label: "Prerequisites", level: 2 },
  { id: "install", label: "Install", level: 1 },
  { id: "npm", label: "npm", level: 2 },
  { id: "pnpm", label: "pnpm", level: 2 },
  { id: "usage", label: "Basic Usage", level: 1 },
  { id: "next-steps", label: "Next Steps", level: 1 },
];

const DocContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold" id="overview">Installation</h1>
    <p className="text-text-secondary leading-relaxed">
      Learn how to install and set up mdigitalcn UI in your project.
    </p>
    <h2 className="text-xl font-semibold" id="prerequisites">Prerequisites</h2>
    <ul className="list-disc pl-6 space-y-1 text-text-secondary">
      <li>Node.js 18+</li>
      <li>React 19+</li>
      <li>Tailwind CSS v4+</li>
    </ul>
    <h2 className="text-xl font-semibold" id="install">Install</h2>
    <div className="rounded-lg bg-surface p-4 font-mono text-sm">
      <div className="text-text-secondary"># Using pnpm</div>
      <div>pnpm add @mdigitalcn/uikit</div>
    </div>
    <h2 className="text-xl font-semibold" id="usage">Basic Usage</h2>
    <div className="rounded-lg bg-surface p-4 font-mono text-sm">
      <div className="text-text-secondary">{"// Import a component"}</div>
      <div>{"import Button from '@mdigitalcn/uikit/button'"}</div>
    </div>
    <h2 className="text-xl font-semibold" id="next-steps">Next Steps</h2>
    <p className="text-text-secondary leading-relaxed">
      Check out the component documentation to explore what&apos;s available.
    </p>
  </div>
);

const Navbar = () => (
  <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
    <Logo />
    <span className="text-sm text-text-secondary">Docs</span>
    <div className="ml-auto">
      <input
        type="search"
        placeholder="Search docs..."
        className="w-48 rounded-md border border-border bg-surface/50 px-3 py-1.5 text-sm placeholder:text-text-secondary"
      />
    </div>
  </div>
);

const Pagination = () => (
  <div className="flex justify-between">
    <a href="#" className="text-sm text-text-secondary hover:text-primary">
      ← Getting Started
    </a>
    <a href="#" className="text-sm text-primary hover:underline">
      Quick Start →
    </a>
  </div>
);

export const Default: Story = {
  args: {
    header: <Navbar />,
    sidebarItems,
    toc: tocItems,
    pagination: <Pagination />,
    children: <DocContent />,
  },
};

export const NoToc: Story = {
  args: {
    ...Default.args,
    toc: undefined,
  },
};
