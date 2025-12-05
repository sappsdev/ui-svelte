# ui-svelte - Svelte UI Component Library

## Available Components

### Layout Components

- **Section**: Page container with consistent padding. No required props.
  - Basic: `<Section>content</Section>`
  - Props: `class`

- **Card**: Content container with header/footer support
  - Basic: `<Card>content</Card>`
  - Props: `title` `class` `hasShadow`
  - Snippets: `{#snippet header()}` `{#snippet footer()}`

### Form Components

- **Button**: Action button with variants and states
  - Basic: `<Button onclick={handler}>Label</Button>`
  - Props: `variant="primary|secondary|muted|outline|ghost|success|info|warning|danger"` `size="xs|sm|md|lg"` `type="button|submit|reset"` `href` `isLoading` `isDisabled` `class`
  - Default: `variant="primary"` `size="md"` `type="button"`

- **IconButton**: Icon-only button (requires icon prop)
  - Basic: `<IconButton icon="fluent:add-24-regular" onclick={handler} />`
  - Required: `icon="fluent:icon-name-24-regular"`
  - Props: `variant="primary|secondary|muted|outline|ghost|success|info|warning|danger"` `size="xs|sm|md|lg"` `type="button|submit|reset"` `href` `isLoading` `isDisabled` `hasShadow` `isSolid` `class`
  - Default: `variant="primary"` `size="md"` `type="button"`

- **TextField**: Text input field (requires label and name)
  - Basic: `<TextField label="Name" name="name" bind:value={val} />`
  - Required: `label` `name`
  - Props: `type="text|email|password|number|tel|url"` `placeholder` `bind:value` `isDisabled` `isRequired` `error` `class`
  - Default: `type="text"`

- **Select**: Dropdown selection (requires label, name, and options)
  - Basic: `<Select label="Role" name="role" {options} bind:value={val} />`
  - Required: `label` `name` `options={[{id, label}]}`
  - Props: `bind:value` `placeholder` `size="xs|sm|md|lg"` `isDisabled` `isRequired` `class`
  - Default: `size="md"`

### Display Components

- **Avatar**: User profile image (requires src)
  - Basic: `<Avatar src="/user.jpg" />`
  - Required: `src`
  - Props: `alt` `size="xs|sm|md|lg"` `class`
  - Default: `size="md"`

- **Icon**: Display Iconify icons (requires name)
  - Basic: `<Icon name="fluent:heart-24-regular" />`
  - Required: `name="fluent:icon-name-24-regular"`
  - Props: `size` `color` `class`

## Typography & Text Utilities

### Headings

Use standard HTML headings with automatic styling:

- `<h1>` - 4xl/5xl, extrabold
- `<h2>` - 3xl, semibold
- `<h3>` - 2xl, semibold
- `<h4>` - xl, semibold
- `<h5>` - lg, semibold
- `<h6>` - base, semibold

### Text Classes

- `.lead` - Larger text (text-lg)
- `.label` - Small label text (text-sm, font-medium)
- `.tiny` - Extra small text (text-xs, font-medium)
- `.link` - Styled link with hover (underline, hover:text-primary)
- `<strong>` - Bold/semibold text
- `<blockquote>` - Quoted text with left border

### Prose Container

Wrap content in `.prose` for article/documentation styling with consistent spacing, typography, and element styling for h1-h6, p, ul, ol, a, code, blockquote, table, etc.

```svelte
<div class="prose">
	<h1>Article Title</h1>
	<p>Content with automatic spacing and styling...</p>
	<ul>
		<li>List items styled automatically</li>
	</ul>
</div>
```

## Layout Utilities

### Flexbox Classes

- `.row` - Flex row layout
- `.row-reverse` - Flex row reversed
- `.column` - Flex column layout
- `.column-reverse` - Flex column reversed
- `.wrap` - Flex wrap
- `.center` - Center items (items-center justify-center)

### Container

- `.boxed` - Centered container with max-width

### Common Patterns

