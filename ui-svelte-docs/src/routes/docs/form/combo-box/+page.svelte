<script lang="ts">
	import { ComboBox, useSearch, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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

	const exampleOptions = [
		{ id: 'basic', label: 'Client-Side Basic' },
		{ id: 'server', label: 'Server-Side (API)' },
		{ id: 'descriptions', label: 'With Descriptions' },
		{ id: 'avatars', label: 'With Avatars' },
		{ id: 'disabled', label: 'Disabled Options' }
	];

	const basicOptions = [
		{ id: '1', label: 'Apple' },
		{ id: '2', label: 'Banana' },
		{ id: '3', label: 'Cherry' },
		{ id: '4', label: 'Date' },
		{ id: '5', label: 'Elderberry' },
		{ id: '6', label: 'Fig' },
		{ id: '7', label: 'Grape' },
		{ id: '8', label: 'Honeydew' }
	];

	const descriptionOptions = [
		{ id: '1', label: 'John Doe', description: 'Software Engineer' },
		{ id: '2', label: 'Jane Smith', description: 'Product Designer' },
		{ id: '3', label: 'Bob Johnson', description: 'Project Manager' },
		{ id: '4', label: 'Alice Williams', description: 'Data Analyst' },
		{ id: '5', label: 'Charlie Brown', description: 'DevOps Engineer' }
	];

	const avatarOptions = [
		{ id: '1', label: 'John Doe', description: 'Designer', src: '/avatar-1.jpeg' },
		{ id: '2', label: 'Jane Smith', description: 'Developer', src: '/avatar-2.jpeg' },
		{ id: '3', label: 'Bob Johnson', description: 'Manager', src: '/avatar-3.jpeg' },
		{ id: '4', label: 'Alice Williams', description: 'Intern', src: '/avatar-4.jpeg' },
		{ id: '5', label: 'Charlie Brown', description: 'CEO', src: '/avatar-5.jpeg' }
	];

	const disabledOptions = [
		{ id: '1', label: 'Available Option 1' },
		{ id: '2', label: 'Disabled Option', disabled: true },
		{ id: '3', label: 'Available Option 2' },
		{ id: '4', label: 'Another Disabled', disabled: true },
		{ id: '5', label: 'Available Option 3' }
	];

	let color: any = $state('muted');
	let variant: any = $state('outlined');
	let size: any = $state('md');
	let currentExample: any = $state('basic');

	let label = $state('');
	let helpText = $state('');
	let errorText = $state('');
	let isFloatLabel = $state(false);
	let isClearable = $state(false);
	let isDisabled = $state(false);

	const basicSearch = useSearch({
		options: basicOptions,
		clientSide: true
	});

	const serverSearch = useSearch({
		url: 'https://dummyjson.com/products/search',
		debounceSearch: 300,
		minSearchLength: 2,
		pageSize: 10,
		enablePagination: true,
		buildQueryParams: (search, page) => ({
			q: search,
			limit: '10',
			skip: String(page * 10)
		}),
		transformData: (data) => ({
			options: data.products.map((product: any) => ({
				id: product.id,
				label: product.title,
				description: product.category
			})),
			total: data.total,
			hasMore: data.skip + data.products.length < data.total
		})
	});

	const descriptionSearch = useSearch({
		options: descriptionOptions,
		clientSide: true
	});

	const avatarSearch = useSearch({
		options: avatarOptions,
		clientSide: true
	});

	const disabledSearch = useSearch({
		options: disabledOptions,
		clientSide: true
	});

	let currentSearch = $derived(
		currentExample === 'basic'
			? basicSearch
			: currentExample === 'server'
				? serverSearch
				: currentExample === 'descriptions'
					? descriptionSearch
					: currentExample === 'avatars'
						? avatarSearch
						: disabledSearch
	);

	let value = $state<string | number | null>(null);

	$effect(() => {
		currentExample;
		value = null;
	});

	let hasProps = $derived(
		[
			color !== 'muted',
			variant !== 'outlined',
			size !== 'md',
			label,
			helpText,
			errorText,
			isFloatLabel,
			isClearable,
			isDisabled
		].some(Boolean)
	);

	let code = $derived(() => {
		if (currentExample === 'server') {
			return `<script lang="ts">
	import { ComboBox, useSearch } from 'ui-svelte';

	const search = useSearch({
		url: 'https://dummyjson.com/products/search',
		debounceSearch: 300,
		minSearchLength: 2,
		pageSize: 10,
		enablePagination: true,
		buildQueryParams: (search, page) => ({
			q: search,
			limit: '10',
			skip: String(page * 10)
		}),
		transformData: (data) => ({
			options: data.products.map((product) => ({
				id: product.id,
				label: product.title,
				description: product.category
			})),
			total: data.total,
			hasMore: data.skip + data.products.length < data.total
		})
	});

	let value = $state(null);
<\/script>

<ComboBox
	name="combo"
	placeholder="Search..."
	{search}${color !== 'muted' ? `\n\tcolor="${color}"` : ''}${variant !== 'outlined' ? `\n\tvariant="${variant}"` : ''}${size !== 'md' ? `\n\tsize="${size}"` : ''}${label ? `\n\tlabel="${label}"` : ''}${helpText ? `\n\thelpText="${helpText}"` : ''}${errorText ? `\n\terrorText="${errorText}"` : ''}${isFloatLabel ? `\n\tisFloatLabel` : ''}${isClearable ? `\n\tisClearable` : ''}${isDisabled ? `\n\tisDisabled` : ''}
	bind:value
/>`;
		}

		const optionsCode =
			currentExample === 'descriptions'
				? `[
		{ id: '1', label: 'John Doe', description: 'Software Engineer' },
		{ id: '2', label: 'Jane Smith', description: 'Product Designer' },
		{ id: '3', label: 'Bob Johnson', description: 'Project Manager' }
	]`
				: currentExample === 'avatars'
					? `[
		{ id: '1', label: 'John Doe', description: 'Designer', src: '/avatar-1.jpeg' },
		{ id: '2', label: 'Jane Smith', description: 'Developer', src: '/avatar-2.jpeg' },
		{ id: '3', label: 'Bob Johnson', description: 'Manager', src: '/avatar-3.jpeg' }
	]`
					: currentExample === 'disabled'
						? `[
		{ id: '1', label: 'Available Option 1' },
		{ id: '2', label: 'Disabled Option', disabled: true },
		{ id: '3', label: 'Available Option 2' }
	]`
						: `[
		{ id: '1', label: 'Apple' },
		{ id: '2', label: 'Banana' },
		{ id: '3', label: 'Cherry' }
	]`;

		return `<script lang="ts">
	import { ComboBox, useSearch, type SearchOption } from 'ui-svelte';

	const options: SearchOption[] = ${optionsCode};

	const search = useSearch({
		options,
		clientSide: true
	});

	let value = $state(null);
<\/script>

<ComboBox
	name="combo"
	placeholder="Search..."
	{search}${color !== 'muted' ? `\n\tcolor="${color}"` : ''}${variant !== 'outlined' ? `\n\tvariant="${variant}"` : ''}${size !== 'md' ? `\n\tsize="${size}"` : ''}${label ? `\n\tlabel="${label}"` : ''}${helpText ? `\n\thelpText="${helpText}"` : ''}${errorText ? `\n\terrorText="${errorText}"` : ''}${isFloatLabel ? `\n\tisFloatLabel` : ''}${isClearable ? `\n\tisClearable` : ''}${isDisabled ? `\n\tisDisabled` : ''}
	bind:value
/>`;
	});

	const props = [
		{ prop: 'search', type: 'SearchState', initial: '', required: true },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'value', type: 'string | number | null', initial: 'null' },
		{ prop: 'selected', type: 'SearchOption', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: 'Select an option' },
		{ prop: 'searchPlaceholder', type: 'string', initial: 'Search...' },
		{ prop: 'emptyText', type: 'string', initial: 'No options found' },
		{ prop: 'loadingText', type: 'string', initial: 'Loading...' },
		{ prop: 'loadingMoreText', type: 'string', initial: 'Loading more...' },
		{ prop: 'onchange', type: '(value: string | number | null) => void', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'muted'
		},
		{ prop: 'variant', type: 'solid | soft | outlined | line', initial: 'outlined' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'isLabelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isClearable', type: 'boolean', initial: 'false' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' },
		{ prop: 'arrowIcon', type: 'IconData', initial: 'ArrowDown24RegularIcon' }
	];

	const useSearchConfigProps = [
		{ prop: 'url', type: 'string', initial: '' },
		{ prop: 'options', type: 'SearchOption[]', initial: '[]' },
		{ prop: 'initialSearch', type: 'string', initial: "''" },
		{ prop: 'initialValue', type: 'string | number | null', initial: 'null' },
		{ prop: 'headers', type: 'Record<string, string>', initial: '{}' },
		{ prop: 'transformData', type: '(data: any, search: string) => SearchResponse', initial: '' },
		{ prop: 'onError', type: '(error: any) => void', initial: '' },
		{ prop: 'onSuccess', type: '(response: SearchResponse) => void', initial: '' },
		{ prop: 'debounceSearch', type: 'number', initial: '0' },
		{ prop: 'clientSide', type: 'boolean', initial: 'false' },
		{ prop: 'minSearchLength', type: 'number', initial: '0' },
		{
			prop: 'buildQueryParams',
			type: '(search: string, page: number) => Record<string, string>',
			initial: ''
		},
		{ prop: 'pageSize', type: 'number', initial: '20' },
		{ prop: 'enablePagination', type: 'boolean', initial: 'true' }
	];

	const searchStateProps = [
		{ prop: 'options', type: 'SearchOption[]', initial: '[]' },
		{ prop: 'isLoading', type: 'boolean', initial: 'false' },
		{ prop: 'isLoadingMore', type: 'boolean', initial: 'false' },
		{ prop: 'hasMore', type: 'boolean', initial: 'false' },
		{ prop: 'error', type: 'any', initial: 'null' },
		{ prop: 'search', type: 'string', initial: "''" },
		{ prop: 'selectedValue', type: 'string | number | null', initial: 'null' },
		{ prop: 'selectedOption', type: 'SearchOption | null', initial: 'null' },
		{ prop: 'currentPage', type: 'number', initial: '0' },
		{ prop: 'totalResults', type: 'number', initial: '0' },
		{ prop: 'setSearch', type: '(query: string) => void', initial: '' },
		{ prop: 'setSelectedValue', type: '(value: string | number | null) => void', initial: '' },
		{ prop: 'setOptions', type: '(options: SearchOption[]) => void', initial: '' },
		{ prop: 'refresh', type: '() => void', initial: '' },
		{ prop: 'reset', type: '() => void', initial: '' },
		{ prop: 'loadMore', type: '() => Promise<void>', initial: '' }
	];

	const optionProps = [
		{ prop: 'id', type: 'string | number', initial: '', required: true },
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'src', type: 'string', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' }
	];
</script>

<DocsHeader title="ComboBox" llmUrl="https://ui-svelte.sappsdev.com/llm/form/combo-box.md">
	A searchable dropdown component that combines text input with a filterable list of options.
	Supports both client-side filtering and server-side search via API with infinite scroll
	pagination.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Example"
				size="sm"
				options={exampleOptions}
				bind:value={currentExample}
			/>
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
			<Checkbox onchange={(v) => (v ? (label = 'Label') : (label = ''))} label="Label" />
			{#if label}
				<Checkbox bind:checked={isFloatLabel} label="Float Label" />
			{/if}
			<Checkbox
				onchange={(v) => (v ? (helpText = 'This is a help text') : (helpText = ''))}
				label="Help Text"
			/>
			<Checkbox
				onchange={(v) => (v ? (errorText = 'This field is required') : (errorText = ''))}
				label="Error Text"
			/>
			<Checkbox bind:checked={isClearable} label="Clearable" />
			<Checkbox bind:checked={isDisabled} label="Disabled" />
		</div>

		<div class="doc-preview">
			{#if currentExample === 'server'}
				<div class="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm space-y-1">
					<p class="text-gray-600 dark:text-gray-400">
						This example uses DummyJSON Products API with infinite scroll pagination.
					</p>
					<p class="text-xs text-gray-500 dark:text-gray-500">
						Type to search (min 2 characters). Scroll down to load more results automatically.
					</p>
				</div>
			{/if}
			<div class="w-full max-w-sm">
				<ComboBox
					placeholder={currentExample === 'server' ? 'Search products...' : 'Search...'}
					search={currentSearch}
					{color}
					{variant}
					{size}
					{isClearable}
					{isDisabled}
					label={label || undefined}
					helpText={helpText || undefined}
					errorText={errorText || undefined}
					isFloatLabel={label && isFloatLabel ? isFloatLabel : undefined}
					bind:value
				/>
			</div>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					{@const search = useSearch({ options: basicOptions, clientSide: true })}
					<div class="w-48">
						<ComboBox
							placeholder={item.label + ' ' + colorItem.label}
							{search}
							variant={item.id as any}
							color={colorItem.id as any}
						/>
					</div>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each sizeOptions as sizeItem}
					{@const search = useSearch({ options: basicOptions, clientSide: true })}
					<div class="w-48">
						<ComboBox
							placeholder={item.label + ' ' + sizeItem.label}
							{search}
							variant={item.id as any}
							size={sizeItem.id as any}
						/>
					</div>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">useSearch Hook Configuration</p>
	<p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
		The useSearch hook accepts a configuration object. When <code>clientSide: true</code> is set
		with <code>options</code>, it filters locally. When <code>url</code> is provided, it fetches from
		the API with automatic pagination support.
	</p>
	<DocsProps props={useSearchConfigProps} />
</Section>

<Section>
	<p class="section-subtitle">SearchState (Return Value)</p>
	<p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
		The useSearch hook returns a reactive state object with the following properties and methods:
	</p>
	<DocsProps props={searchStateProps} />
</Section>

<Section>
	<p class="section-subtitle">ComboBox Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">SearchOption Type</p>
	<p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
		Each option should follow this structure:
	</p>
	<DocsProps props={optionProps} />
</Section>

<Section>
	<p class="section-subtitle">Key Features</p>
	<Card>
		<ul class="list-disc list-inside space-y-2 text-sm">
			<li>
				<strong>Flexible Data Sources:</strong> Supports both client-side (options + clientSide) and server-side
				(url) data
			</li>
			<li>
				<strong>Infinite Scroll Pagination:</strong> Automatically loads more results when scrolling to
				80% of the list
			</li>
			<li><strong>Search Filtering:</strong> Built-in search with debouncing support</li>
			<li>
				<strong>Rich Options:</strong> Support for descriptions, icons, and avatars in options
			</li>
			<li><strong>Disabled Options:</strong> Individual options can be disabled</li>
			<li><strong>Clearable:</strong> Optional clear button to reset selection</li>
			<li>
				<strong>Loading States:</strong> Separate indicators for initial load and loading more
			</li>
			<li><strong>Empty States:</strong> Customizable empty state message</li>
			<li><strong>Keyboard Navigation:</strong> Arrow keys, Enter, Escape support</li>
			<li><strong>Float Label:</strong> Animated floating label support</li>
			<li><strong>Form Integration:</strong> Works with native form submission via hidden input</li>
		</ul>
	</Card>
</Section>
