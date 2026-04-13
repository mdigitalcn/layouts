<!-- Updated: 2026-03-03 -->
# auth

> Authentication page layouts — centered forms, split panels, card containers.

## How It Works

Each layout is a full-page shell (`min-h-svh`) that positions an auth form on screen.
No business logic — they receive `children` (the form) and render the structural wrapper.

```
CenteredAuthLayout → vertically centered form, logo + title above
SplitAuthLayout    → two-panel: form side + branding panel (hidden on mobile)
CardAuthLayout     → form inside elevated card with decorative background
```

All layouts use `@mdigitalcn/uikit` `cn()` utility. No other UI kit deps.

## Gotchas

- `SplitAuthLayout` panel is `hidden lg:flex` — only shows on desktop. Form is always visible.
- `CardAuthLayout` background patterns use raw CSS `[background-image:...]` — Tailwind v4 arbitrary values, not custom classes.
- All use `min-h-svh` not `min-h-screen` — handles mobile viewport correctly (iOS safe areas).
- `role="form"` is on the form container, not the outer shell.

## Recipes

### Adding a New Auth Layout
1. Create `auth/{name}/` with `{Name}.tsx`, `{Name}.types.ts`, `index.ts`, `{Name}.stories.tsx`
2. Export default component from `index.ts`
3. Add entry to root `registry.json`
4. Types go in `.types.ts` — keep component file clean

### Customizing Background Patterns
`CardAuthLayout` has 4 backgrounds: `plain`, `gradient`, `dots`, `grid`.
To add a new one, add to `bgMap` in the component. Use arbitrary Tailwind for complex CSS.

## Don't Touch
- Background pattern strings in `CardAuthLayout` — they have careful dark mode handling with `dark:[]` variants.
