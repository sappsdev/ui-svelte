# Animations

CSS utility classes for entrance animations, continuous effects, and scroll reveals.

## Entrance Animations

Apply class directly to element. Plays once on render.

| Class           | Description                   |
| --------------- | ----------------------------- |
| `fade-in`       | Opacity fade from 0 to 1      |
| `fade-in-up`    | Fade in while moving up       |
| `fade-in-down`  | Fade in while moving down     |
| `fade-in-left`  | Fade in from left             |
| `fade-in-right` | Fade in from right            |
| `zoom-in`       | Fade with scale from 0.8 to 1 |
| `zoom-in-up`    | Zoom and move up              |
| `slide-up`      | Slide from bottom             |
| `slide-down`    | Slide from top                |
| `slide-left`    | Slide from right              |
| `slide-right`   | Slide from left               |
| `bounce-in`     | Bouncy scale with overshoot   |
| `bounce-in-up`  | Bouncy entrance from below    |
| `reveal-up`     | Reveal with blur from below   |
| `reveal-scale`  | Scale and translate reveal    |
| `flip-in-x`     | 3D flip on X axis             |
| `flip-in-y`     | 3D flip on Y axis             |

## Continuous Animations

Looping animations for attention or decoration.

| Class        | Description                           |
| ------------ | ------------------------------------- |
| `float`      | Gentle up/down floating (infinite)    |
| `pulse-soft` | Soft pulsing opacity/scale (infinite) |
| `shake`      | Horizontal shake effect               |
| `wiggle`     | Playful rotation wiggle (infinite)    |
| `glow-pulse` | Pulsing box-shadow glow (infinite)    |

## Scroll Reveal

Add `.is-visible` class via JS to trigger animation.

| Class          | Description              |
| -------------- | ------------------------ |
| `reveal`       | Scroll reveal from below |
| `reveal-left`  | Scroll reveal from left  |
| `reveal-right` | Scroll reveal from right |
| `reveal-zoom`  | Scroll reveal with zoom  |

## Delay Utilities

Combine with animations for staggered effects.

| Class        | Delay  |
| ------------ | ------ |
| `delay-0`    | 0ms    |
| `delay-75`   | 75ms   |
| `delay-100`  | 100ms  |
| `delay-150`  | 150ms  |
| `delay-200`  | 200ms  |
| `delay-300`  | 300ms  |
| `delay-400`  | 400ms  |
| `delay-500`  | 500ms  |
| `delay-700`  | 700ms  |
| `delay-1000` | 1000ms |

## Duration Utilities

| Class           | Duration |
| --------------- | -------- |
| `duration-300`  | 300ms    |
| `duration-700`  | 700ms    |
| `duration-3000` | 3000ms   |

## Patterns

### Basic Entrance

```svelte
<div class="fade-in-up">Animated content</div>
<Card rootClass="zoom-in">Animated card</Card>
```

### Staggered List

```svelte
<div class="fade-in-up delay-0">First</div>
<div class="fade-in-up delay-100">Second</div>
<div class="fade-in-up delay-200">Third</div>
```

### Continuous Effect

```svelte
<Button class="float">Floating Button</Button><div class="glow-pulse">Attention element</div>
```

### On Buttons

```svelte
<Button class="fade-in-up">Fade Up</Button>
<Button class="bounce-in delay-200">Bounce</Button>
<Button class="pulse-soft">Pulse</Button>
```

## Notes

- Entrance animations play once on element render
- Continuous animations loop indefinitely
- Combine delay classes for staggered effects
- Use `rootClass` prop to apply to components
