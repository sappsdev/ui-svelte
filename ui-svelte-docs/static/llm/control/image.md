# Image Component

Image with loading states, error handling, and overlay controls.

## Import

```svelte
import {Image} from 'ui-svelte';
```

## Props

| Prop           | Type                                                                                  | Default     | Description           |
| -------------- | ------------------------------------------------------------------------------------- | ----------- | --------------------- |
| `src`          | `string`                                                                              | -           | Image source URL      |
| `alt`          | `string`                                                                              | -           | Alt text              |
| `aspect`       | `'auto' \| 'horizontal' \| 'vertical' \| 'square'`                                    | `'auto'`    | Aspect ratio          |
| `objectFit`    | `'cover' \| 'contain' \| 'fill' \| 'none'`                                            | `'cover'`   | Object fit mode       |
| `loading`      | `'lazy' \| 'eager'`                                                                   | `'lazy'`    | Loading behavior      |
| `color`        | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Control color         |
| `hideControls` | `boolean`                                                                             | `false`     | Hide overlay controls |
| `class`        | `string`                                                                              | -           | Additional classes    |

## Patterns

### Basic

```svelte
<Image src="/photo.jpg" alt="Description" />
```

### Fixed Aspect Ratio

```svelte
<Image src="/photo.jpg" alt="Photo" aspect="square" />
<Image src="/photo.jpg" alt="Photo" aspect="horizontal" />
<Image src="/photo.jpg" alt="Photo" aspect="vertical" />
```

### Object Fit

```svelte
<Image src="/photo.jpg" alt="Photo" aspect="square" objectFit="contain" />
<Image src="/photo.jpg" alt="Photo" aspect="square" objectFit="cover" />
```

### Without Controls

```svelte
<Image src="/photo.jpg" alt="Photo" hideControls />
```

## Features

- Loading skeleton while image loads
- Error state with fallback icon
- Overlay controls on hover:
  - Download button
  - Fullscreen button
- Lazy loading by default

## Notes

- `aspect="auto"` uses natural image dimensions
- `aspect="horizontal"` = 16:9
- `aspect="vertical"` = 9:16
- `aspect="square"` = 1:1
