# Decorations

CSS utility classes for decorative border effects on cards, buttons, avatars, and other elements.

## Styles

| Class        | Description                              |
| ------------ | ---------------------------------------- |
| `bd-glow`    | Soft luminous border with glow effect    |
| `bd-neon`    | Intense neon border with pulse animation |
| `bd-grad`    | Gradient border (two-color blend)        |
| `bd-rainbow` | Animated multicolor rotating border      |
| `bd-shimmer` | Sliding shine effect along the border    |
| `bd-pulse`   | Expanding ring pulse animation           |
| `bd-wave`    | Rotating luminous wave border            |
| `bd-frost`   | Frosted glass/icy border effect          |
| `bd-ember`   | Fire/ember flickering border             |
| `bd-laser`   | Scanning laser line around border        |
| `bd-solid`   | Simple solid border with hover effect    |
| `bd-dash`    | Animated marching dashed border          |

## Colors

Add color suffix: `.bd-style-color`

Available: `primary`, `secondary`, `success`, `warning`, `danger`, `info`

## Patterns

### On Cards

```svelte
<Card rootClass="bd-glow bd-glow-primary">
	<p>Card content</p>
</Card>

<Card variant="ghost" rootClass="bd-neon bd-neon-secondary">
	<p>Neon border</p>
</Card>
```

### On Buttons

```svelte
<Button class="bd-glow bd-glow-primary" variant="ghost">Glow</Button>
<Button class="bd-shimmer bd-shimmer-info" variant="ghost">Shimmer</Button>
```

### On Avatars

```svelte
<Avatar class="bd-glow bd-glow-primary" src="..." size="lg" />
<Avatar class="bd-pulse bd-pulse-success" src="..." size="lg" />
```

### Combining with Card Variants

```svelte
<Card color="surface" variant="solid" rootClass="bd-glow bd-glow-primary">Solid + Glow</Card>
<Card color="muted" variant="soft" rootClass="bd-neon bd-neon-secondary">Soft + Neon</Card>
```

## Notes

- Use `variant="ghost"` on cards/buttons for best visual effect
- Animated styles: rainbow, shimmer, pulse, wave, neon, ember, laser, dash
- Special effects: frost (icy), ember (fire), rainbow (spectrum)
