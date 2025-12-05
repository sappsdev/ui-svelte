<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { ComboBox, useSearch, Checkbox, Select, Section } from 'ui-svelte';

	type ExampleType = 'basic' | 'server' | 'descriptions' | 'avatars' | 'disabled';
	let currentExample: ExampleType = $state('basic');

	const exampleOptions = [
		{ id: 'basic', label: 'Client-Side Basic' },
		{ id: 'server', label: 'Server-Side (API)' },
		{ id: 'descriptions', label: 'With Descriptions' },
		{ id: 'avatars', label: 'With Avatars' },
		{ id: 'disabled', label: 'Disabled Options' }
	];

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'line', label: 'Line' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	// Options data
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

	// UI States
	let variant: any = $state('outlined');
	let size: any = $state('md');
	let label = $state('');
	let helpText = $state('');
	let errorText = $state('');
	let isFloatLabel = $state(false);
	let isSolid = $state(false);
	let isClearable = $state(false);
	let isDisabled = $state(false);

	// Search instances for each example
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

	// Reset value when example changes
	$effect(() => {
		currentExample;
		value = null;
	});

	let hasProps = $derived(
		[
			variant !== 'outlined',
			size !== 'md',
			label,
			helpText,
			errorText,
			isFloatLabel,
			isSolid,
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
	{search}${label ? `\n\tlabel="${label}"` : ''}${variant !== 'outlined' ? `\n\tvariant="${variant}"` : ''}${size !== 'md' ? `\n\tsize="${size}"` : ''}${helpText ? `\n\thelpText="${helpText}"` : ''}${errorText ? `\n\terrorText="${errorText}"` : ''}${isFloatLabel ? `\n\tisFloatLabel` : ''}${isSolid ? `\n\tisSolid` : ''}${isClearable ? `\n\tisClearable` : ''}${isDisabled ? `\n\tisDisabled` : ''}
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
	{search}${label ? `\n\tlabel="${label}"` : ''}${variant !== 'outlined' ? `\n\tvariant="${variant}"` : ''}${size !== 'md' ? `\n\tsize="${size}"` : ''}${helpText ? `\n\thelpText="${helpText}"` : ''}${errorText ? `\n\terrorText="${errorText}"` : ''}${isFloatLabel ? `\n\tisFloatLabel` : ''}${isSolid ? `\n\tisSolid` : ''}${isClearable ? `\n\tisClearable` : ''}${isDisabled ? `\n\tisDisabled` : ''}
	bind:value
/>`;
	});

	// Props definitions
	const comboBoxProps = [
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
		{ prop: 'variant', type: 'primary | secondary | muted | outlined | line', initial: 'outlined' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'isLabelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'isClearable', type: 'boolean', initial: 'false' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' },
		{ prop: 'arrowIcon', type: 'IconName', initial: 'fluent:arrow-sort-down-24-regular' }
	];

	const useSearchConfigProps = [
		{ prop: 'url', type: 'string', initial: '', description: 'API endpoint for remote search' },
		{
			prop: 'options',
			type: 'SearchOption[]',
			initial: '[]',
			description: 'Initial options for client-side'
		},
		{ prop: 'initialSearch', type: 'string', initial: "''", description: 'Initial search query' },
		{
			prop: 'initialValue',
			type: 'string | number | null',
			initial: 'null',
			description: 'Initial selected value'
		},
		{
			prop: 'headers',
			type: 'Record<string, string>',
			initial: '{}',
			description: 'Custom headers for API'
		},
		{
			prop: 'transformData',
			type: '(data: any, search: string) => SearchResponse',
			initial: '',
			description: 'Transform API response'
		},
		{ prop: 'onError', type: '(error: any) => void', initial: '', description: 'Error callback' },
		{
			prop: 'onSuccess',
			type: '(response: SearchResponse) => void',
			initial: '',
			description: 'Success callback'
		},
		{ prop: 'debounceSearch', type: 'number', initial: '0', description: 'Debounce delay in ms' },
		{
			prop: 'clientSide',
			type: 'boolean',
			initial: 'false',
			description: 'Enable client-side filtering'
		},
		{
			prop: 'minSearchLength',
			type: 'number',
			initial: '0',
			description: 'Min chars before searching'
		},
		{
			prop: 'buildQueryParams',
			type: '(search: string, page: number) => Record<string, string>',
			initial: '',
			description: 'Custom query params builder (now with page param)'
		},
		{
			prop: 'pageSize',
			type: 'number',
			initial: '20',
			description: 'Number of results per page'
		},
		{
			prop: 'enablePagination',
			type: 'boolean',
			initial: 'true',
			description: 'Enable infinite scroll pagination'
		}
	];

	const searchStateProps = [
		{
			prop: 'options',
			type: 'SearchOption[]',
			initial: '[]',
			description: 'Current filtered options'
		},
		{ prop: 'isLoading', type: 'boolean', initial: 'false', description: 'Loading state' },
		{
			prop: 'isLoadingMore',
			type: 'boolean',
			initial: 'false',
			description: 'Loading more results'
		},
		{ prop: 'hasMore', type: 'boolean', initial: 'false', description: 'More results available' },
		{ prop: 'error', type: 'any', initial: 'null', description: 'Error if request failed' },
		{
			prop: 'search',
			type: 'string',
			initial: "''",
			description: 'Current search query (bindable)'
		},
		{
			prop: 'selectedValue',
			type: 'string | number | null',
			initial: 'null',
			description: 'Selected value'
		},
		{
			prop: 'selectedOption',
			type: 'SearchOption | null',
			initial: 'null',
			description: 'Selected option object'
		},
		{ prop: 'currentPage', type: 'number', initial: '0', description: 'Current page number' },
		{ prop: 'totalResults', type: 'number', initial: '0', description: 'Total results count' },
		{
			prop: 'setSearch',
			type: '(query: string) => void',
			initial: '',
			description: 'Update search query'
		},
		{
			prop: 'setSelectedValue',
			type: '(value: string | number | null) => void',
			initial: '',
			description: 'Update selected value'
		},
		{
			prop: 'setOptions',
			type: '(options: SearchOption[]) => void',
			initial: '',
			description: 'Update options array'
		},
		{
			prop: 'refresh',
			type: '() => void',
			initial: '',
			description: 'Re-fetch or re-filter options'
		},
		{ prop: 'reset', type: '() => void', initial: '', description: 'Reset to initial state' },
		{
			prop: 'loadMore',
			type: '() => Promise<void>',
			initial: '',
			description: 'Load next page of results'
		}
	];

	const optionProps = [
		{ prop: 'id', type: 'string | number', initial: '', required: true },
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'string', initial: '' },
		{ prop: 'src', type: 'string', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet preview()}
	<div class="w-full max-w-sm">
		{#if currentExample === 'server'}
			<div class="mb-4 p-3 bg-gray-100 rounded-lg text-sm space-y-1">
				<p class="text-gray-600">
					This example uses DummyJSON Products API with infinite scroll pagination.
				</p>
				<p class="text-xs text-gray-500">
					Type to search (min 2 characters). Scroll down to load more results automatically.
				</p>
			</div>
		{/if}

		<ComboBox
			placeholder={currentExample === 'server' ? 'Search products...' : 'Search...'}
			search={currentSearch}
			{variant}
			{size}
			{isSolid}
			{isClearable}
			{isDisabled}
			label={label || undefined}
			helpText={helpText || undefined}
			errorText={errorText || undefined}
			isFloatLabel={label && isFloatLabel ? isFloatLabel : undefined}
			bind:value
		/>
	</div>
{/snippet}

{#snippet builder()}
	<Select label="Example Type" size="sm" options={exampleOptions} bind:value={currentExample} />

	<DocOptions title="">
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
	</DocOptions>

	<DocOptions title="Labels & Messages">
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
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={isSolid} label="solid" />
		<Checkbox bind:checked={isClearable} label="clearable" />
		<Checkbox bind:checked={isDisabled} label="disabled" />
	</DocOptions>
{/snippet}

<DocHeader title="ComboBox & useSearch">
	A searchable dropdown component that combines text input with a filterable list of options.
	Supports both client-side filtering and server-side search via API with infinite scroll
	pagination. Uses the useSearch hook for reactive state management.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<Section class="prose mt-8">
	<h3>useSearch Hook Configuration</h3>
	<p>
		The useSearch hook accepts a configuration object. When <code>clientSide: true</code> is set
		with
		<code>options</code>, it filters locally. When <code>url</code> is provided, it fetches from the
		API with automatic pagination support.
	</p>
</Section>

<DocProps props={useSearchConfigProps} />

<Section class="prose mt-8">
	<h3>SearchState (Return Value)</h3>
	<p>
		The useSearch hook returns a reactive state object with the following properties and methods:
	</p>
</Section>

<DocProps props={searchStateProps} />

<Section class="prose mt-8">
	<h3>ComboBox Props</h3>
	<p>The ComboBox component accepts these props for customization:</p>
</Section>

<DocProps props={comboBoxProps} />

<Section class="prose mt-8">
	<h3>SearchOption Type</h3>
	<p>Each option should follow this structure:</p>
</Section>

<DocProps props={optionProps} />

<Section class="prose mt-8">
	<h3>Key Features</h3>
	<ul>
		<li>
			<strong>Flexible Data Sources:</strong> Supports both client-side (options + clientSide) and server-side
			(url) data
		</li>
		<li>
			<strong>Infinite Scroll Pagination:</strong> Automatically loads more results when scrolling to
			80% of the list
		</li>
		<li><strong>Search Filtering:</strong> Built-in search with debouncing support</li>
		<li><strong>Rich Options:</strong> Support for descriptions, icons, and avatars in options</li>
		<li><strong>Disabled Options:</strong> Individual options can be disabled</li>
		<li><strong>Clearable:</strong> Optional clear button to reset selection</li>
		<li><strong>Loading States:</strong> Separate indicators for initial load and loading more</li>
		<li><strong>Empty States:</strong> Customizable empty state message</li>
		<li><strong>Keyboard Navigation:</strong> Arrow keys, Enter, Escape support</li>
		<li><strong>Float Label:</strong> Animated floating label support</li>
		<li><strong>Form Integration:</strong> Works with native form submission via hidden input</li>
	</ul>

	<h3>Pagination Configuration</h3>
	<p>
		The pagination system works automatically when <code>enablePagination: true</code> (default).
		The
		<code>buildQueryParams</code> function now receives a <code>page</code> parameter to construct proper
		API queries. The component loads more results when the user scrolls to 80% of the list.
	</p>

	<h4>Example with Custom Pagination:</h4>
</Section>
