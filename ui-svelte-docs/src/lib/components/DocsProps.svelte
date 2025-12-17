<script lang="ts">
	import { Table, useTable, Chip } from 'ui-svelte';

	type Prop = {
		prop: string;
		type: string;
		initial: string;
		required?: boolean;
		description?: string;
	};

	type Props = {
		props: Prop[];
	};

	let { props }: Props = $props();

	let propsTable = $derived(
		useTable({
			data: props,
			columns: [
				{
					label: 'Prop',
					field: 'prop',
					width: '200px',
					render: propSnippet
				},
				{
					label: 'Type',
					field: 'type',
					render: typeSnippet
				},
				{
					label: 'Default',
					field: 'initial',
					width: '150px',
					render: defaultSnippet
				}
			],
			initialPageSize: 50
		})
	);
</script>

{#snippet propSnippet(row: Prop)}
	<code class="text-sm font-mono">{row.prop}</code>
	{#if row.description}
		<div class="text-xs text-gray-500 mt-1 max-w-xs text-wrap">{row.description}</div>
	{/if}
{/snippet}

{#snippet typeSnippet(row: Prop)}
	<div class="flex items-center gap-2 max-w-xs text-wrap">
		<code class="text-sm font-mono">{row.type}</code>
		{#if row.required}
			<Chip variant="danger" size="sm" isSolid>Required</Chip>
		{/if}
	</div>
{/snippet}

{#snippet defaultSnippet(row: Prop)}
	{#if row.initial}
		<code class="text-sm font-mono text-gray-600">{row.initial}</code>
	{:else}
		<span class="text-gray-400">—</span>
	{/if}
{/snippet}

<Table table={propsTable} size="sm" />
