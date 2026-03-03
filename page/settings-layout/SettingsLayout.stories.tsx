import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SettingsLayout from "./SettingsLayout";
import { HeaderBar, Placeholder } from "../../.storybook/helpers";

const meta: Meta<typeof SettingsLayout> = {
  title: "Page/SettingsLayout",
  component: SettingsLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    maxWidth: { control: "select", options: ["md", "lg", "xl", "2xl"] },
  },
};
export default meta;
type Story = StoryObj<typeof SettingsLayout>;

const settingsNav = [
  { id: "profile", label: "Profile", group: "Account", active: true },
  { id: "security", label: "Security", group: "Account" },
  { id: "notifications", label: "Notifications", group: "Account" },
  { id: "billing", label: "Billing", group: "Organization" },
  { id: "team", label: "Team members", group: "Organization" },
  { id: "integrations", label: "Integrations", group: "Organization" },
  { id: "api", label: "API Keys", group: "Developer" },
  { id: "webhooks", label: "Webhooks", group: "Developer" },
];

const SettingsContent = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-lg font-semibold">Profile</h2>
      <p className="text-sm text-text-secondary">
        Manage your account profile and preferences.
      </p>
    </div>
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Display name</label>
        <input
          type="text"
          defaultValue="John Doe"
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          defaultValue="john@example.com"
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Bio</label>
        <textarea
          rows={3}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          placeholder="Tell us about yourself..."
        />
      </div>
      <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white">
        Save changes
      </button>
    </div>
  </div>
);

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("profile");
    return (
      <SettingsLayout
        header={<HeaderBar />}
        title="Settings"
        description="Manage your account settings and preferences."
        navItems={settingsNav.map((n) => ({ ...n, active: n.id === active }))}
        onNavSelect={setActive}
      >
        <SettingsContent />
      </SettingsLayout>
    );
  },
};

export const NoHeader: Story = {
  args: {
    title: "Settings",
    description: "Manage your account settings and preferences.",
    navItems: settingsNav,
    children: <SettingsContent />,
  },
};

export const Compact: Story = {
  args: {
    ...NoHeader.args,
    maxWidth: "lg",
    navWidth: 180,
  },
};