```svelte
<!-- Horizontal layout with gap -->
<div class="row gap-4">
	<Button>Action 1</Button>
	<Button>Action 2</Button>
</div>

<!-- Vertical stack -->
<div class="column gap-2">
	<TextField label="Field 1" name="field1" />
	<TextField label="Field 2" name="field2" />
</div>

<!-- Centered content -->
<div class="center">
	<Avatar src="/user.jpg" />
</div>
```

## Icons Reference

Use Iconify fluent icons: `icon="fluent:icon-name-24-regular"`

Common icons:

- `fluent:add-24-regular` - Add/Plus
- `fluent:edit-24-regular` - Edit
- `fluent:delete-24-regular` - Delete
- `fluent:checkmark-24-regular` - Check
- `fluent:dismiss-24-regular` - Close/X
- `fluent:search-24-regular` - Search
- `fluent:settings-24-regular` - Settings
- `fluent:person-24-regular` - User/Profile

Browse more: https://icon-sets.iconify.design/fluent/

## Usage Patterns

### Simple Form

```svelte
<script lang="ts">
	import { Section, Card, TextField, Button } from 'ui-svelte';
	let email = $state('');
	let password = $state('');
</script>

<Section>
	<Card title="Login">
		<div class="column gap-3">
			<TextField label="Email" name="email" type="email" bind:value={email} />
			<TextField label="Password" name="password" type="password" bind:value={password} />
			<Button onclick={() => console.log('login')}>Login</Button>
		</div>
	</Card>
</Section>
```

### User Profile

```svelte
<script lang="ts">
	import { Section, Card, Avatar, TextField, Select, Button } from 'ui-svelte';

	let name = $state('');
	let role = $state('');
	const roles = [
		{ id: 'admin', label: 'Admin' },
		{ id: 'user', label: 'User' }
	];
</script>

<Section>
	<Card>
		<div class="column gap-4">
			<div class="center">
				<Avatar src="/user.jpg" size="lg" />
			</div>
			<TextField label="Name" name="name" bind:value={name} />
			<Select label="Role" name="role" options={roles} bind:value={role} />
			<div class="row gap-2">
				<Button>Save</Button>
				<Button variant="outline">Cancel</Button>
			</div>
		</div>
	</Card>
</Section>
```

### Action Bar

```svelte
<script lang="ts">
	import { IconButton } from 'ui-svelte';
</script>

<div class="actions">
	<IconButton icon="fluent:add-24-regular" onclick={() => {}} />
	<IconButton icon="fluent:edit-24-regular" onclick={() => {}} />
	<IconButton icon="fluent:delete-24-regular" variant="danger" onclick={() => {}} />
</div>
```

## Documentation Components

For building component documentation pages, use these helper components:

- **DocHeader**: Page header with title and description
  - Props: `title` (required), children snippet for description, `textAlert` (optional)
  - Usage: `<DocHeader title="Component">{description}</DocHeader>`

- **DocCode**: Code block section wrapper
  - Props: `code` (required string)
  - Usage: `<DocCode {code} />`

- **DocProps**: Props table display
  - Props: `props` (required array of `{prop, type, initial, required?}`)
  - Usage: `<DocProps {props} />`

- **DocPreview**: Component preview with builder
  - Props: `preview` and `builder` snippets
  - Usage: `<DocPreview {preview} {builder} />`

- **DocOptions**: Options group wrapper
  - Props: `title` (string)
  - Usage: Wrap checkboxes/controls in `<DocOptions title="Props">...</DocOptions>`

## Best Practices

1. **Start minimal**: Use only required props, customize later
2. **State binding**: Use `bind:value` for TextField and Select
3. **Event handlers**: Always provide `onclick` for buttons (or `href` for links)
4. **Variants**: Match button variants to actions (primary, danger, outline)
5. **Layout**: Wrap pages in Section → Card for consistency
6. **Icons**: Use fluent icon set for visual consistency

## Component Import

```svelte
<script lang="ts">
	import { Section, Card, Avatar, Button, IconButton, TextField, Select, Icon } from 'ui-svelte';
</script>
```

Generate clean, functional Svelte UI code using these components with proper prop usage and state management.
