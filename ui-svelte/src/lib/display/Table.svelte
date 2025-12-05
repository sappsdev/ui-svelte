<script lang="ts">
	import type { TableState } from '$lib/hooks/use-table.svelte.js';
	import { cn } from '$lib/utils/class-names.js';
	import { Empty, TextField, Select, Checkbox, Icon, Button } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import {
		ArrowLeft24RegularIcon,
		ArrowRight24RegularIcon,
		ArrowSortDownLines24RegularIcon,
		ArrowSortUpLines24RegularIcon
	} from '$lib/icons/index.js';

	const handleSort = (column: { field: string; sortable?: boolean }) => {
		if (!column.sortable) return;

		const newOrder = table.sortBy === column.field && table.sortOrder === 'ASC' ? 'DESC' : 'ASC';
		table.setSort(column.field, newOrder);
	};

	const getSortIcon = (field: string): string => {
		if (table.sortBy !== field) {
			return 'fluent:arrow-sort-down-lines-24-regular';
		}
		return table.sortOrder === 'ASC'
			? 'fluent:arrow-sort-up-lines-24-regular'
			: 'fluent:arrow-sort-down-lines-24-regular';
	};

	const isColumnSorted = (field: string): boolean => {
		return table.sortBy === field;
	};

	type Props = {
		table: TableState;
		isStriped?: boolean;
		isBordered?: boolean;
		hasDividers?: boolean;
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
		showSelectionCount?: boolean;
		selectionCountLabel?: string;
		toolbarStart?: Snippet;
		toolbarEnd?: Snippet;
		selectionActions?: Snippet<[any[]]>;
	};

	const {
		table,
		isStriped,
		isBordered,
		hasDividers,
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
		showSelectionCount = true,
		selectionCountLabel = 'selected',
		toolbarStart,
		toolbarEnd,
		selectionActions
	}: Props = $props();

	const tableSizes = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const shouldShowToolbar = $derived(showToolbar || showSearch || toolbarStart || toolbarEnd);

	const hasSelection = $derived(table.selectable && table.selectedRows.length > 0);

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

	const getPageNumbers = (current: number, total: number): (number | string)[] => {
		const pages: (number | string)[] = [];
		const delta = 1;

		if (total <= 7) {
			for (let i = 1; i <= total; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);
			const start = Math.max(2, current - delta);
			const end = Math.min(total - 1, current + delta);

			if (start > 2) {
				pages.push('...');
			}
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			if (end < total - 1) {
				pages.push('...');
			}
			pages.push(total);
		}
		return pages;
	};

	const pageNumbers = $derived(
		showPagination && table.page && table.totalPages
			? getPageNumbers(table.page, table.totalPages)
			: []
	);
</script>

{#snippet InputIcon()}
	<SearchIcon class="control-icon" />
{/snippet}

<div class="table-wrapper">
	{#if shouldShowToolbar}
		<div class={cn('table-toolbar', toolbarClass)}>
			<div class="table-toolbar-start">
				{#if showSearch}
					<TextField
						value={searchValue}
						placeholder={searchPlaceholder}
						prefix={InputIcon}
						variant="outlined"
						size="sm"
						oninput={handleSearchInput}
						class="table-search"
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
		<div class="table-selection-bar">
			<div class="table-selection-info">
				{#if showSelectionCount}
					<span class="table-selection-count">
						{table.selectedRows.length}
						{selectionCountLabel}
					</span>
				{/if}
				<button type="button" class="table-selection-clear" onclick={() => table.clearSelection()}>
					Clear selection
				</button>
			</div>
			{#if selectionActions}
				<div class="table-selection-actions">
					{@render selectionActions(table.selectedRows)}
				</div>
			{/if}
		</div>
	{/if}

	<div class="table-container">
		<table
			class={cn(
				'table',
				tableSizes[size],
				isStriped && 'is-striped',
				isBordered && 'is-bordered',
				hasDividers && 'has-dividers'
			)}
		>
			<thead class="table-header">
				<tr>
					{#if table.selectable}
						<th class="table-head table-checkbox-cell" style="width: 48px;">
							<Checkbox
								checked={table.isAllSelected}
								onchange={handleSelectAllChange}
								class={cn('table-checkbox', table.isIndeterminate && 'is-indeterminate')}
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
									<Button
										variant="ghost"
										size="xs"
										onclick={() => handleSort(column)}
										class="table-sort-btn {isColumnSorted(column.field) ? 'is-active' : ''}"
									>
										{#if table.sortBy !== column.field}
											<Icon icon={ArrowSortDownLines24RegularIcon} />
										{:else if table.sortOrder === 'ASC'}
											<Icon icon={ArrowSortUpLines24RegularIcon} />
										{:else}
											<Icon icon={ArrowSortDownLines24RegularIcon} />
										{/if}
									</Button>
								{/if}
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody class="table-body">
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
				{:else if table.data.length === 0}
					<tr class="table-empty-row">
						<td
							colspan={table.selectable ? table.columns.length + 1 : table.columns.length}
							class="table-empty-cell"
						>
							<div class="empty-state">
								<div class="empty-icon">
									<Empty type={noDataType} />
								</div>
								<div class="empty-content">
									<h3 class="empty-title">{noDataTitle}</h3>
									<p class="empty-description">{noDataDescription}</p>
								</div>
							</div>
						</td>
					</tr>
				{:else}
					{#each table.data as item, index}
						<tr class:table-row-selected={table.selectable && table.isRowSelected(item)}>
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
						class="table-rows-per-page-select"
					/>
				</div>
			{/if}
		</div>
	{/if}

	{#if showPagination && table.totalPages && table.totalPages > 1 && !table.isLoading}
		<div
			class="pagination-container"
			style="justify-content: {paginationAlign === 'start'
				? 'flex-start'
				: paginationAlign === 'end'
					? 'flex-end'
					: 'center'}"
		>
			<div class="pagination">
				<button
					class="pagination-btn"
					onclick={() => table.prevPage?.()}
					disabled={!table.hasPrevPage}
					aria-label="Previous page"
				>
					<Icon icon={ArrowLeft24RegularIcon} />
				</button>

				{#each pageNumbers as pageNum}
					{#if pageNum === '...'}
						<span class="pagination-ellipsis">...</span>
					{:else}
						<button
							class="pagination-btn"
							class:active={pageNum === table.page}
							onclick={() => table.goToPage?.(pageNum as number)}
							aria-label="Page {pageNum}"
							aria-current={pageNum === table.page ? 'page' : undefined}
						>
							{pageNum}
						</button>
					{/if}
				{/each}

				<button
					class="pagination-btn"
					onclick={() => table.nextPage?.()}
					disabled={!table.hasNextPage}
					aria-label="Next page"
				>
					<Icon icon={ArrowRight24RegularIcon} />
				</button>
			</div>
		</div>
	{/if}
</div>
