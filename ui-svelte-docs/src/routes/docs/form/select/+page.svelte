<script lang="ts">
	import { Card, Checkbox, Code, Section, Select, Tabs } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

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

	const selectOptions = [
		{ id: '1', src: '/images/avatar-1.jpeg', label: 'John Doe', description: 'Designer' },
		{ id: '2', src: '/images/avatar-2.jpeg', label: 'Jane Smith', description: 'Developer' },
		{ id: '3', src: '/images/avatar-3.jpeg', label: 'Mike Johnson', description: 'Manager' },
		{ id: '4', src: '/images/avatar-4.jpeg', label: 'Emily Davis', description: 'Intern' },
		{ id: '5', src: '/images/avatar-5.jpeg', label: 'David Wilson', description: 'CEO' }
	];

	let variant: any = $state('outlined');
	let size: any = $state('md');

	let label = $state('');
	let helpText = $state('');
	let errorText = $state('');

	let withAvatar = $state(false);
	let withDescription = $state(false);
	let isFloatLabel = $state(false);
	let isSolid = $state(false);

	let buildOptions: any = $derived.by(() => {
		if (withDescription && !withAvatar) {
			return selectOptions.map((option) => ({
				...option,
				description: option.description,
				src: undefined
			}));
		} else if (!withDescription && withAvatar) {
			return selectOptions.map((option) => ({
				...option,
				description: undefined,
				src: option.src
			}));
		} else if (withDescription && withAvatar) {
			return selectOptions;
		} else {
			return selectOptions.map((option) => ({
				...option,
				description: undefined,
				src: undefined
			}));
		}
	});

	let hasProps = $derived(
		[
			variant !== 'outlined',
			size !== 'md',
			label,
			helpText,
			errorText,
			withAvatar,
			withDescription,
			isFloatLabel,
			isSolid
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Select } from 'ui-svelte';`,
			`\n\tconst options = [`,
			`\t\t{ id: '1', label: 'John Doe'${withAvatar ? ", src: '/avatar-1.jpeg'" : ''}${withDescription ? ", description: 'Designer'" : ''} },`,
			`\t\t{ id: '2', label: 'Jane Smith'${withAvatar ? ", src: '/avatar-2.jpeg'" : ''}${withDescription ? ", description: 'Developer'" : ''} },`,
			`\t\t{ id: '3', label: 'Mike Johnson'${withAvatar ? ", src: '/avatar-3.jpeg'" : ''}${withDescription ? ", description: 'Manager'" : ''} }`,
			`\t];`,
			`\n\tlet value = $state('');`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Select`,
			hasProps && `\tname="select"`,
			hasProps && `\tplaceholder="Select an option..."`,
			hasProps && `\toptions={options}`,
			label && `\tlabel="${label}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			helpText && `\thelpText="This is a help text"`,
			errorText && `\terrorText="This field is required"`,
			isFloatLabel && `\tisFloatLabel`,
			isSolid && `\tisSolid`,
			hasProps && `\tbind:value`,
			hasProps && `/>`,
			!hasProps &&
				`<Select name="select" placeholder="Select an option..." options={options} bind:value />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'options', type: 'Option[]', initial: '[]', required: true },
		{ prop: 'value', type: 'unknown', initial: '' },
		{ prop: 'selected', type: 'Option', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: '' },
		{ prop: 'onchange', type: '(value: unknown) => void', initial: '' },
		{ prop: 'variant', type: 'primary | secondary | muted | outlined | line', initial: 'outlined' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'controlClass', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'labelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
	];

	const optionProps = [
		{ prop: 'id', type: 'string | number', initial: '', required: true },
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'src', type: 'string', initial: '' }
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
			description: 'Subtle filled background for less prominent selects'
		},
		{
			variant: 'line',
			description: 'Minimalist style with only bottom border'
		}
	];

	let value = $state('');
</script>

