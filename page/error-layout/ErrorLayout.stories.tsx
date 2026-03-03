import type { Meta, StoryObj } from "@storybook/react";
import ErrorLayout from "./ErrorLayout";

const meta: Meta<typeof ErrorLayout> = {
  title: "Page/ErrorLayout",
  component: ErrorLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    showCode: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof ErrorLayout>;

export const NotFound: Story = {
  args: {
    code: 404,
    title: "Page not found",
    description:
      "Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.",
    actions: (
      <div className="flex gap-3">
        <a
          href="#"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          Go home
        </a>
        <button className="rounded-md border border-border px-4 py-2 text-sm hover:bg-surface">
          Go back
        </button>
      </div>
    ),
  },
};

export const ServerError: Story = {
  args: {
    code: 500,
    title: "Something went wrong",
    description:
      "An unexpected error occurred. Our team has been notified and is working on a fix.",
    actions: (
      <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white">
        Try again
      </button>
    ),
  },
};

export const Forbidden: Story = {
  args: {
    code: 403,
    title: "Access denied",
    description:
      "You don't have permission to access this resource. Contact your administrator.",
    actions: (
      <div className="flex gap-3">
        <a
          href="#"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          Go home
        </a>
        <a
          href="#"
          className="rounded-md border border-border px-4 py-2 text-sm hover:bg-surface"
        >
          Contact support
        </a>
      </div>
    ),
  },
};

export const WithIllustration: Story = {
  args: {
    code: 404,
    title: "Page not found",
    description: "The page you're looking for doesn't exist.",
    illustration: <div className="text-8xl">🔍</div>,
    showCode: false,
    actions: (
      <a
        href="#"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
      >
        Go home
      </a>
    ),
  },
};

export const Maintenance: Story = {
  args: {
    title: "Under maintenance",
    description:
      "We're performing scheduled maintenance. We'll be back shortly.",
    illustration: <div className="text-8xl">🔧</div>,
    showCode: false,
  },
};
