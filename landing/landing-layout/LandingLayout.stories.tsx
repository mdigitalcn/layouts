import type { Meta, StoryObj } from "@storybook/react";
import LandingLayout from "./LandingLayout";
import { Logo, Placeholder } from "../../.storybook/helpers";

const meta: Meta<typeof LandingLayout> = {
  title: "Landing/LandingLayout",
  component: LandingLayout,
  parameters: { layout: "fullscreen" },
  argTypes: {
    stickyNavbar: { control: "boolean" },
    blurNavbar: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof LandingLayout>;

const Navbar = () => (
  <div className="flex items-center justify-between px-4 py-3 sm:px-6">
    <Logo />
    <div className="hidden items-center gap-6 md:flex">
      {["Features", "Pricing", "Docs"].map((l) => (
        <a key={l} href="#" className="text-sm text-text-secondary hover:text-text-primary">
          {l}
        </a>
      ))}
      <button className="rounded-md bg-primary px-4 py-1.5 text-sm text-white">
        Get started
      </button>
    </div>
    {/* Mobile hamburger */}
    <button className="rounded-md p-2 text-text-secondary hover:bg-surface md:hidden" aria-label="Open menu">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 5h14M3 10h14M3 15h14" />
      </svg>
    </button>
  </div>
);

const Hero = () => (
  <section className="px-4 py-24 text-center">
    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
      Build faster, ship sooner
    </h1>
    <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
      The modern UI toolkit for production-ready apps.
    </p>
    <div className="mt-8 flex justify-center gap-3">
      <button className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-white">
        Get started
      </button>
      <button className="rounded-md border border-border px-6 py-2.5 text-sm font-medium">
        View docs
      </button>
    </div>
  </section>
);

const Footer = () => (
  <div className="px-6 py-8 text-center text-sm text-text-secondary">
    © 2026 mdigitalcn. All rights reserved.
  </div>
);

export const Default: Story = {
  args: {
    navbar: <Navbar />,
    footer: <Footer />,
    children: (
      <>
        <Hero />
        <section className="px-6 py-12">
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            <Placeholder label="Feature 1" className="h-40" />
            <Placeholder label="Feature 2" className="h-40" />
            <Placeholder label="Feature 3" className="h-40" />
          </div>
        </section>
      </>
    ),
  },
};

export const WithAnnouncement: Story = {
  args: {
    ...Default.args,
    announcement: (
      <span>
        🎉 Version 2.0 is here!{" "}
        <a href="#" className="font-medium text-primary hover:underline">
          Learn more →
        </a>
      </span>
    ),
  },
};

export const NoSticky: Story = {
  args: { ...Default.args, stickyNavbar: false, blurNavbar: false },
};