<DocsHeader title="Select">
	Select components allow users to choose one option from a dropdown list. They support labels,
	descriptions, avatars, help text, and validation states.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Select
			name="select"
			placeholder="Select an option..."
			options={buildOptions}
			{variant}
			{size}
			{isSolid}
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
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={withAvatar} label="Avatar" />
			<Checkbox bind:checked={withDescription} label="Description" />
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
		<Select
			name="ex-outlined"
			placeholder="Select..."
			variant="outlined"
			options={[
				{ id: '1', label: 'Option 1' },
				{ id: '2', label: 'Option 2' }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">variant="outlined"</code>
		{/snippet}
	</Card>

	<!-- Primary Example -->
	<Card>
		{#snippet header()}
			<h4>Primary</h4>
		{/snippet}
		<Select
			name="ex-primary"
			placeholder="Select..."
			variant="primary"
			options={[
				{ id: '1', label: 'Option 1' },
				{ id: '2', label: 'Option 2' }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">variant="primary"</code>
		{/snippet}
	</Card>

	<!-- Secondary Example -->
	<Card>
		{#snippet header()}
			<h4>Secondary</h4>
		{/snippet}
		<Select
			name="ex-secondary"
			placeholder="Select..."
			variant="secondary"
			options={[
				{ id: '1', label: 'Option 1' },
				{ id: '2', label: 'Option 2' }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">variant="secondary"</code>
		{/snippet}
	</Card>

	<!-- Muted Example -->
	<Card>
		{#snippet header()}
			<h4>Muted</h4>
		{/snippet}
		<Select
			name="ex-muted"
			placeholder="Select..."
			variant="muted"
			options={[
				{ id: '1', label: 'Option 1' },
				{ id: '2', label: 'Option 2' }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">variant="muted"</code>
		{/snippet}
	</Card>

	<!-- Line Example -->
	<Card>
		{#snippet header()}
			<h4>Line</h4>
		{/snippet}
		<Select
			name="ex-line"
			placeholder="Select..."
			variant="line"
			options={[
				{ id: '1', label: 'Option 1' },
				{ id: '2', label: 'Option 2' }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">variant="line"</code>
		{/snippet}
	</Card>

	<!-- Solid Example -->
	<Card>
		{#snippet header()}
			<h4>Solid</h4>
		{/snippet}
		<Select
			name="ex-solid"
			placeholder="Select..."
			variant="primary"
			isSolid
			options={[
				{ id: '1', label: 'Option 1' },
				{ id: '2', label: 'Option 2' }
			]}
		/>
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
		<Select
			name="ex-label"
			placeholder="Select..."
			label="Team Member"
			options={[
				{ id: '1', label: 'John Doe' },
				{ id: '2', label: 'Jane Smith' }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">label="Team Member"</code>
		{/snippet}
	</Card>

	<!-- Float Label -->
	<Card>
		{#snippet header()}
			<h4>Float Label</h4>
		{/snippet}
		<Select
			name="ex-float"
			placeholder="Select..."
			label="Country"
			isFloatLabel
			options={[
				{ id: '1', label: 'United States' },
				{ id: '2', label: 'Canada' }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">label="Country" isFloatLabel</code>
		{/snippet}
	</Card>

	<!-- With Help Text -->
	<Card>
		{#snippet header()}
			<h4>With Help Text</h4>
		{/snippet}
		<Select
			name="ex-help"
			placeholder="Select..."
			helpText="Choose your preferred option"
			options={[
				{ id: '1', label: 'Option A' },
				{ id: '2', label: 'Option B' }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">helpText="..."</code>
		{/snippet}
	</Card>

	<!-- With Error -->
	<Card>
		{#snippet header()}
			<h4>With Error</h4>
		{/snippet}
		<Select
			name="ex-error"
			placeholder="Select..."
			errorText="This field is required"
			options={[
				{ id: '1', label: 'Option A' },
				{ id: '2', label: 'Option B' }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">errorText="..."</code>
		{/snippet}
	</Card>

	<!-- With Avatar -->
	<Card>
		{#snippet header()}
			<h4>With Avatar</h4>
		{/snippet}
		<Select
			name="ex-avatar"
			placeholder="Select team member..."
			options={[
				{ id: '1', label: 'John Doe', src: '/avatar-1.jpeg' },
				{ id: '2', label: 'Jane Smith', src: '/avatar-2.jpeg' }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">src="/avatar.jpeg"</code>
		{/snippet}
	</Card>

	<!-- With Description -->
	<Card>
		{#snippet header()}
			<h4>With Description</h4>
		{/snippet}
		<Select
			name="ex-desc"
			placeholder="Select team member..."
			options={[
				{ id: '1', label: 'John Doe', description: 'Designer' },
				{ id: '2', label: 'Jane Smith', description: 'Developer' }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">description="Designer"</code>
		{/snippet}
	</Card>
</Section>

<Section>
	<DocsProps props={optionProps} />
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Float Labels:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">isFloatLabel</code> for a modern, compact select style
					where the label animates into position
				</li>
				<li>
					<strong>Validation:</strong> Combine
					<code class="px-1 py-0.5 bg-blue rounded">errorText</code>
					with reactive state for real-time form validation feedback
				</li>
				<li>
					<strong>Avatars:</strong> Add <code class="px-1 py-0.5 bg-blue rounded">src</code> to options
					for visual user/item selection
				</li>
				<li>
					<strong>Descriptions:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">description</code> in options for additional context
				</li>
				<li>
					<strong>Events:</strong> Use <code class="px-1 py-0.5 bg-blue rounded">onchange</code> to react
					when the selection changes
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
	import { Select } from 'ui-svelte';

	const countries = [
		{ id: 'us', label: 'United States' },
		{ id: 'ca', label: 'Canada' },
		{ id: 'mx', label: 'Mexico' }
	];

	const teamMembers = [
		{ id: '1', label: 'John Doe', src: '/avatar-1.jpeg', description: 'Designer' },
		{ id: '2', label: 'Jane Smith', src: '/avatar-2.jpeg', description: 'Developer' },
		{ id: '3', label: 'Mike Johnson', src: '/avatar-3.jpeg', description: 'Manager' }
	];

	let country = $state('');
	let member = $state('');
<\/script>

<!-- Basic -->
<Select name="country" placeholder="Select a country..." options={countries} bind:value={country} />

<!-- With Label -->
<Select name="country" label="Country" placeholder="Select..." options={countries} bind:value={country} />

<!-- Float Label -->
<Select name="country" label="Country" isFloatLabel options={countries} bind:value={country} />

<!-- With Validation -->
<Select
	name="country"
	label="Country"
	errorText={!country ? 'Please select a country' : ''}
	options={countries}
	bind:value={country}
/>

<!-- With Help Text -->
<Select
	name="country"
	label="Country"
	helpText="Select your country of residence"
	options={countries}
	bind:value={country}
/>

<!-- With Avatars and Descriptions -->
<Select
	name="member"
	placeholder="Select team member..."
	options={teamMembers}
	bind:value={member}
/>

<!-- With Change Handler -->
<Select
	name="country"
	options={countries}
	onchange={(value) => console.log('Selected:', value)}
/>`}
		/>
	</Card>
</Section>
