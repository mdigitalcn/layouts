<!-- Updated: 2026-03-03 -->
# page

> General-purpose page layouts — stacked, top navigation, blank, settings, docs, wizard, error.

## How It Works

Page layouts are `min-h-svh` full-page wrappers (not fixed height like dashboard).
They scroll naturally and constrain content width.

```
StackedLayout    → header + optional subheader + constrained content + footer
TopnavLayout     → horizontal nav bar + full-width or constrained content
BlankLayout      → minimal wrapper with max-width + padding + optional centering
SettingsLayout   → settings page with sidebar nav (desktop) / pill nav (mobile) + content
DocsLayout       → documentation page with left sidebar + content + right TOC
WizardLayout     → multi-step flow with progress indicator (top or left)
ErrorLayout      → centered error page with code, title, description, actions
```

## Gotchas

- **`min-h-svh` not `min-h-screen`** — Handles iOS viewport correctly.
- **`maxWidth` uses `max-w-screen-*`** — Tailwind screen breakpoints.
- **TopnavLayout has mobile dropdown** — `mobileMenuOpen` controls it. Hamburger shows X when open.
- **SettingsLayout mobile** — Nav becomes horizontal scrolling pills, no drawer needed.
- **DocsLayout TOC** — Only visible on `xl:` breakpoint. Left sidebar hidden on `< md` with drawer.
- **DocsLayout sidebar** — Uses nested `SidebarItem` with depth-based indentation (`paddingLeft`).
- **WizardLayout `stepPosition`** — `"top"` = horizontal steps above content. `"left"` = vertical steps in sidebar.
- **WizardLayout left sidebar** — Hidden on mobile, falls back to horizontal steps.
- **ErrorLayout** — Standalone page, no header/sidebar. Centered with `role="main"`.

## Recipes

### Settings with Tab-Like Navigation
SettingsLayout nav items support `group` property for section headers:
```tsx
const navItems = [
  { id: "profile", label: "Profile", group: "Account", active: true },
  { id: "billing", label: "Billing", group: "Organization" },
];
```

### Multi-Step Onboarding
Use WizardLayout with state management for step progression:
```tsx
const [step, setStep] = useState(0);
const steps = items.map((s, i) => ({
  ...s,
  status: i < step ? "completed" : i === step ? "active" : "upcoming",
}));
```

### Custom Error Pages
ErrorLayout works for any error state — 404, 500, 403, maintenance, etc.
Use `illustration` prop for custom icons, `showCode={false}` to hide the big number.
