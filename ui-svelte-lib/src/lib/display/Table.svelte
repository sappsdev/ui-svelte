<script lang="ts">
	import type { TableState } from '$lib/hooks/use-table.svelte.js';
	import { cn } from '$lib/utils/class-names.js';
	import { Empty, TextField, Select, Checkbox, Icon, Button, Pagination } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import {
		ArrowSortDownLines24RegularIcon,
		ArrowSortUpLines24RegularIcon,
		Search24RegularIcon
	} from '$lib/icons/index.js';
	import IconButton from '$lib/control/IconButton.svelte';

	const handleSort = (column: { field: string; sortable?: boolean }) => {
		if (!column.sortable) return;

		const newOrder = table.sortBy === column.field && table.sortOrder === 'ASC' ? 'DESC' : 'ASC';
		table.setSort(column.field, newOrder);
	};

	const isColumnSorted = (field: string): boolean => {
		return table.sortBy === field;
	};

	type Props = {
		table: TableState;
		isStriped?: boolean;
		isBordered?: boolean;
		hasDividers?: boolean;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		noDataTitle?: string;
		noDataDescription?: string;
		noDataType?: 'playlist' | 'result' | 'data' | 'template';
		size?: 'sm' | 'md' | 'lg';
		showPagination?: boolean;
		paginationAlign?: 'start' | 'center' | 'end';
		loadingRows?: number;
		showSearch?: boolean;
		searchPlaceholder?: string;
		showRowsPerPage?: boolean;
		rowsPerPageOptions?: number[];
		rowsPerPageLabel?: string;
		showTotal?: boolean;
		totalLabel?: string;
		showToolbar?: boolean;
		toolbarClass?: string;
		hideSelectionCount?: boolean;
		selectionCountLabel?: string;
		selectionClearLabel?: string;
		toolbarStart?: Snippet;
		toolbarEnd?: Snippet;
		selectionActions?: Snippet<[any[]]>;
		emptyState?: Snippet;
		onRowClick?: (row: any, index: number) => void;
		rowClass?: (row: any, index: number) => string;
		rootClass?: string;
		containerClass?: string;
		headerClass?: string;
		bodyClass?: string;
	};

	const {
		table,
		isStriped,
		isBordered,
		hasDividers,
		color = 'muted',
		noDataTitle = 'No data',
		noDataDescription = 'There are no records to display',
		noDataType = 'data',
		size = 'md',
		showPagination,
		paginationAlign = 'center',
		loadingRows = 5,
		showSearch,
		searchPlaceholder = 'Search by name...',
		showRowsPerPage = false,
		rowsPerPageOptions = [5, 10, 25, 50, 100],
		rowsPerPageLabel = 'Rows per page:',
		showTotal = false,
		totalLabel = 'Total',
		showToolbar = false,
		toolbarClass,
		hideSelectionCount,
		selectionCountLabel = 'selected',
		selectionClearLabel = 'Clear selection',
		toolbarStart,
		toolbarEnd,
		selectionActions,
		emptyState,
		onRowClick,
		rowClass,
		rootClass,
		containerClass,
		headerClass,
		bodyClass
	}: Props = $props();

	const tableSizes = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const tableColors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning'
	};

	const shouldShowToolbar = $derived(showToolbar || showSearch || toolbarStart || toolbarEnd);

	const hasSelection = $derived(table.selectable && table.selectedRows.length > 0);

	// svelte-ignore state_referenced_locally
	let searchValue = $state(table.search ?? '');

	const rowsPerPageSelectOptions = $derived(
		rowsPerPageOptions.map((size) => ({
			id: size,
			label: String(size)
		}))
	);

	let selectedPageSize = $derived(
		rowsPerPageSelectOptions.find((opt) => opt.id === table.pageSize)
	);

	const handleSearchInput = (value: unknown) => {
		searchValue = String(value);
		table.setSearch(searchValue);
	};

	const handleRowsPerPageChange = (value: unknown) => {
		table.setPageSize(Number(value));
	};

	const handleSelectAllChange = () => {
		table.toggleAll();
	};

	const handleRowSelectChange = (row: any) => {
		table.toggleRow(row);
	};
</script>

