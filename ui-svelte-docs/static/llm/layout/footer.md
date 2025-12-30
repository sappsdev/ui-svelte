# Footer Component

Display copyright, navigation links, and secondary actions at page bottom.

## Import

```svelte
import {(Footer, FooterNav, FooterGroup)} from 'ui-svelte';
```

## Footer Props

| Prop           | Type                                                                                                            | Default     | Description         |
| -------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------- |
| `start`        | `Snippet`                                                                                                       | -           | Left slot content   |
| `center`       | `Snippet`                                                                                                       | -           | Center slot content |
| `end`          | `Snippet`                                                                                                       | -           | Right slot content  |
| `color`        | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme         |
| `variant`      | `'solid' \| 'soft'`                                                                                             | `'soft'`    | Visual style        |
| `isBlurred`    | `boolean`                                                                                                       | `false`     | Blur background     |
| `isBordered`   | `boolean`                                                                                                       | `false`     | Show border         |
| `isBoxed`      | `boolean`                                                                                                       | `false`     | Constrain width     |
| `hideOnScroll` | `boolean`                                                                                                       | `false`     | Hide on scroll      |

## FooterNav Props

| Prop    | Type           | Default | Description                 |
| ------- | -------------- | ------- | --------------------------- |
| `links` | `FooterLink[]` | `[]`    | Horizontal navigation links |
| `class` | `string`       | -       | Additional classes          |

## FooterGroup Props

| Prop       | Type           | Default | Description        |
| ---------- | -------------- | ------- | ------------------ |
| `title`    | `string`       | -       | Group heading      |
| `links`    | `FooterLink[]` | `[]`    | Vertical link list |
| `children` | `Snippet`      | -       | Custom content     |
| `class`    | `string`       | -       | Additional classes |

## Patterns

### Simple Footer

```svelte
<script lang="ts">
	import { Footer, FooterNav } from 'ui-svelte';

	const links = [
		{ label: 'About', href: '/about' },
		{ label: 'Privacy', href: '/privacy' },
		{ label: 'Terms', href: '/terms' }
	];
</script>

<Footer isBordered>
	{#snippet start()}
		<p class="text-sm">© 2024 Company</p>
	{/snippet}
	{#snippet center()}
		<FooterNav {links} />
	{/snippet}
	{#snippet end()}
		<p class="text-sm">Made with ❤️</p>
	{/snippet}
</Footer>
```

### Multi-Column Footer

```svelte
<Footer isBordered>
	{#snippet center()}
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8 py-4">
			<FooterGroup title="Product" links={productLinks} />
			<FooterGroup title="Company" links={companyLinks} />
			<FooterGroup title="Support" links={supportLinks} />
			<FooterGroup title="Legal" links={legalLinks} />
		</div>
		<Divider />
		<p class="text-sm text-center">© 2024 Company. All rights reserved.</p>
	{/snippet}
</Footer>
```

### With Newsletter

```svelte
<Footer isBordered>
	{#snippet center()}
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8 py-4">
			<div class="column gap-4">
				<h3 class="font-semibold">Stay Updated</h3>
				<input type="email" placeholder="Enter email" class="px-3 py-2 border rounded" />
				<Button size="sm">Subscribe</Button>
			</div>
			<FooterGroup title="Product" links={productLinks} />
			<FooterGroup title="Company" links={companyLinks} />
			<FooterGroup title="Legal" links={legalLinks} />
		</div>
	{/snippet}
</Footer>
```

## Notes

- Use `FooterNav` for horizontal link lists
- Use `FooterGroup` for vertical column layouts
- Place Footer at end of Scaffold children
