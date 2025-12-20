# Tabs Component

Organize content into switchable panels.

## Import

```svelte
import {Tabs} from 'ui-svelte';
```

## Props

| Prop              | Type                                                                                  | Default   | Description            |
| ----------------- | ------------------------------------------------------------------------------------- | --------- | ---------------------- |
| `tabs`            | `Tab[]`                                                                               | `[]`      | Array of tab items     |
| `position`        | `'top' \| 'bottom' \| 'start' \| 'end'`                                               | `'top'`   | Tab list position      |
| `variant`         | `'solid' \| 'outline' \| 'line' \| 'ghost' \| 'pills'`                                | `'solid'` | Visual style           |
| `color`           | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'muted'` | Active color           |
| `rootClass`       | `string`                                                                              | -         | Root container classes |
| `tabListClass`    | `string`                                                                              | -         | Tab list classes       |
| `tabClass`        | `string`                                                                              | -         | Individual tab classes |
| `tabContentClass` | `string`                                                                              | -         | Content area classes   |

## Tab Type

| Property  | Type                | Description       |
| --------- | ------------------- | ----------------- |
| `id`      | `string`            | Unique identifier |
| `label`   | `string`            | Tab label         |
| `content` | `Snippet \| string` | Panel content     |

## Patterns

### Basic Tabs

```svelte
<Tabs
	tabs={[
		{ id: 'home', label: 'Home', content: 'Home content here.' },
		{ id: 'profile', label: 'Profile', content: 'Profile content here.' },
		{ id: 'settings', label: 'Settings', content: 'Settings content here.' }
	]}
/>
```

### With Snippet Content

```svelte
{#snippet profileContent()}
	<div class="p-4">
		<h4>Profile</h4>
		<Button size="sm">Edit</Button>
	</div>
{/snippet}

<Tabs
	tabs={[
		{ id: 'home', label: 'Home', content: 'Simple string.' },
		{ id: 'profile', label: 'Profile', content: profileContent }
	]}
/>
```

### Variants & Positions

```svelte
<Tabs tabs={myTabs} variant="line" color="primary" />
<Tabs tabs={myTabs} variant="pills" color="secondary" />
<Tabs tabs={myTabs} position="start" />
```

## Notes

- Use string content for simple text, Snippets for rich content
- `position` controls tab list placement (top, bottom, start, end)
- `line` variant shows underline/side indicator on active tab
- `pills` variant shows rounded pill-style tabs
