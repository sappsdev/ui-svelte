# Divider Component

Visual separator for content sections. Supports horizontal/vertical orientations with optional centered content.

## Import

```svelte
import {Divider} from 'ui-svelte';
```

## Props

| Prop       | Type                                                            | Default     | Description          |
| ---------- | --------------------------------------------------------------- | ----------- | -------------------- |
| `vertical` | `boolean`                                                       | `false`     | Vertical orientation |
| `color`    | `'default' \| 'surface' \| 'primary' \| 'secondary' \| 'muted'` | `'default'` | Color theme          |
| `children` | `Snippet`                                                       | -           | Centered content     |
| `class`    | `string`                                                        | -           | Additional classes   |

## Patterns

### Basic Horizontal

```svelte
<Divider />
```

### Vertical

```svelte
<div class="row min-h-[100px]">
	<div>Left Content</div>
	<Divider vertical />
	<div>Right Content</div>
</div>
```

### With Label

```svelte
<Divider>OR</Divider>
```

### Colored

```svelte
<Divider color="primary" />
<Divider color="secondary" />
<Divider color="muted" />
```

### Responsive Orientation

```svelte
<div class="column xl:row gap-4">
	<div>Content A</div>
	<Divider class="invisible xl:visible" vertical />
	<Divider class="xl:hidden" />
	<div>Content B</div>
</div>
```

## Notes

- Use `vertical` in flex row layouts with `min-h-*` on parent
- Children content appears centered with lines on both sides
- Combine visibility classes for responsive orientation switching
