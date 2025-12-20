# Icon Component

Renders SVG icons from icon data objects.

## Icon API (Optional)

Before using an icon, you can verify it exists and fetch its data via the API.

### Available Icon Sets

| Set ID | Description |
|--------|-------------|
| `solar-linear` | Solar Linear (default) |
| `solar-bold` | Solar Bold |
| `solar-bold-duotone` | Solar Bold Duotone |
| `solar-broken` | Solar Broken |
| `solar-line-duotone` | Solar Line Duotone |
| `solar-outline` | Solar Outline |
| `fluent-filled` | Fluent Filled |
| `fluent-regular` | Fluent Regular |
| `circle-flags` | Country Flags |
| `streamline-emojis` | Emojis |
| `streamline-color` | Colored Icons |
| `svg-spinners` | Loading Spinners |
| `logos` | Brand Logos |

### Search Endpoint

```
GET https://ui-icons.sappsdev.com/icons?name={query}&set_name={set_id}&page=1&limit=10
```

**Response:**
```json
{
  "data": [
    { "id": 1, "name": "solar-linear:heart", "body": "<path.../>", "viewbox": "0 0 24 24", "set_name": "solar-linear" }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 100, "totalPages": 10 }
}
```

### Verify Icon Exists

> **Important:** Before adding a new icon, check if it already exists in `$lib/icons/index.ts` to avoid duplicates. Search the file for the icon name (e.g., `HeartLinearIcon`). Only fetch from the API and add if the icon doesn't exist.

```typescript
// 1. First, check $lib/icons/index.ts for existing icon
// 2. If not found, fetch from API:
const res = await fetch('https://ui-icons.sappsdev.com/icons?name=heart&set_name=solar-linear&limit=1');
const { data } = await res.json();
if (data.length > 0) {
  // 3. Add to $lib/icons/index.ts
  const icon = { body: data[0].body, viewbox: data[0].viewbox };
}
```

## Import

```svelte
import { Icon } from 'ui-svelte';
import { HeartLinearIcon } from '$lib/icons';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `IconData` | - | Icon object with `body` and `viewbox` |
| `class` | `string` | - | CSS classes for sizing |

## IconData Type

```typescript
type IconData = {
  body: string;    // SVG inner content
  viewbox: string; // SVG viewBox (e.g., '0 0 24 24')
};
```

## Patterns

### Basic Usage
```svelte
<Icon icon={HeartLinearIcon} class="w-6 h-6" />
```

### Inline Icon Definition
```svelte
<Icon 
  icon={{ 
    body: '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>', 
    viewbox: '0 0 24 24' 
  }} 
  class="w-8 h-8" 
/>
```

### With Color
```svelte
<Icon icon={StarLinearIcon} class="w-6 h-6 text-warning" />
<Icon icon={CheckLinearIcon} class="w-6 h-6 text-success" />
```

### Creating Icon Constants
```typescript
// $lib/icons/index.ts
export const HeartLinearIcon = {
  body: '<path d="..." fill="currentColor"/>',
  viewbox: '0 0 24 24'
};
```

## Notes

- Use utility classes for sizing: `w-4 h-4`, `w-6 h-6`, `w-8 h-8`
- Icons inherit `currentColor` for fill/stroke
- Browse icons at `/docs/starter/icons` to get icon code