<div class={cn('table-wrapper', rootClass)}>
	{#if shouldShowToolbar}
		<div class={cn('table-toolbar', toolbarClass)}>
			<div class="table-toolbar-start">
				{#if showSearch}
					<TextField
						value={searchValue}
						placeholder={searchPlaceholder}
						startIcon={Search24RegularIcon}
						variant="outlined"
						size="sm"
						oninput={handleSearchInput}
						rootClass="table-toolbar-search"
					/>
				{/if}
				{#if toolbarStart}
					{@render toolbarStart()}
				{/if}
			</div>

			<div class="table-toolbar-end">
				{#if toolbarEnd}
					{@render toolbarEnd()}
				{/if}
			</div>
		</div>
	{/if}

	{#if hasSelection}
		<div class={cn('table-selection-bar', tableColors[color])}>
			<div class="table-selection-info">
				{#if !hideSelectionCount}
					<span class="table-selection-count">
						{table.selectedRows.length}
						{selectionCountLabel}
					</span>
				{/if}
				<Button variant="ghost" {color} size="sm" onclick={() => table.clearSelection()}>
					{selectionClearLabel}
				</Button>
			</div>
			{#if selectionActions}
				<div class="table-selection-actions">
					{@render selectionActions(table.selectedRows)}
				</div>
			{/if}
		</div>
	{/if}

	<div class={cn('table-container', containerClass)}>
		<table
			class={cn(
				'table',
				tableSizes[size],
				isStriped && 'is-striped',
				isBordered && 'is-bordered',
				hasDividers && 'has-dividers',
				color && tableColors[color]
			)}
		>
			<thead class={cn('table-header', headerClass)}>
				<tr>
					{#if table.selectable}
						<th class="table-head table-checkbox-cell" style="width: 48px;">
							<Checkbox
								checked={table.isAllSelected}
								onchange={handleSelectAllChange}
								class={cn('table-checkbox', table.isIndeterminate && 'is-indeterminate')}
								isMuted
							/>
						</th>
					{/if}
					{#each table.columns as column}
						<th
							style="width: {column.width}; text-align: {column.align || 'left'}"
							class:sortable={column.sortable}
							class:sorted={isColumnSorted(column.field)}
							class="table-head"
						>
							<div
								class="table-head-content"
								style="justify-content: {column.align === 'right'
									? 'flex-end'
									: column.align === 'center'
										? 'center'
										: 'flex-start'}"
							>
								<span class="table-head-label">{column.label}</span>
								{#if column.sortable}
									<IconButton
										icon={table.sortBy !== column.field
											? ArrowSortDownLines24RegularIcon
											: table.sortOrder === 'ASC'
												? ArrowSortUpLines24RegularIcon
												: ArrowSortDownLines24RegularIcon}
										variant="ghost"
										{color}
										size="xs"
										onclick={() => handleSort(column)}
									/>
								{/if}
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody class={cn('table-body', bodyClass)}>
				{#if table.isLoading}
					{#each Array(loadingRows) as _, index}
						<tr class="table-loading-row">
							{#if table.selectable}
								<td class="table-checkbox-cell">
									<div class="skeleton-loader skeleton-checkbox"></div>
								</td>
							{/if}
							{#each table.columns as column}
								<td style="text-align: {column.align || 'left'}">
									<div class="skeleton-loader"></div>
								</td>
							{/each}
						</tr>
					{/each}
				{:else if table.hasInitialized && table.data.length === 0}
					<tr class="table-empty-row">
						<td
							colspan={table.selectable ? table.columns.length + 1 : table.columns.length}
							class="table-empty-cell"
						>
							{#if emptyState}
								{@render emptyState()}
							{:else}
								<div class="empty-state">
									<div class="empty-icon">
										<Empty type={noDataType} />
									</div>
									<div class="empty-content">
										<h3 class="empty-title">{noDataTitle}</h3>
										<p class="empty-description">{noDataDescription}</p>
									</div>
								</div>
							{/if}
						</td>
					</tr>
				{:else}
					{#each table.data as item, index}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<tr
							class={cn(
								table.selectable && table.isRowSelected(item) && 'table-row-selected',
								onRowClick && 'is-clickable',
								rowClass?.(item, index)
							)}
							onclick={onRowClick ? () => onRowClick(item, index) : undefined}
						>
							{#if table.selectable}
								<td class="table-checkbox-cell">
									<Checkbox
										checked={table.isRowSelected(item)}
										onchange={() => handleRowSelectChange(item)}
										class="table-checkbox"
									/>
								</td>
							{/if}
							{#each table.columns as column}
								<td style="text-align: {column.align || 'left'}">
									{#if column.render}
										{@render column.render(item)}
									{:else}
										{item[column.field]}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	{#if (showTotal || showRowsPerPage) && !table.isLoading}
		<div class="table-footer-info">
			{#if showTotal}
				<div class="table-total">
					{totalLabel}: {table.total ?? 0}
					{table.total === 1 ? 'item' : 'items'}
				</div>
			{/if}
			{#if showRowsPerPage}
				<div class="table-rows-per-page">
					<span class="table-rows-per-page-label">{rowsPerPageLabel}</span>
					<Select
						options={rowsPerPageSelectOptions}
						value={table.pageSize}
						selected={selectedPageSize}
						onchange={handleRowsPerPageChange}
						variant="outlined"
						size="sm"
					/>
				</div>
			{/if}
		</div>
	{/if}

	{#if showPagination && table.totalPages && table.totalPages > 1 && !table.isLoading}
		<Pagination
			page={table.page ?? 1}
			totalPages={table.totalPages}
			onPrev={() => table.prevPage?.()}
			onNext={() => table.nextPage?.()}
			onPageChange={(p) => table.goToPage?.(p)}
			hasPrevPage={table.hasPrevPage}
			hasNextPage={table.hasNextPage}
			align={paginationAlign}
			variant="soft"
			{color}
			{size}
		/>
	{/if}
</div>
