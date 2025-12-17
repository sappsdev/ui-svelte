<script lang="ts">
	import { Card, Checkbox, Code, Section, Select, Tabs } from 'ui-svelte';
	import { HeartLinearIcon, Search24RegularIcon } from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';
	import { TextField } from 'ui-svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'line', label: 'Line' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'Small' },
		{ id: 'md', label: 'Medium' },
		{ id: 'lg', label: 'Large' }
	];

	const typeOptions = [
		{ id: 'text', label: 'Text' },
		{ id: 'email', label: 'Email' },
		{ id: 'password', label: 'Password' },
		{ id: 'number', label: 'Number' },
		{ id: 'tel', label: 'Tel' },
		{ id: 'url', label: 'URL' }
	];

	let variant: any = $state('outlined');
	let size: any = $state('md');
	let type: any = $state('text');

	let startIcon = $state(false);
	let endIcon = $state(false);
	let startText = $state('');
	let endText = $state('');
	let label = $state('');
	let helpText = $state('');
	let errorText = $state('');

	let isFloatLabel = $state(false);
	let isSolid = $state(false);

	let hasProps = $derived(
		[
			variant !== 'outlined',
			size !== 'md',
			type !== 'text',
			startIcon,
			endIcon,
			startText,
			endText,
			label,
			helpText,
			errorText,
			isFloatLabel,
			isSolid
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { TextField } from 'ui-svelte';`,
			startIcon || endIcon
				? `\timport { Search24RegularIcon, HeartLinearIcon } from '$lib/icons';`
				: '',
			`\n\tlet value = $state('');`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<TextField`,
			hasProps && `\tname="textfield"`,
			hasProps && `\tplaceholder="Enter text..."`,
			type !== 'text' && `\ttype="${type}"`,
			label && `\tlabel="${label}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			startIcon && `\tstartIcon={Search24RegularIcon}`,
			endIcon && `\tendIcon={HeartLinearIcon}`,
			startText && `\tstartText="https://"`,
			endText && `\tendText=".com"`,
			helpText && `\thelpText="This is a help text"`,
			errorText && `\terrorText="This field is required"`,
			isFloatLabel && `\tisFloatLabel`,
			isSolid && `\tisSolid`,
			hasProps && `\tbind:value`,
			hasProps && `/>`,
			!hasProps && `<TextField name="textfield" placeholder="Enter text..." bind:value />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'el', type: 'HTMLInputElement', initial: '' },
		{ prop: 'value', type: 'string | number', initial: '' },
		{ prop: 'defaultValue', type: 'string', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: '' },
		{ prop: 'type', type: 'text | password | email | number | tel | url', initial: 'text' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'controlClass', type: 'string', initial: '' },
		{ prop: 'startIcon', type: 'IconData', initial: '' },
		{ prop: 'endIcon', type: 'IconData', initial: '' },
		{ prop: 'startText', type: 'string', initial: '' },
		{ prop: 'endText', type: 'string', initial: '' },
		{ prop: 'onchange', type: '(value: unknown) => void', initial: '' },
		{ prop: 'oninput', type: '(value: unknown) => void', initial: '' },
		{ prop: 'variant', type: 'primary | secondary | muted | outlined | line', initial: 'outlined' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'islabelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'autocomplete', type: "HTMLInputAttributes['autocomplete']", initial: '' },
		{ prop: 'min', type: "HTMLInputAttributes['min']", initial: '' },
		{ prop: 'max', type: "HTMLInputAttributes['max']", initial: '' },
		{ prop: 'maxlength', type: "HTMLInputAttributes['maxlength']", initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
	];

	const variantDescriptions = [
		{
			variant: 'outlined',
			description: 'Default variant with a subtle border that highlights on focus'
		},
		{
			variant: 'primary',
			description: 'Filled background with primary color theme'
		},
		{
			variant: 'secondary',
			description: 'Filled background with secondary color theme'
		},
		{
			variant: 'muted',
			description: 'Subtle filled background for less prominent inputs'
		},
		{
			variant: 'line',
			description: 'Minimalist style with only bottom border'
		}
	];

	let value = $state('');
</script>

<DocsHeader title="TextField">
	Text fields allow users to enter and edit single-line text. They support various input types,
	labels, help text, validation states, and icon decorations.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<TextField
			name="textfield"
			placeholder="Enter text..."
			{variant}
			{size}
			{type}
			{isSolid}
			startIcon={startIcon ? Search24RegularIcon : undefined}
			endIcon={endIcon ? HeartLinearIcon : undefined}
			{startText}
			{endText}
			label={label || undefined}
			helpText={helpText || undefined}
			errorText={errorText || undefined}
			isFloatLabel={label && isFloatLabel ? isFloatLabel : undefined}
			bind:value
		/>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<Select label="Type" size="sm" options={typeOptions} bind:value={type} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={startIcon} label="startIcon" />
			<Checkbox bind:checked={endIcon} label="endIcon" />
			<Checkbox
				onchange={(v) => (v ? (startText = 'https://') : (startText = ''))}
				label="startText"
			/>
			<Checkbox onchange={(v) => (v ? (endText = '.com') : (endText = ''))} label="endText" />
			<Checkbox onchange={(v) => (v ? (label = 'Label') : (label = ''))} label="Label" />
			{#if label}
				<Checkbox bind:checked={isFloatLabel} label="floatLabel" />
			{/if}
			<Checkbox
				onchange={(v) => (v ? (helpText = 'This is a help text') : (helpText = ''))}
				label="helpText"
			/>
			<Checkbox
				onchange={(v) => (v ? (errorText = 'This field is required') : (errorText = ''))}
				label="errorText"
			/>
			<Checkbox bind:checked={isSolid} label="solid" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<DocsProps {props} />
</Section>

<Section bodyClass="grid-2 md:grid-3">
	<!-- Outlined Example -->
	<Card>
		{#snippet header()}
			<h4>Outlined</h4>
		{/snippet}
		<TextField name="ex-outlined" placeholder="Enter text..." variant="outlined" />
		{#snippet footer()}
			<code class="text-xs">variant="outlined"</code>
		{/snippet}
	</Card>

	<!-- Primary Example -->
	<Card>
		{#snippet header()}
			<h4>Primary</h4>
		{/snippet}
		<TextField name="ex-primary" placeholder="Enter text..." variant="primary" />
		{#snippet footer()}
			<code class="text-xs">variant="primary"</code>
		{/snippet}
	</Card>

	<!-- Secondary Example -->
	<Card>
		{#snippet header()}
			<h4>Secondary</h4>
		{/snippet}
		<TextField name="ex-secondary" placeholder="Enter text..." variant="secondary" />
		{#snippet footer()}
			<code class="text-xs">variant="secondary"</code>
		{/snippet}
	</Card>

	<!-- Muted Example -->
	<Card>
		{#snippet header()}
			<h4>Muted</h4>
		{/snippet}
		<TextField name="ex-muted" placeholder="Enter text..." variant="muted" />
		{#snippet footer()}
			<code class="text-xs">variant="muted"</code>
		{/snippet}
	</Card>

	<!-- Line Example -->
	<Card>
		{#snippet header()}
			<h4>Line</h4>
		{/snippet}
		<TextField name="ex-line" placeholder="Enter text..." variant="line" />
		{#snippet footer()}
			<code class="text-xs">variant="line"</code>
		{/snippet}
	</Card>

	<!-- Solid Example -->
	<Card>
		{#snippet header()}
			<h4>Solid</h4>
		{/snippet}
		<TextField name="ex-solid" placeholder="Enter text..." variant="primary" isSolid />
		{#snippet footer()}
			<code class="text-xs">variant="primary" isSolid</code>
		{/snippet}
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-3">
	<!-- With Label -->
	<Card>
		{#snippet header()}
			<h4>With Label</h4>
		{/snippet}
		<TextField name="ex-label" placeholder="Enter name..." label="Name" />
		{#snippet footer()}
			<code class="text-xs">label="Name"</code>
		{/snippet}
	</Card>

	<!-- Float Label -->
	<Card>
		{#snippet header()}
			<h4>Float Label</h4>
		{/snippet}
		<TextField name="ex-float" placeholder="Enter email..." label="Email" isFloatLabel />
		{#snippet footer()}
			<code class="text-xs">label="Email" isFloatLabel</code>
		{/snippet}
	</Card>

	<!-- With Help Text -->
	<Card>
		{#snippet header()}
			<h4>With Help Text</h4>
		{/snippet}
		<TextField name="ex-help" placeholder="Enter username..." helpText="Must be 3-20 characters" />
		{#snippet footer()}
			<code class="text-xs">helpText="..."</code>
		{/snippet}
	</Card>

	<!-- With Error -->
	<Card>
		{#snippet header()}
			<h4>With Error</h4>
		{/snippet}
		<TextField name="ex-error" placeholder="Enter email..." errorText="Invalid email format" />
		{#snippet footer()}
			<code class="text-xs">errorText="..."</code>
		{/snippet}
	</Card>

	<!-- With Icons -->
	<Card>
		{#snippet header()}
			<h4>With Icons</h4>
		{/snippet}
		<TextField
			name="ex-icons"
			placeholder="Search..."
			startIcon={Search24RegularIcon}
			endIcon={HeartLinearIcon}
		/>
		{#snippet footer()}
			<code class="text-xs">startIcon endIcon</code>
		{/snippet}
	</Card>

	<!-- With Text Addons -->
	<Card>
		{#snippet header()}
			<h4>Text Addons</h4>
		{/snippet}
		<TextField name="ex-addons" placeholder="domain" startText="https://" endText=".com" />
		{#snippet footer()}
			<code class="text-xs">startText endText</code>
		{/snippet}
	</Card>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Float Labels:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">isFloatLabel</code> for a modern, compact input style
					where the label animates into position
				</li>
				<li>
					<strong>Validation:</strong> Combine
					<code class="px-1 py-0.5 bg-blue rounded">errorText</code>
					with reactive state for real-time form validation feedback
				</li>
				<li>
					<strong>Icons:</strong> Use <code class="px-1 py-0.5 bg-blue rounded">startIcon</code> and
					<code class="px-1 py-0.5 bg-blue rounded">endIcon</code> for visual context (search, password
					toggle, etc.)
				</li>
				<li>
					<strong>Input Types:</strong> Set <code class="px-1 py-0.5 bg-blue rounded">type</code> to
					<code>email</code>, <code>password</code>, <code>number</code>, etc. for appropriate
					keyboard and validation
				</li>
				<li>
					<strong>Events:</strong> Use <code class="px-1 py-0.5 bg-blue rounded">oninput</code> for
					live updates and <code class="px-1 py-0.5 bg-blue rounded">onchange</code> for blur events
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<script lang="ts">
	import { TextField } from 'ui-svelte';
	import { Search24RegularIcon } from '$lib/icons';

	let name = $state('');
	let email = $state('');
	let password = $state('');
<\/script>

<!-- Basic -->
<TextField name="name" placeholder="Enter name..." bind:value={name} />

<!-- With Label -->
<TextField name="username" label="Username" placeholder="Enter username..." bind:value={name} />

<!-- Email Input -->
<TextField name="email" type="email" label="Email" placeholder="Enter email..." bind:value={email} />

<!-- Password Field -->
<TextField name="password" type="password" label="Password" bind:value={password} />

<!-- Float Label -->
<TextField name="email" type="email" label="Email" isFloatLabel bind:value={email} />

<!-- With Validation -->
<TextField
	name="email"
	type="email"
	label="Email"
	errorText={!email.includes('@') ? 'Invalid email' : ''}
	bind:value={email}
/>

<!-- With Help Text -->
<TextField
	name="username"
	label="Username"
	helpText="Must be 3-20 characters"
	bind:value={name}
/>

<!-- Number Input with Range -->
<TextField name="age" type="number" min={0} max={120} label="Age" />

<!-- With Search Icon -->
<TextField
	name="search"
	placeholder="Search..."
	startIcon={Search24RegularIcon}
	bind:value={name}
/>

<!-- URL Input with Addons -->
<TextField
	name="website"
	placeholder="yoursite"
	startText="https://"
	endText=".com"
/>`}
		/>
	</Card>
</Section>
