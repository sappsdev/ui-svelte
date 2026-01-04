<script lang="ts">
	import { Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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

	const demoOptions = [
		{ id: 'option1', label: 'Option 1' },
		{ id: 'option2', label: 'Option 2' },
		{ id: 'option3', label: 'Option 3' },
		{ id: 'option4', label: 'Option 4' }
	];

	const avatarOptions = [
		{ id: 'john', label: 'John Doe', src: 'https://i.pravatar.cc/150?img=1' },
		{ id: 'jane', label: 'Jane Smith', src: 'https://i.pravatar.cc/150?img=2' },
		{ id: 'bob', label: 'Bob Wilson', src: 'https://i.pravatar.cc/150?img=3' }
	];

	const descriptionOptions = [
		{ id: 'admin', label: 'Administrator', description: 'Full access to all features' },
		{ id: 'editor', label: 'Editor', description: 'Can edit and publish content' },
		{ id: 'viewer', label: 'Viewer', description: 'Read-only access' }
	];

	let color: any = $state('primary');
	let variant: any = $state('outlined');
	let size: any = $state('md');
	let value: any = $state(undefined);

	let isFloatLabel = $state(false);
	let hasLabel = $state(true);
	let hasHelpText = $state(false);
	let hasErrorText = $state(false);

	let hasProps = $derived(
		[
			color !== 'primary',
			variant !== 'outlined',
			size !== 'md',
			isFloatLabel,
			hasLabel,
			hasHelpText,
			hasErrorText
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Select } from 'ui-svelte';`,
			``,
			`\tconst options = [`,
			`\t\t{ id: 'option1', label: 'Option 1' },`,
			`\t\t{ id: 'option2', label: 'Option 2' },`,
			`\t\t{ id: 'option3', label: 'Option 3' }`,
			`\t];`,
			``,
			`\tlet value = $state(undefined);`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Select`,
			hasProps && `\toptions={options}`,
			hasProps && `\tbind:value`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			hasLabel && !isFloatLabel && `\tlabel="Label"`,
			isFloatLabel && `\tisFloatLabel`,
			isFloatLabel && hasLabel && `\tlabel="Label"`,
			hasHelpText && `\thelpText="This is help text"`,
			hasErrorText && `\terrorText="This is an error"`,
			hasProps && `/>`,
			!hasProps && `<Select options={options} bind:value />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'options', type: 'Option[]', initial: '[]' },
		{ prop: 'value', type: 'unknown', initial: '' },
		{ prop: 'selected', type: 'Option', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: 'Select an option' },
		{ prop: 'onchange', type: '(value: unknown) => void', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning | background',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined | line',
			initial: 'outlined'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'isLabelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' }
	];

	const optionProps = [
		{ prop: 'id', type: 'string | number', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'src', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Select" llmUrl="https://ui-svelte.sappsdev.com/llm/form/select.md">
	Select allows users to choose from a list of options in a dropdown.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="wrap gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
		</div>
		<div class="wrap gap-2">
			<Checkbox bind:checked={hasLabel} label="Label" />
			<Checkbox bind:checked={isFloatLabel} label="Float Label" />
			<Checkbox bind:checked={hasHelpText} label="Help Text" />
			<Checkbox bind:checked={hasErrorText} label="Error Text" />
		</div>

		<div class="doc-preview">
			<Select
				{color}
				{variant}
				{size}
				{isFloatLabel}
				options={demoOptions}
				bind:value
				label={hasLabel ? 'Label' : undefined}
				helpText={hasHelpText ? 'This is help text' : undefined}
				errorText={hasErrorText ? 'This is an error' : undefined}
				rootClass="w-48"
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					<Select
						variant={item.id as any}
						color={colorItem.id as any}
						options={demoOptions}
						placeholder={item.label + ' ' + colorItem.label}
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each sizeOptions as sizeItem}
					<Select
						variant={item.id as any}
						size={sizeItem.id as any}
						options={demoOptions}
						placeholder={item.label + ' ' + sizeItem.label}
						rootClass="w-48"
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Avatar</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<Select options={avatarOptions} placeholder="Select a user" rootClass="w-64" />
			<Select isFloatLabel label="Select User" options={avatarOptions} rootClass="w-64" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Description</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<Select options={descriptionOptions} placeholder="Select a role" rootClass="w-64" />
			<Select isFloatLabel label="Select Role" options={descriptionOptions} rootClass="w-64" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Float Label</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each variantOptions as item}
				<Select
					isFloatLabel
					label={item.label}
					variant={item.id as any}
					options={demoOptions}
					rootClass="w-48"
				/>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Solid Background</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each variantOptions as item}
				<Select
					isFloatLabel
					label={item.label}
					variant={item.id as any}
					options={demoOptions}
					rootClass="w-48"
				/>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Help & Error Text</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<Select
				label="With Help Text"
				options={demoOptions}
				helpText="This is helpful information"
				rootClass="w-64"
			/>
			<Select
				label="With Error"
				options={demoOptions}
				errorText="This field is required"
				rootClass="w-64"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">Option Type:</p>
	<DocsProps props={optionProps} />
</Section>
