# Footer Component

Bottom section for copyright, navigation, and secondary actions.

## Import

```svelte
import {(Footer, FooterNav, FooterGroup)} from 'ui-svelte';
```

## Props

| Prop           | Type                                                                                                            | Default     | Description                        |
| -------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------- |
| `start`        | `Snippet`                                                                                                       | -           | Left section (copyright, branding) |
| `center`       | `Snippet`                                                                                                       | -           | Middle section (navigation)        |
| `end`          | `Snippet`                                                                                                       | -           | Right section (social, info)       |
| `color`        | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme                        |
| `variant`      | `'solid' \| 'soft'`                                                                                             | `'soft'`    | Visual style                       |
| `isBlurred`    | `boolean`                                                                                                       | `false`     | Backdrop blur effect               |
| `isBordered`   | `boolean`                                                                                                       | `false`     | Top border                         |
| `isBoxed`      | `boolean`                                                                                                       | `false`     | Constrain width                    |
| `hideOnScroll` | `boolean`                                                                                                       | `false`     | Hide on scroll down                |

## Patterns

### Simple Footer

```svelte
<Footer isBordered>
	{#snippet start()}
		<p class="text-sm text-on-muted">© 2025 Company</p>
	{/snippet}
	{#snippet center()}
		<FooterNav links={navLinks} />
	{/snippet}
	{#snippet end()}
		<p class="text-sm text-on-muted">Made with ❤️</p>
	{/snippet}
</Footer>
```

### Multi-Column Footer

```svelte
<Footer isBordered>
	{#snippet center()}
		<div class="grid grid-cols-4 gap-8">
			<FooterGroup title="Product" links={productLinks} />
			<FooterGroup title="Company" links={companyLinks} />
			<FooterGroup title="Support" links={supportLinks} />
			<FooterGroup title="Legal" links={legalLinks} />
		</div>
	{/snippet}
</Footer>
```

---

# FooterNav Component

Horizontal navigation links with active state.

## Props

| Prop    | Type           | Default | Description      |
| ------- | -------------- | ------- | ---------------- |
| `links` | `FooterLink[]` | `[]`    | Navigation links |
| `class` | `string`       | -       | Custom classes   |

## FooterLink Type

```typescript
type FooterLink = {
	label: string;
	href: string;
};
```

## Pattern

```svelte
<FooterNav
	links={[
		{ label: 'About', href: '/about' },
		{ label: 'Privacy', href: '/privacy' },
		{ label: 'Terms', href: '/terms' }
	]}
/>
```

---

# FooterGroup Component

Vertical link section with title for multi-column layouts.

## Props

| Prop       | Type           | Default | Description      |
| ---------- | -------------- | ------- | ---------------- |
| `title`    | `string`       | -       | Section heading  |
| `links`    | `FooterLink[]` | `[]`    | Navigation links |
| `children` | `Snippet`      | -       | Custom content   |
| `class`    | `string`       | -       | Custom classes   |

## FooterLink Type

```typescript
type FooterLink = {
	label: string;
	href: string;
	external?: boolean; // Opens in new tab
};
```

## Patterns

### With Links

```svelte
<FooterGroup
	title="Product"
	links={[
		{ label: 'Features', href: '/features' },
		{ label: 'Docs', href: 'https://docs.example.com', external: true }
	]}
/>
```

### With Custom Content

```svelte
<FooterGroup title="Newsletter">
	<p class="text-sm text-on-muted mb-2">Subscribe for updates</p>
	<div class="flex gap-2">
		<TextField placeholder="Email" size="sm" />
		<Button size="sm">Subscribe</Button>
	</div>
</FooterGroup>
```

## Component References

- **@see text-field.md** - Input for newsletter forms
- **@see button.md** - Action buttons
- **@see divider.md** - Visual separation between sections
