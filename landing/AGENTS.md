<!-- Updated: 2026-03-03 -->
# landing

> Marketing / landing page layouts.

## How It Works

`LandingLayout` is a simple flex column: optional announcement bar → sticky navbar → content sections → footer.
No sidebar, no fixed height — pure scrolling page.

```
[announcement] → optional top banner (dismissible in consumer code)
[navbar]       → sticky with backdrop blur, consumer provides the nav content
[children]     → landing sections (hero, features, pricing, etc.)
[footer]       → site footer
```

## Gotchas

- **Navbar content is 100% consumer-provided** — Layout only wraps it with sticky + blur + border. Responsive hamburger menu is consumer's job.
- **`announcement` sits above the sticky navbar** — Scrolls away naturally. If you need it sticky too, add `sticky top-0` to it in consumer code.
- **`stickyNavbar` + `blurNavbar`** — Both default to `true`. Turning off blur removes the `backdrop-blur` and transparent background.

## Recipes

### Adding Dismissible Announcement
The `announcement` prop is just a ReactNode. Handle dismiss state in consumer:
```tsx
const [show, setShow] = useState(true);
<LandingLayout
  announcement={show ? <Banner onDismiss={() => setShow(false)} /> : undefined}
  navbar={<Nav />}
>
```
