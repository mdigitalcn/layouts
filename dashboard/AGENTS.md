<!-- Updated: 2026-03-03 -->
# dashboard

> Application shell layouts with sidebars, headers, and navigation for dashboard UIs.

## How It Works

All dashboard layouts are `h-svh` fixed-height shells with internal scroll.
Each has a **desktop** layout (sidebar visible) and a **mobile** layout (sidebar → off-canvas drawer).

```
SidebarLayout          → Classic sidebar + content. Collapsible variant available.
HeaderSidebarLayout    → Full-width header on top, sidebar below (GitHub/Jira pattern).
InsetSidebarLayout     → Sidebar floats inset with gap + rounded corners (macOS-style).
DualSidebarLayout      → Icon rail + expandable side panel (VS Code/Slack pattern).
FloatingSidebarLayout  → Sidebar + content both float inside a padded container.
HolyGrailLayout        → Header + left sidebar + content + right panel (3-column).
```

## Mobile Pattern

All 6 layouts share the same mobile pattern:
1. Sidebar hidden on `< md` breakpoint
2. Hamburger button appears (inline SVG, no external icon dep)
3. `mobileOpen` / `onMobileOpenChange` props (controlled or uncontrolled)
4. Overlay: `fixed inset-0 z-50` with `bg-black/40 backdrop-blur-[2px]` backdrop
5. Drawer slides in from left: `animate-in slide-in-from-left duration-200`
6. `Escape` key closes the drawer
7. Backdrop click closes the drawer

## Gotchas

- **`h-svh` not `h-screen`** — Uses small viewport height for iOS safe areas.
- **`animate-in`** — Requires Tailwind CSS animate plugin or shadcn/ui animations. Works without animation if missing.
- **`ScrollArea`** from `@mdigital_ui/ui/scroll-area` — Custom scrollbar. Import path matters.
- **`Tooltip`** from `@mdigital_ui/ui/tooltip` — Used in collapsed SidebarLayout + DualSidebar rail.
- **Controlled vs uncontrolled** — Mobile open and collapsed states support both patterns.
- **`SidebarLayout` `variant`** — Only `"collapsible"` enables toggle. `"fixed"` stays expanded.
- **`FloatingSidebarLayout`** — Has outer `bg-surface/30` and `padding: inset` for the floating effect. Both sidebar and content are rounded with border.
- **`HolyGrailLayout`** — Right panel uses `lg:` breakpoint (wider than left sidebar's `md:`). `rightPanelOpen` prop controls visibility.
- **`DualSidebarLayout`** — Rail is fixed `w-14`. Side panel width via `sidePanelWidth` prop.

## Recipes

### Adding Mobile Support to a New Dashboard Layout
1. Add `mobileOpen?` and `onMobileOpenChange?` to types
2. `useState` + `useCallback` for internal state
3. `useEffect` with `Escape` keydown listener
4. Hide desktop sidebar: `hidden md:flex` or `hidden md:block`
5. Mobile hamburger: `md:hidden` button
6. Overlay: `fixed inset-0 z-50` + backdrop + drawer

### Changing Sidebar Width
All layouts accept `sidebarWidth` prop (px). Default: 256.
`DualSidebar`: rail = `w-14`, panel via `sidePanelWidth`.
`FloatingSidebar`: also accepts `inset` prop for outer gap.

## Don't Touch
- Mobile overlay z-index (`z-50`) — Consistent across all dashboard layouts.
- Hamburger SVG inline icon — Avoids lucide-react dependency in layout code.
