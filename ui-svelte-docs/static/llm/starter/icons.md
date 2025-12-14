## Icons

Visual symbols for representing actions, objects, and ideas.

### API Endpoint

Fetch icons from the API:
```
GET https://ui-icons.sappsdev.com/icons
```

**Query Parameters:**
| Param | Description |
|-------|-------------|
| `page` | Page number (default: 1) |
| `limit` | Icons per page (default: 100) |
| `name` | Search by icon name |
| `set_name` | Filter by icon set |

**Response:**
```json
{
  "data": [{ "id": 1, "name": "solar-linear:heart", "body": "<svg>...</svg>", "viewbox": "0 0 24 24", "set_name": "solar-linear" }],
  "pagination": { "page": 1, "limit": 100, "total": 1665, "totalPages": 17 }
}
```

### Available Icon Sets

| ID | Name |
|----|------|
| `solar-bold` | Solar Bold |
| `solar-bold-duotone` | Solar Bold Duotone |
| `solar-broken` | Solar Broken |
| `solar-line-duotone` | Solar Line Duotone |
| `solar-linear` | Solar Linear |
| `solar-outline` | Solar Outline |
| `fluent-filled` | Fluent Filled |
| `fluent-regular` | Fluent Regular |
| `circle-flags` | Circle Flags |
| `streamline-emojis` | Streamline Emojis |
| `streamline-color` | Streamline Color |
| `svg-spinners` | SVG Spinners |
| `logos` | Logos |

### Usage

```svelte
<script lang="ts">
  import { Icon } from 'ui-svelte';
  import { HeartLinearIcon } from '$lib/icons';
</script>

<Icon icon={HeartLinearIcon} class="w-6 h-6" />
```

### Icon Format

Store icons in `$lib/icons/index.ts`:
```typescript
export const HeartLinearIcon = {
  body: '<path d="M12 6.00019C10.2006..."/>',
  viewbox: '0 0 24 24'
};
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `{ body: string, viewbox: string }` | - | Icon SVG data |
| `class` | `string` | - | CSS classes for sizing |

### Examples

```svelte
<!-- Basic Icon -->
<Icon icon={HeartLinearIcon} class="w-6 h-6" />

<!-- Colored Icon -->
<Icon icon={StarIcon} class="w-8 h-8 text-warning" />

<!-- In Button -->
<Button startIcon={SearchIcon}>Search</Button>
```

**For LLMs**: Use the API endpoint to search for icons by name. The `set_name` parameter filters by icon set. Icon data has `body` (SVG path) and `viewbox` properties. Store icons in `$lib/icons/index.ts` using the exported constant format.
