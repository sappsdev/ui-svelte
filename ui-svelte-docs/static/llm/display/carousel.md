# Carousel Component

Slide carousel with navigation, indicators, and autoplay support.

## Import

```svelte
import {Carousel} from 'ui-svelte';
```

## Props

| Prop               | Type                         | Default        | Description            |
| ------------------ | ---------------------------- | -------------- | ---------------------- |
| `slides`           | `Slide[]`                    | `[]`           | Array of slides        |
| `title`            | `string \| Snippet`          | -              | Header title           |
| `color`            | `Color`                      | `'primary'`    | Control color          |
| `size`             | `'sm' \| 'md' \| 'lg'`       | `'md'`         | Carousel size          |
| `orientation`      | `'horizontal' \| 'vertical'` | `'horizontal'` | Slide direction        |
| `indicatorType`    | `'bar' \| 'dot'`             | `'bar'`        | Indicator style        |
| `autoplay`         | `boolean`                    | `false`        | Enable autoplay        |
| `autoplayInterval` | `number`                     | `3000`         | Autoplay delay ms      |
| `disableLoop`      | `boolean`                    | `false`        | Disable infinite loop  |
| `hideControls`     | `boolean`                    | `false`        | Hide prev/next buttons |
| `hideIndicators`   | `boolean`                    | `false`        | Hide slide indicators  |
| `showNavigation`   | `boolean`                    | `false`        | Show arrow navigation  |
| `showCounter`      | `boolean`                    | `false`        | Show slide counter     |
| `slidesPerView`    | `number`                     | -              | Multi-item view        |
| `gap`              | `number`                     | `0`            | Gap between slides     |
| `onSlideChange`    | `(index: number) => void`    | -              | Slide change callback  |

## Types

```typescript
type Slide = {
	id: string | number;
	content: Snippet;
};
```

## Patterns

### Basic

```svelte
{#snippet slide1()}
	<div class="h-64 bg-blue-100 flex items-center justify-center">
		<h3>Slide 1</h3>
	</div>
{/snippet}

{#snippet slide2()}
	<div class="h-64 bg-purple-100 flex items-center justify-center">
		<h3>Slide 2</h3>
	</div>
{/snippet}

<Carousel
	slides={[
		{ id: '1', content: slide1 },
		{ id: '2', content: slide2 }
	]}
/>
```

### With Title Header

```svelte
<Carousel {slides} title="Featured Items" hideControls hideIndicators />
```

### Multi-Item Carousel

```svelte
<Carousel
	slides={serviceCards}
	title="Our Services"
	slidesPerView={3}
	gap={16}
	hideControls
	hideIndicators
	disableLoop
/>
```

### Autoplay

```svelte
<Carousel {slides} autoplay autoplayInterval={5000} />
```

### Dot Indicators

```svelte
<Carousel {slides} indicatorType="dot" />
```

## Notes

- Each slide uses a Snippet for content
- Touch/swipe support on mobile
- Keyboard navigation support
- Use `slidesPerView` for multi-item layouts
