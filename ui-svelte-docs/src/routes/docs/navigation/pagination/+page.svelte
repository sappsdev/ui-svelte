<script lang="ts">
	import { Pagination, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	const alignOptions = [
		{ id: 'start', label: 'Start' },
		{ id: 'center', label: 'Center' },
		{ id: 'end', label: 'End' }
	];

	let color: any = $state('primary');
	let variant: any = $state('solid');
	let size: any = $state('md');
	let align: any = $state('center');
	let page = $state(1);
	let hidePageNumbers = $state(false);

	const totalPages = 10;

	const handlePageChange = (newPage: number) => {
		page = newPage;
	};

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Pagination } from 'ui-svelte';`,
			``,
			`\tlet page = $state(1);`,
			`\tconst totalPages = 10;`,
			``,
			`\tconst handlePageChange = (newPage: number) => {`,
			`\t\tpage = newPage;`,
			`\t};`,
			`<\/script>`
		];

		const componentLines = [
			`<Pagination`,
			`\t{page}`,
			`\ttotalPages={${totalPages}}`,
			`\tonPageChange={handlePageChange}`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			align !== 'center' && `\talign="${align}"`,
			hidePageNumbers && `\thidePageNumbers`,
			`/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'page', type: 'number', initial: '1', description: 'Current page number' },
		{ prop: 'totalPages', type: 'number', initial: '1', description: 'Total number of pages' },
		{
			prop: 'onPageChange',
			type: '(page: number) => void',
			initial: '',
			description: 'Callback when page changes'
		},
		{
			prop: 'onPrev',
			type: '() => void',
			initial: '',
			description: 'Callback for previous button'
		},
		{ prop: 'onNext', type: '() => void', initial: '', description: 'Callback for next button' },
		{
			prop: 'hasPrevPage',
			type: 'boolean',
			initial: '',
			description: 'Override for previous button state'
		},
		{
			prop: 'hasNextPage',
			type: 'boolean',
			initial: '',
			description: 'Override for next button state'
		},
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined | ghost',
			initial: 'solid'
		},
		{ prop: 'size', type: 'xs | sm | md | lg | xl', initial: 'md' },
		{ prop: 'align', type: 'start | center | end', initial: 'center' },
		{ prop: 'hidePageNumbers', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Pagination" llmUrl="https://ui-svelte.sappsdev.com/llm/navigation/pagination.md">
	Pagination allows users to navigate through large sets of data split across multiple pages.
</DocsHeader>

<Section>
	<Card>
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
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Alignment"
				size="sm"
				options={alignOptions}
				bind:value={align}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hidePageNumbers} label="Hide Page Numbers" />
		</div>

		<div class="doc-preview">
			<Pagination
				{page}
				{totalPages}
				onPageChange={handlePageChange}
				{color}
				{variant}
				{size}
				{align}
				{hidePageNumbers}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as c}
					<Pagination
						page={3}
						totalPages={5}
						variant={item.id as any}
						color={c.id as any}
						size="sm"
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		{#each sizeOptions as s}
			<div class="wrap gap-4 center">
				<Pagination page={2} totalPages={5} size={s.id as any} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Alignment</p>
	<Card>
		{#each alignOptions as a}
			<div class="wrap gap-4">
				<Pagination page={2} totalPages={5} align={a.id as any} size="sm" variant="soft" />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Without Page Numbers</p>
	<Card>
		<div class="wrap gap-4 center">
			<Pagination page={3} totalPages={10} hidePageNumbers variant="soft" />
			<Pagination page={3} totalPages={10} hidePageNumbers variant="outlined" />
			<Pagination page={3} totalPages={10} hidePageNumbers variant="ghost" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
