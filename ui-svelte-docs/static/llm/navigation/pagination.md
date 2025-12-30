# Pagination Component

Navigate through large data sets split across pages.

## Import

```svelte
import {Pagination} from 'ui-svelte';
```

## Props

| Prop              | Type                                                                                  | Default     | Description                |
| ----------------- | ------------------------------------------------------------------------------------- | ----------- | -------------------------- |
| `page`            | `number`                                                                              | `1`         | Current page number        |
| `totalPages`      | `number`                                                                              | `1`         | Total number of pages      |
| `onPageChange`    | `(page: number) => void`                                                              | -           | Page change callback       |
| `onPrev`          | `() => void`                                                                          | -           | Previous button callback   |
| `onNext`          | `() => void`                                                                          | -           | Next button callback       |
| `hasPrevPage`     | `boolean`                                                                             | -           | Override prev button state |
| `hasNextPage`     | `boolean`                                                                             | -           | Override next button state |
| `color`           | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme                |
| `variant`         | `'solid' \| 'soft' \| 'outlined' \| 'ghost'`                                          | `'solid'`   | Visual style               |
| `size`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                | `'md'`      | Size                       |
| `align`           | `'start' \| 'center' \| 'end'`                                                        | `'center'`  | Alignment                  |
| `hidePageNumbers` | `boolean`                                                                             | `false`     | Hide page numbers          |
| `class`           | `string`                                                                              | -           | Additional classes         |

## Patterns

### Basic Pagination

```svelte
<script lang="ts">
	import { Pagination } from 'ui-svelte';

	let page = $state(1);
	const totalPages = 10;

	const handlePageChange = (newPage: number) => {
		page = newPage;
	};
</script>

<Pagination {page} {totalPages} onPageChange={handlePageChange} />
```

### Compact (No Numbers)

```svelte
<Pagination page={3} totalPages={10} hidePageNumbers variant="soft" />
```

### Styled Variants

```svelte
<Pagination page={2} totalPages={5} variant="outlined" color="primary" />
<Pagination page={2} totalPages={5} variant="ghost" color="muted" />
<Pagination page={2} totalPages={5} variant="soft" color="success" />
```

### Custom Alignment

```svelte
<Pagination page={1} totalPages={5} align="start" />
<Pagination page={1} totalPages={5} align="center" />
<Pagination page={1} totalPages={5} align="end" />
```

## Notes

- Page numbers automatically truncate for large page counts
- Use `hidePageNumbers` for prev/next only navigation
- Override button states with `hasPrevPage`/`hasNextPage`
