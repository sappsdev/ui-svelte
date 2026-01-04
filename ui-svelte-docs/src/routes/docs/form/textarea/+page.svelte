<script lang="ts">
	import { Textarea, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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
	let rows: number = $state(4);

	let isFloatLabel = $state(false);
	let hasLabel = $state(true);
	let hasHelpText = $state(false);
	let hasErrorText = $state(false);
	let isResize = $state(false);

	let value = $state('');

	let hasProps = $derived(
		[
			color !== 'muted',
			variant !== 'outlined',
			size !== 'md',
			rows !== 4,
			isFloatLabel,
			hasLabel,
			hasHelpText,
			hasErrorText,
			isResize
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Textarea } from 'ui-svelte';`,
			``,
			`\tlet value = $state('');`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Textarea`,
			hasProps && `\tbind:value`,
			hasLabel && !isFloatLabel && `\tlabel="Label"`,
			hasLabel && isFloatLabel && `\tlabel="Label"`,
			isFloatLabel && `\tisFloatLabel`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			rows !== 4 && `\trows={${rows}}`,
			isResize && `\tisResize`,
			hasHelpText && `\thelpText="This is a help text"`,
			hasErrorText && `\terrorText="This field is required"`,
			hasProps && `\tplaceholder="Placeholder"`,
			hasProps && `/>`,
			!hasProps && `<Textarea bind:value placeholder="Placeholder" />`
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
		{ prop: 'rows', type: 'number', initial: '4' },
		{ prop: 'cols', type: 'number', initial: '' },
		{ prop: 'isResize', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'controlClass', type: 'string', initial: '' },
		{ prop: 'onchange', type: '(value: string) => void', initial: '' },
		{ prop: 'oninput', type: '(value: string) => void', initial: '' },
		{ prop: 'maxlength', type: 'HTMLTextareaAttributes[maxlength]', initial: '' }
	];
</script>

<DocsHeader title="Textarea" llmUrl="https://ui-svelte.sappsdev.com/llm/form/textarea.md">
	Textarea allows users to enter and edit multi-line text data.
</DocsHeader>

<Section>
	<Card color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
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
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hasLabel} label="Label" />
			<Checkbox bind:checked={isFloatLabel} label="Float Label" />
			<Checkbox bind:checked={hasHelpText} label="Help Text" />
			<Checkbox bind:checked={hasErrorText} label="Error Text" />
			<Checkbox bind:checked={isResize} label="Resizable" />
		</div>

		<div class="doc-preview">
			<Textarea
				bind:value
				label={hasLabel ? 'Label' : undefined}
				{isFloatLabel}
				{color}
				{variant}
				{size}
				{rows}
				{isResize}
				helpText={hasHelpText ? 'This is a help text' : undefined}
				errorText={hasErrorText ? 'This field is required' : undefined}
				placeholder="Placeholder"
				class="max-w-md"
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each sizeOptions as sizeItem}
					<Textarea
						variant={item.id as any}
						size={sizeItem.id as any}
						placeholder={item.label + ' ' + sizeItem.label}
						class="max-w-xs"
						rows={2}
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Labels</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<Textarea label="Standard Label" placeholder="Enter text..." class="max-w-xs" rows={3} />
			<Textarea
				label="Float Label"
				isFloatLabel
				placeholder="Enter text..."
				class="max-w-xs"
				rows={3}
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Help & Error Text</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<Textarea
				label="With Help Text"
				helpText="This is helpful information"
				placeholder="Enter text..."
				class="max-w-xs"
				rows={3}
			/>
			<Textarea
				label="With Error Text"
				errorText="This field is required"
				placeholder="Enter text..."
				class="max-w-xs"
				rows={3}
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Resizable</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<Textarea
				label="Not Resizable (default)"
				placeholder="Cannot resize..."
				class="max-w-xs"
				rows={3}
			/>
			<Textarea
				label="Resizable"
				isResize
				placeholder="Drag corner to resize..."
				class="max-w-xs"
				rows={3}
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
