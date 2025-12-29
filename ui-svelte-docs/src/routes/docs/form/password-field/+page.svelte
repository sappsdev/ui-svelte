<script lang="ts">
	import { PasswordField, Card, Checkbox, Code, Section, Select, TextField } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'line', label: 'Line' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	let color: any = $state('muted');
	let variant: any = $state('outlined');
	let size: any = $state('md');

	let isFloatLabel = $state(false);
	let hasLabel = $state(true);
	let hasHelpText = $state(false);
	let hasErrorText = $state(false);
	let hideStrength = $state(false);

	let value = $state('');

	let hasProps = $derived(
		[
			color !== 'muted',
			variant !== 'outlined',
			size !== 'md',
			isFloatLabel,
			hasLabel,
			hasHelpText,
			hasErrorText,
			hideStrength
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { PasswordField } from 'ui-svelte';`,
			``,
			`\tlet value = $state('');`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<PasswordField`,
			hasProps && `\tbind:value`,
			hasLabel && !isFloatLabel && `\tlabel="Password"`,
			hasLabel && isFloatLabel && `\tlabel="Password"`,
			isFloatLabel && `\tisFloatLabel`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			hasHelpText && `\thelpText="Use at least 8 characters"`,
			hasErrorText && `\terrorText="Password is too weak"`,
			hideStrength && `\thideStrength`,
			hasProps && `\tplaceholder="Enter password"`,
			hasProps && `/>`,
			!hasProps && `<PasswordField bind:value placeholder="Enter password" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'value', type: 'string', initial: '' },
		{ prop: 'defaultValue', type: 'string', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: '' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'muted'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined | line',
			initial: 'outlined'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'hideStrength', type: 'boolean', initial: 'false' },
		{
			prop: 'labels',
			type: '{ weak?: string; medium?: string; strong?: string }',
			initial: '{ weak: "Weak", medium: "Medium", strong: "Strong" }'
		},
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'controlClass', type: 'string', initial: '' },
		{ prop: 'onchange', type: '(value: string | number | undefined) => void', initial: '' },
		{ prop: 'oninput', type: '(value: string | number | undefined) => void', initial: '' }
	];
</script>

<DocsHeader
	title="PasswordField"
	llmUrl="https://ui-svelte.sappsdev.com/llm/form/password-field.md"
>
	PasswordField is a specialized input component for password entry with built-in visibility toggle
	and password strength indicator.
</DocsHeader>

<Section>
	<Card>
		<div class="wrap gap-2">
			<Select
				isFloatLabel
				rootClass="w-32"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
			<Select
				isFloatLabel
				rootClass="w-32"
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			<Select
				isFloatLabel
				rootClass="w-32"
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
		</div>
		<div class="wrap gap-6">
			<Checkbox bind:checked={hasLabel} label="Label" />
			<Checkbox bind:checked={isFloatLabel} label="Float Label" />
			<Checkbox bind:checked={hasHelpText} label="Help Text" />
			<Checkbox bind:checked={hasErrorText} label="Error Text" />
			<Checkbox bind:checked={hideStrength} label="Hide Strength" />
		</div>

		<div class="doc-preview">
			<PasswordField
				bind:value
				label={hasLabel ? 'Password' : undefined}
				{isFloatLabel}
				{color}
				{variant}
				{size}
				helpText={hasHelpText ? 'Use at least 8 characters' : undefined}
				errorText={hasErrorText ? 'Password is too weak' : undefined}
				{hideStrength}
				placeholder="Enter password"
				rootClass="max-w-xs"
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each sizeOptions as sizeItem}
					<PasswordField
						variant={item.id as any}
						size={sizeItem.id as any}
						placeholder={item.label + ' ' + sizeItem.label}
						rootClass="max-w-xs"
						hideStrength
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Labels</p>
	<Card>
		<div class="wrap gap-4 center">
			<PasswordField
				label="Standard Label"
				placeholder="Enter password..."
				rootClass="max-w-xs"
				hideStrength
			/>
			<PasswordField
				label="Float Label"
				isFloatLabel
				placeholder="Enter password..."
				rootClass="max-w-xs"
				hideStrength
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Password Strength</p>
	<Card>
		<div class="wrap gap-4 center">
			<PasswordField
				label="With Strength Indicator"
				placeholder="Enter password..."
				rootClass="max-w-xs"
			/>
			<PasswordField
				label="Without Strength Indicator"
				placeholder="Enter password..."
				rootClass="max-w-xs"
				hideStrength
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Custom Strength Labels</p>
	<Card>
		<div class="wrap gap-4 center">
			<PasswordField
				label="Spanish Labels"
				placeholder="Ingrese contraseña..."
				rootClass="max-w-xs"
				labels={{ weak: 'Débil', medium: 'Media', strong: 'Fuerte' }}
			/>
			<PasswordField
				label="Emoji Labels"
				placeholder="Enter password..."
				rootClass="max-w-xs"
				labels={{ weak: '😟 Weak', medium: '😐 Medium', strong: '💪 Strong' }}
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Help & Error Text</p>
	<Card>
		<div class="wrap gap-4 center">
			<PasswordField
				label="With Help Text"
				helpText="Use at least 8 characters with mix of letters, numbers & symbols"
				placeholder="Enter password..."
				rootClass="max-w-xs"
			/>
			<PasswordField
				label="With Error Text"
				errorText="Password is required"
				placeholder="Enter password..."
				rootClass="max-w-xs"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Login Form Example</p>
	<Card>
		<div class="stack gap-4 max-w-sm mx-auto">
			<TextField label="Email" type="email" placeholder="you@example.com" />
			<PasswordField label="Password" placeholder="Enter your password" hideStrength />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Registration Form Example</p>
	<Card>
		<div class="stack gap-4 max-w-sm mx-auto">
			<TextField label="Full Name" placeholder="John Doe" />
			<TextField label="Email" type="email" placeholder="you@example.com" />
			<PasswordField
				label="Password"
				placeholder="Create a strong password"
				helpText="At least 8 characters with uppercase, lowercase, numbers and symbols"
			/>
			<PasswordField label="Confirm Password" placeholder="Confirm your password" hideStrength />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
