# Item Component

List item with avatar, icon, label, description, status indicator, and actions.

## Import

```svelte
import {Item} from 'ui-svelte';
```

## Props

| Prop           | Type                                                                                                            | Default     | Description                               |
| -------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------- |
| `id`           | `string \| number`                                                                                              | -           | Unique identifier                         |
| `label`        | `string`                                                                                                        | -           | Primary text                              |
| `description`  | `string`                                                                                                        | -           | Secondary text                            |
| `icon`         | `IconData`                                                                                                      | -           | Leading icon                              |
| `src`          | `string`                                                                                                        | -           | Avatar image URL                          |
| `color`        | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning' \| 'surface' \| 'default'` | `'default'` | Color theme                               |
| `variant`      | `'solid' \| 'soft' \| 'outlined' \| 'ghost'`                                                                    | `'ghost'`   | Visual style                              |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                                                          | `'md'`      | Item size                                 |
| `status`       | `'online' \| 'offline' \| 'busy' \| 'away'`                                                                     | -           | Status indicator                          |
| `href`         | `string`                                                                                                        | -           | Link URL                                  |
| `onclick`      | `(id: string \| number) => void`                                                                                | -           | Click handler                             |
| `isActive`     | `boolean`                                                                                                       | `false`     | Active/selected state                     |
| `isFocused`    | `boolean`                                                                                                       | `false`     | Focused state                             |
| `isDisabled`   | `boolean`                                                                                                       | `false`     | Disabled state                            |
| `isCompact`    | `boolean`                                                                                                       | `false`     | Compact padding                           |
| `hasDivider`   | `boolean`                                                                                                       | `false`     | Bottom divider                            |
| `hasShadow`    | `boolean`                                                                                                       | `false`     | Drop shadow                               |
| `hasBullet`    | `boolean`                                                                                                       | `false`     | Show bullet dot (for items without icons) |
| `hasIndicator` | `boolean`                                                                                                       | `false`     | Show chevron on hover (for simple items)  |
| `actions`      | `Snippet`                                                                                                       | -           | Right-side actions                        |

## Patterns

### With Avatar & Status

```svelte
<Item
	id="1"
	label="John Doe"
	description="Software Engineer"
	src="https://i.pravatar.cc/150?img=1"
	status="online"
/>
```

### With Icon

```svelte
<Item id="1" label="Favorites" description="View your saved items" icon={HeartIcon} />
```

### With Actions

```svelte
<Item id="1" label="John Doe" description="Software Engineer" src="/avatar.jpg">
	{#snippet actions()}
		<IconButton icon={EditIcon} size="sm" variant="ghost" />
		<IconButton icon={DeleteIcon} size="sm" variant="ghost" color="danger" />
	{/snippet}
</Item>
```

### Clickable Item

```svelte
<Item
	id="1"
	label="Click Me"
	description="Interactive item"
	onclick={(id) => console.log('Clicked:', id)}
/>
```

### Visual Indicators

Use `hasBullet` and `hasIndicator` for items without icons to provide visual feedback:

```svelte
<!-- Bullet dot at the start -->
<Item id="1" label="With Bullet" hasBullet onclick={handleClick} />

<!-- Chevron arrow on hover -->
<Item id="2" label="With Indicator" hasIndicator onclick={handleClick} />

<!-- Both bullet and indicator -->
<Item id="3" label="With Both" hasBullet hasIndicator onclick={handleClick} />
```

### Interactive States

```svelte
<Item id="1" label="Active" isActive />
<Item id="2" label="Focused" isFocused />
<Item id="3" label="Disabled" isDisabled />
```

### As Link

```svelte
<Item id="1" label="Settings" href="/settings" icon={SettingsIcon} />
```

## Notes

- Use `src` for avatar, `icon` for icons (mutually exclusive display priority: src > icon)
- Status indicator appears as colored dot on avatar
- `actions` slot for buttons, menus, etc.
- Hover effects enabled when `onclick` or `href` provided
- `hasBullet` shows a small dot before the label (useful for items without icons)
- `hasIndicator` shows a chevron that appears on hover (indicates clickable action)
