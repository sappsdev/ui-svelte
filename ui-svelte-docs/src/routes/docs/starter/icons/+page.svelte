<script lang="ts">
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import { Icon, Button, Section, TextField, Select, toast, Code, Drawer, Alert } from 'ui-svelte';
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
		{ id: 'solar-bold', label: 'solar-bold' },
		{ id: 'solar-bold-duotone', label: 'solar-bold-duotone' },
		{ id: 'solar-broken', label: 'solar-broken' },
		{ id: 'solar-line-duotone', label: 'solar-line-duotone' },
		{ id: 'solar-linear', label: 'solar-linear' },
		{ id: 'solar-outline', label: 'solar-outline' },
		{ id: 'fluent-filled', label: 'fluent-filled' },
		{ id: 'fluent-regular', label: 'fluent-regular' },
		{ id: 'circle-flags', label: 'circle-flags' },
		{ id: 'streamline-emojis', label: 'streamline-emojis' },
		{ id: 'svg-spinners', label: 'svg-spinners' },
		{ id: 'logos', label: 'logos' }
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

			const response = await fetch(`https://sappsicons.appdnd-com.workers.dev/icons?${params}`);
			const data: PaginatedResponse = await response.json();

			icons = data.data;
			pagination = data.pagination;
		} catch (error) {
			console.error('Error fetching icons:', error);
			toast.show({
				description: 'Failed to fetch icons. Please try again later.',
				status: 'danger',
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

	const handleSearch = () => {
		const timeoutId = setTimeout(() => {
			fetchIcons(1, selectedSet, searchValue);
		}, 300);

		return () => clearTimeout(timeoutId);
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
</script>

<DocHeader title="Icons">
	Icons are visual symbols that represent ideas, actions, or objects.
</DocHeader>

<Section>
	<div class="mb-6 flex gap-4">
		<TextField
			name="icon-search"
			placeholder="Search icons..."
			variant="outlined"
			oninput={handleSearch}
			size="sm"
			bind:value={searchValue}
			class="max-w-xs"
		/>

		<Select
			name="icon-set"
			placeholder="Filter by set"
			options={availableSets}
			onchange={handleSearch}
			size="sm"
			bind:value={selectedSet}
			class="max-w-xs"
		/>
	</div>

	<div class="p-4">
		{#if loading}
			<div class="flex justify-center items-center py-12">loading</div>
		{:else if icons.length === 0}
			<div class="text-center py-12 text-gray-500">No icons found matching your search.</div>
		{:else}
			<div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
				{#each icons as icon (icon.id)}
					<button
						onclick={() => handleIcon(icon)}
						class="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
						title={icon.name}
					>
						<Icon icon={{ body: icon.body, viewbox: icon.viewbox }} class="w-8 h-8 mb-2" />
						<span
							class="text-xs text-gray-600 dark:text-gray-400 truncate w-full text-center group-hover:text-gray-900 dark:group-hover:text-gray-100"
						>
							{icon.name.split(':')[1] || icon.name}
						</span>
					</button>
				{/each}
			</div>

			{#if pagination.totalPages > 1}
				<div class="flex justify-center items-center gap-2 mt-8">
					<Button
						variant="ghost"
						size="sm"
						onclick={() => handlePageChange(pagination.page - 1)}
						isDisabled={pagination.page === 1}
					>
						Previous
					</Button>

					<span class="text-sm text-gray-600 dark:text-gray-400">
						Page {pagination.page} of {pagination.totalPages}
						({pagination.total} icons)
					</span>

					<Button
						variant="ghost"
						size="sm"
						onclick={() => handlePageChange(pagination.page + 1)}
						isDisabled={pagination.page === pagination.totalPages}
					>
						Next
					</Button>
				</div>
			{/if}
		{/if}
	</div>
</Section>
<Drawer bind:open={showCode} position="bottom" onclose={() => (icon = undefined)}>
	{#snippet header()}
		{#if icon}
			<Icon icon={{ body: icon.body, viewbox: icon.viewbox }} class="h-12 w-auto mr-2" />
			<Alert
				>Add this code to <strong>$lib/icons/index.ts</strong> to use the icon in your project.</Alert
			>
		{/if}
	{/snippet}

	<Code code={code()} lang="svelte" showCopy />
</Drawer>
