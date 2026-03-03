import type { Meta, StoryObj } from "@storybook/react";
import WizardLayout from "./WizardLayout";
import { Logo, MockForm } from "../../.storybook/helpers";

const meta: Meta<typeof WizardLayout> = {
  title: "Page/WizardLayout",
  component: WizardLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    maxWidth: { control: "select", options: ["sm", "md", "lg"] },
    stepPosition: { control: "select", options: ["top", "left"] },
  },
};
export default meta;
type Story = StoryObj<typeof WizardLayout>;

const steps = [
  { id: "account", label: "Account", description: "Create your account", status: "completed" as const },
  { id: "profile", label: "Profile", description: "Set up your profile", status: "active" as const },
  { id: "workspace", label: "Workspace", description: "Create a workspace", status: "upcoming" as const },
  { id: "invite", label: "Invite", description: "Invite team members", status: "upcoming" as const },
];

const StepContent = () => (
  <div className="space-y-4">
    <div>
      <label className="text-sm font-medium">Display name</label>
      <input
        type="text"
        placeholder="John Doe"
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
    <div>
      <label className="text-sm font-medium">Avatar URL</label>
      <input
        type="url"
        placeholder="https://..."
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </div>
  </div>
);

const Actions = () => (
  <div className="flex justify-between">
    <button className="rounded-md border border-border px-4 py-2 text-sm hover:bg-surface">
      Back
    </button>
    <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white">
      Continue
    </button>
  </div>
);

export const TopSteps: Story = {
  args: {
    logo: <Logo />,
    steps,
    title: "Set up your profile",
    description: "Tell us a bit about yourself to get started.",
    actions: <Actions />,
    stepPosition: "top",
    children: <StepContent />,
  },
};

export const LeftSteps: Story = {
  args: {
    ...TopSteps.args,
    stepPosition: "left",
  },
};

export const FirstStep: Story = {
  args: {
    ...TopSteps.args,
    steps: steps.map((s, i) =>
      i === 0
        ? { ...s, status: "active" as const }
        : { ...s, status: "upcoming" as const },
    ),
    title: "Create your account",
    description: "Enter your email and password to get started.",
    children: <MockForm />,
  },
};

export const LastStep: Story = {
  args: {
    ...TopSteps.args,
    steps: steps.map((s, i) =>
      i < 3
        ? { ...s, status: "completed" as const }
        : { ...s, status: "active" as const },
    ),
    title: "Invite your team",
    description: "Add team members to your workspace.",
    children: (
      <div className="space-y-3">
        {["teammate@company.com", "designer@company.com"].map((email) => (
          <div key={email} className="flex items-center gap-3 rounded-md border border-border p-3">
            <div className="h-8 w-8 rounded-full bg-primary/20" />
            <span className="text-sm">{email}</span>
            <button className="ml-auto text-xs text-text-secondary hover:text-red-500">
              Remove
            </button>
          </div>
        ))}
        <input
          type="email"
          placeholder="Enter email address..."
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
    ),
  },
};
