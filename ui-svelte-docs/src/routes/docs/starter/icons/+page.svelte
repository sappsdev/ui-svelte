<script lang="ts">
	import {
		Icon,
		Button,
		Card,
		Section,
		TextField,
		Select,
		toast,
		Code,
		Drawer,
		Alert,
		Tooltip
	} from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';
	import { Search24RegularIcon } from '$lib/icons';
	import { onMount } from 'svelte';

	type IconData = {
		id: number;
		name: string;
		body: string;
		viewbox: string;
		set_name: string;
	};

	type PaginatedResponse = {
		data: IconData[];
		pagination: {
			page: number;
			limit: number;
			total: number;
			totalPages: number;
		};
	};

	let searchValue = $state('');
	let selectedSet = $state('solar-linear');
	let iconName = $state('');
	let icons = $state<IconData[]>([]);
	let icon = $state<IconData>();
	let loading = $state(false);
	let showCode = $state(false);
	let pagination = $state({
		page: 1,
		limit: 100,
		total: 0,
		totalPages: 0
	});

	const availableSets = [
		{ id: 'solar-bold', label: 'Solar Bold' },
		{ id: 'solar-bold-duotone', label: 'Solar Bold Duotone' },
		{ id: 'solar-broken', label: 'Solar Broken' },
		{ id: 'solar-line-duotone', label: 'Solar Line Duotone' },
		{ id: 'solar-linear', label: 'Solar Linear' },
		{ id: 'solar-outline', label: 'Solar Outline' },
		{ id: 'fluent-filled', label: 'Fluent Filled' },
		{ id: 'fluent-regular', label: 'Fluent Regular' },
		{ id: 'circle-flags', label: 'Circle Flags' },
		{ id: 'streamline-emojis', label: 'Streamline Emojis' },
		{ id: 'streamline-color', label: 'Streamline Color' },
		{ id: 'svg-spinners', label: 'SVG Spinners' },
		{ id: 'logos', label: 'Logos' }
	];

	const fetchIcons = async (
		page: number = 1,
		setName: string = 'solar-linear',
		name: string = ''
	) => {
		loading = true;
		try {
			const params = new URLSearchParams({
				page: page.toString(),
				limit: pagination.limit.toString(),
				...(name && { name }),
				...(setName && { set_name: setName })
			});

			const response = await fetch(`https://ui-icons.sappsdev.com/icons?${params}`);
			const data: PaginatedResponse = await response.json();

			icons = data.data;
			pagination = data.pagination;
		} catch (error) {
			console.error('Error fetching icons:', error);
			toast.show({
				description: 'Failed to fetch icons. Please try again later.',
				color: 'danger',
				duration: 3000
			});
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		fetchIcons();
	});

	const handlePageChange = (page: number) => {
		fetchIcons(page, selectedSet, searchValue);
	};

	let searchTimeout: ReturnType<typeof setTimeout>;
	const handleSearch = () => {
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			fetchIcons(1, selectedSet, searchValue);
		}, 300);
	};

	const handleSetChange = () => {
		fetchIcons(1, selectedSet, searchValue);
	};

	const handleIcon = (data: IconData) => {
		iconName = `${toPascalCase(data.name.split(':')[1] || data.name)}Icon`;
		icon = data;
		showCode = true;
	};

	const toPascalCase = (str: string) => {
		return str
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join('');
	};

	let code = $derived(() => {
		const scriptLines = [
			`export const ${iconName} = {`,
			`\tbody: '${icon?.body}',`,
			`\tviewbox: '${icon?.viewbox}'`,
			`}`
		].filter(Boolean);

		return [...scriptLines].join('\n');
	});

	const props = [
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Icons" llmUrl="https://ui-svelte.sappsdev.com/llm/starter/icons.md">
	Icons are visual symbols that represent ideas, actions, or objects. Browse and search through
	thousands of icons from multiple icon sets.
</DocsHeader>

<Section>
	<Card color="background" variant="outlined">
		{#snippet header()}
			<div class="row gap-4 w-full items-end">
				<div class="flex-1">
					<TextField
						name="icon-search"
						placeholder="Search {pagination.total} icons..."
						oninput={handleSearch}
						size="sm"
						bind:value={searchValue}
						startIcon={Search24RegularIcon}
					/>
				</div>
				<div class="w-48">
					<Select
						name="icon-set"
						options={availableSets}
						onchange={handleSetChange}
						size="sm"
						bind:value={selectedSet}
					/>
				</div>
			</div>
		{/snippet}

		{#if loading}
			<div class="flex justify-center items-center py-12">
				<Icon
					icon={{
						body: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="32" stroke-dashoffset="0"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle>',
						viewbox: '0 0 24 24'
					}}
					class="w-8 h-8 animate-spin"
				/>
			</div>
		{:else if icons.length === 0}
			<div class="text-center py-12 text-on-muted">No icons found matching your search.</div>
		{:else}
			<div class="grid-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
				{#each icons as iconItem (iconItem.id)}
					<Tooltip label={iconItem.name.split(':')[1] || iconItem.name} position="top">
						<button
							onclick={() => handleIcon(iconItem)}
							class="flex flex-col items-center justify-center p-3 rounded-lg border border-transparent hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
						>
							<Icon icon={{ body: iconItem.body, viewbox: iconItem.viewbox }} class="h-8 w-auto" />
						</button>
					</Tooltip>
				{/each}
			</div>

			{#if pagination.totalPages > 1}
				<div class="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-on-muted/20">
					<Button
						variant="outlined"
						size="sm"
						onclick={() => handlePageChange(pagination.page - 1)}
						isDisabled={pagination.page === 1}
					>
						Previous
					</Button>

					<span class="text-sm text-on-muted">
						Page {pagination.page} of {pagination.totalPages}
					</span>

					<Button
						variant="outlined"
						size="sm"
						onclick={() => handlePageChange(pagination.page + 1)}
						isDisabled={pagination.page === pagination.totalPages}
					>
						Next
					</Button>
				</div>
			{/if}
		{/if}
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4" color="background" variant="outlined">
		{#snippet header()}
			<h4>Usage</h4>
		{/snippet}
		<Alert showIcon>
			Click any icon above to get the code. Add the exported constant to{' '}
			<strong>$lib/icons/index.ts</strong> to use it in your project.
		</Alert>
		<Code
			lang="svelte"
			code={`<script lang="ts">
	import { Icon } from 'ui-svelte';
	import { HeartLinearIcon } from '$lib/icons';
<\/script>

<Icon icon={HeartLinearIcon} class="w-6 h-6" />`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Drawer bind:open={showCode} position="bottom" onclose={() => (icon = undefined)}>
	{#snippet header()}
		{#if icon}
			<div class="row gap-4 items-center">
				<Icon icon={{ body: icon.body, viewbox: icon.viewbox }} class="h-12 w-auto" />
				<div>
					<h4>{iconName}</h4>
					<p class="text-sm text-on-muted">Add this code to <strong>$lib/icons/index.ts</strong></p>
				</div>
			</div>
		{/if}
	{/snippet}

	<Code code={code()} lang="typescript" />
</Drawer>
