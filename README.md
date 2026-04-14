# mdigitalcn layouts

17+ React layout templates for the mdigitalcn ecosystem. Built on `@mdigitalcn/uikit` and Tailwind CSS v4.

Not published to npm — consumed via the [mdigitalcn CLI](https://github.com/mdigitalcn/cli).

## What's included

**App layouts** — sidebar nav, topnav, dual sidebar, collapsible sidebar

**Auth layouts** — split screen (form + image), centered card, full-page

**Content layouts** — docs with sidebar TOC, blog with aside, landing page shell

**Wizard layouts** — multi-step form with progress stepper

**Dashboard layouts** — header + content grid, stats + table combo

## Add to your project

```bash
mdigitalcn layout list
mdigitalcn layout add sidebar-layout
mdigitalcn layout add split-auth-layout topnav-layout
mdigitalcn layout info docs-layout
```

The CLI copies source files into your project and installs peer dependencies automatically.

## Peer dependencies

```json
{
  "@mdigitalcn/uikit": "^1.0.13",
  "lucide-react": "^0.577.0"
}
```

## Development

```bash
pnpm install
pnpm storybook
```

## License

MIT
