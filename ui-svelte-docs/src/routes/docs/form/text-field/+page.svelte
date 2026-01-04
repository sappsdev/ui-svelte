<script lang="ts">
	import { TextField, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import { Search24RegularIcon, Person24RegularIcon } from '$lib/icons';
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

	const typeOptions = [
		{ id: 'text', label: 'Text' },
		{ id: 'password', label: 'Password' },
		{ id: 'email', label: 'Email' },
		{ id: 'number', label: 'Number' },
		{ id: 'tel', label: 'Tel' },
		{ id: 'url', label: 'URL' }
	];

	let color: any = $state('muted');
	let variant: any = $state('outlined');
	let size: any = $state('md');
	let type: any = $state('text');

	let startIcon: any = $state(false);
	let endIcon: any = $state(false);
	let startContent = $state(false);
	let endContent = $state(false);
	let isFloatLabel = $state(false);
	let hasLabel = $state(true);
	let hasHelpText = $state(false);
	let hasErrorText = $state(false);

	let value = $state('');

	let hasProps = $derived(
		[
			color !== 'muted',
			variant !== 'outlined',
			size !== 'md',
			type !== 'text',
			startIcon,
			endIcon,
			startContent,
			endContent,
			isFloatLabel,
			hasLabel,
			hasHelpText,
			hasErrorText
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { TextField } from 'ui-svelte';`,
			(startIcon || endIcon) &&
				`\timport { Search24RegularIcon, Person24RegularIcon } from '$lib/icons';`,
			``,
			`\tlet value = $state('');`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<TextField`,
			hasProps && `\tbind:value`,
			hasLabel && !isFloatLabel && `\tlabel="Label"`,
			hasLabel && isFloatLabel && `\tlabel="Label"`,
			isFloatLabel && `\tisFloatLabel`,
			type !== 'text' && `\ttype="${type}"`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			startIcon && `\tstartIcon={Search24RegularIcon}`,
			endIcon && `\tendIcon={Person24RegularIcon}`,
			startContent && `\tstartContent="$"`,
			endContent && `\tendContent=".00"`,
			hasHelpText && `\thelpText="This is a help text"`,
			hasErrorText && `\terrorText="This field is required"`,
			hasProps && `\tplaceholder="Placeholder"`,
			hasProps && `/>`,
			!hasProps && `<TextField bind:value placeholder="Placeholder" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'value', type: 'string | number', initial: '' },
		{ prop: 'defaultValue', type: 'string', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: '' },
		{ prop: 'type', type: 'text | password | email | number | tel | url', initial: 'text' },
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
		{ prop: 'startIcon', type: 'IconData', initial: '' },
		{ prop: 'endIcon', type: 'IconData', initial: '' },
		{ prop: 'startContent', type: 'string', initial: '' },
		{ prop: 'endContent', type: 'string', initial: '' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'controlClass', type: 'string', initial: '' },
		{ prop: 'onchange', type: '(value: unknown) => void', initial: '' },
		{ prop: 'oninput', type: '(value: unknown) => void', initial: '' },
		{ prop: 'autocomplete', type: 'HTMLInputAttributes[autocomplete]', initial: '' },
		{ prop: 'min', type: 'HTMLInputAttributes[min]', initial: '' },
		{ prop: 'max', type: 'HTMLInputAttributes[max]', initial: '' },
		{ prop: 'maxlength', type: 'HTMLInputAttributes[maxlength]', initial: '' }
	];
</script>

<DocsHeader title="TextField" llmUrl="https://ui-svelte.sappsdev.com/llm/form/text-field.md">
	TextFields allow users to enter and edit text data.
</DocsHeader>

<Section>
	<Card color="background" variant="outlined">
		<div class="wrap gap-2">
			<Select
				isFloatLabel
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
				rootClass="w-32"
			/>
			<Select
				isFloatLabel
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
				rootClass="w-32"
			/>
			<Select
				isFloatLabel
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
				rootClass="w-32"
			/>
			<Select
				isFloatLabel
				label="Type"
				size="sm"
				options={typeOptions}
				bind:value={type}
				rootClass="w-32"
			/>
		</div>
		<div class="wrap gap-6">
			<Checkbox bind:checked={startIcon} label="startIcon" />
			<Checkbox bind:checked={endIcon} label="endIcon" />
			<Checkbox bind:checked={startContent} label="startContent" />
			<Checkbox bind:checked={endContent} label="endContent" />
			<Checkbox bind:checked={hasLabel} label="Label" />
			<Checkbox bind:checked={isFloatLabel} label="Float Label" />
			<Checkbox bind:checked={hasHelpText} label="Help Text" />
			<Checkbox bind:checked={hasErrorText} label="Error Text" />
		</div>

		<div class="doc-preview">
			<TextField
				bind:value
				startIcon={startIcon ? Search24RegularIcon : undefined}
				endIcon={endIcon ? Person24RegularIcon : undefined}
				startContent={startContent ? '$' : undefined}
				endContent={endContent ? '.00' : undefined}
				label={hasLabel ? 'Label' : undefined}
				{isFloatLabel}
				{color}
				{variant}
				{size}
				{type}
				helpText={hasHelpText ? 'This is a help text' : undefined}
				errorText={hasErrorText ? 'This field is required' : undefined}
				placeholder="Placeholder"
				rootClass="max-w-xs"
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
					<TextField
						variant={item.id as any}
						color={colorItem.id as any}
						placeholder={item.label + ' ' + colorItem.label}
						rootClass="max-w-xs"
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
					<TextField
						variant={item.id as any}
						size={sizeItem.id as any}
						placeholder={item.label + ' ' + sizeItem.label}
						rootClass="max-w-xs"
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Icons & Text</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<TextField startIcon={Search24RegularIcon} placeholder="Search..." rootClass="max-w-xs" />
			<TextField endIcon={Person24RegularIcon} placeholder="Username" rootClass="max-w-xs" />
			<TextField
				startIcon={Search24RegularIcon}
				endIcon={Person24RegularIcon}
				placeholder="Both Icons"
				rootClass="max-w-xs"
			/>
		</div>
		<div class="wrap gap-4 center">
			<TextField startContent="$" placeholder="Amount" rootClass="max-w-xs" />
			<TextField endContent=".00" placeholder="Price" rootClass="max-w-xs" />
			<TextField
				startContent="https://"
				endContent=".com"
				placeholder="domain"
				rootClass="max-w-xs"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Labels</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<TextField label="Standard Label" placeholder="Enter text..." rootClass="max-w-xs" />
			<TextField
				label="Float Label"
				isFloatLabel
				placeholder="Enter text..."
				rootClass="max-w-xs"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Help & Error Text</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<TextField
				label="With Help Text"
				helpText="This is helpful information"
				placeholder="Enter text..."
				rootClass="max-w-xs"
			/>
			<TextField
				label="With Error Text"
				errorText="This field is required"
				placeholder="Enter text..."
				rootClass="max-w-xs"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Input Types</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each typeOptions as typeItem}
				<TextField
					type={typeItem.id as any}
					placeholder={typeItem.label}
					label={typeItem.label}
					rootClass="max-w-xs"
				/>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
