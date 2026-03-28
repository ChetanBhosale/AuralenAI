---
inclusion: always
---

# UI Component & Design System Rules

## Always Use shadcn Components

When building UI in the `apps/web` frontend, always use the shadcn components from `@/components/ui/` instead of raw HTML elements:

- `<Button>` instead of `<button>` — use variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`
- `<Input>` instead of `<input>`
- `<Textarea>` instead of `<textarea>`
- `<Label>` instead of `<label>`
- `<Select>`, `<SelectTrigger>`, `<SelectValue>`, `<SelectContent>`, `<SelectItem>` instead of `<select>`
- Use all other available shadcn components from `@/components/ui/` (Dialog, Card, Badge, etc.)

## Always Use Design System Tokens

Never use hardcoded hex colors or inline font families. Always use the design tokens from `globals.css`:

### Colors
- `bg-background`, `bg-card`, `bg-muted`, `bg-primary`, `bg-accent`
- `text-foreground`, `text-muted-foreground`, `text-primary`, `text-primary-foreground`
- `border-border`, `border-input`

### Typography (utility classes from globals.css)
- Headings: `text-display-lg`, `text-display-md`, `text-display-sm`, `text-headline-lg`, `text-headline-md`, `text-headline-sm`
- Body: `text-body-lg`, `text-body-md`, `text-body-sm`
- Labels: `text-label-lg`, `text-label-md`, `text-label-sm`
- Font families: `font-heading` (Manrope), `font-sans` (Inter)

### Utilities
- `btn-primary-gradient` for gradient CTA buttons
- `shadow-float`, `shadow-ambient` for elevation
- `glass-panel` for glassmorphism
- `ghost-border` for subtle borders
- `input-architectural` for editorial-style inputs

## No Hardcoded Values
- No `#hex` colors — use CSS variables via Tailwind tokens
- No `font-['Manrope']` — use `font-heading`
- No `font-['Inter']` — use `font-sans`
- No inline `style` for colors or fonts
