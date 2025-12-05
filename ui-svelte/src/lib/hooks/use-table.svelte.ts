import type { Snippet } from 'svelte';

interface Column {
	label: string;
	field: string;
	sortable?: boolean;
	width?: string;
	align?: 'left' | 'center' | 'right';
	render?: Snippet<[any]>;
}

export interface TableState {
	data: any[];
	isLoading: boolean;
	error: any;
	sortBy?: string;
	sortOrder: 'ASC' | 'DESC';
	setSort: (column: string, order?: 'ASC' | 'DESC') => void;
	page?: number;
	totalPages?: number;
	total?: number;
	hasNextPage?: boolean;
	hasPrevPage?: boolean;
	nextPage?: () => void;
	prevPage?: () => void;
	goToPage?: (page: number) => void;
	columns: Column[];
	setPage: (newPage: number) => void;
	setPageSize: (newPageSize: number) => void;
	setSearch: (query: string) => void;
	refresh: () => void;
	reset: () => void;
	pageSize: number;
	search: string;
	updateData: (newData: any[]) => void;
	selectable: boolean;
	rowKey: string;
	selectedRows: any[];
	selectedKeys: Set<string | number>;
	isAllSelected: boolean;
	isIndeterminate: boolean;
	selectRow: (row: any) => void;
	deselectRow: (row: any) => void;
	toggleRow: (row: any) => void;
	selectAll: () => void;
	deselectAll: () => void;
	toggleAll: () => void;
	isRowSelected: (row: any) => boolean;
	clearSelection: () => void;
}

export type TableParams = {
	page?: number;
	pageSize?: number;
	sortBy?: string;
	sortOrder?: 'ASC' | 'DESC';
	search?: string;
	offset?: number;
	limit?: number;
};

export interface PaginatedResponse {
	data: any[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export type TableConfig = {
	columns: Column[];
	data?: any[];
	url?: string;
	queryParams?: (params: TableParams) => Record<string, string>;
	initialPage?: number;
	initialPageSize?: number;
	initialSortBy?: string;
	initialSortOrder?: 'ASC' | 'DESC';
	initialSearch?: string;
	headers?: Record<string, string>;
	parseResponse?: (data: any, params: TableParams) => PaginatedResponse;
	onError?: (error: any) => void;
	onSuccess?: (response: PaginatedResponse) => void;
	debounceSearch?: number;
	selectable?: boolean;
	rowKey?: string;
	onSelectionChange?: (selectedRows: any[]) => void;
};

export const useTable = (config: TableConfig): TableState => {
	const isManualMode = !!config.data;

	let allData = $state<any[]>(config.data ?? []);
	let data = $state<any[]>([]);
	let total = $state(0);
	let page = $state(config.initialPage ?? 1);
	let pageSize = $state(config.initialPageSize ?? 10);
	let sortBy = $state(config.initialSortBy);
	let sortOrder = $state<'ASC' | 'DESC'>(config.initialSortOrder ?? 'ASC');
	let search = $state(config.initialSearch ?? '');
	let isLoading = $state(false);
	let error = $state<any>(null);

	const selectable = config.selectable ?? false;
	const rowKey = config.rowKey ?? 'id';
	let selectedKeys = $state<Set<string | number>>(new Set());

	let debounceTimeout: number | undefined;

	const getRowKey = (row: any): string | number => {
		return row[rowKey];
	};

	const selectedRows = $derived.by(() => {
		if (!selectable) return [];
		return data.filter((row) => selectedKeys.has(getRowKey(row)));
	});

	const isAllSelected = $derived.by(() => {
		if (!selectable || data.length === 0) return false;
		return data.every((row) => selectedKeys.has(getRowKey(row)));
	});

	const isIndeterminate = $derived.by(() => {
		if (!selectable || data.length === 0) return false;
		const someSelected = data.some((row) => selectedKeys.has(getRowKey(row)));
		return someSelected && !isAllSelected;
	});

	const buildUrl = (): string => {
		if (!config.url) return '';

		const url = config.url;

		if (!config.queryParams) {
			return url;
		}

		const params = new URLSearchParams();

		const tableParams: TableParams = {
			page,
			pageSize,
			sortBy,
			sortOrder,
			search,
			offset: (page - 1) * pageSize,
			limit: pageSize
		};

		const customParams = config.queryParams(tableParams);

		Object.entries(customParams).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				params.append(key, value);
			}
		});

		return `${url}?${params.toString()}`;
	};

	const processClientSideData = () => {
		let processedData = [...allData];

		if (search) {
			processedData = processedData.filter((item) => {
				return config.columns.some((column) => {
					const value = item[column.field];
					return String(value).toLowerCase().includes(search.toLowerCase());
				});
			});
		}

		if (sortBy) {
			processedData.sort((a, b) => {
				const aVal = a[sortBy!];
				const bVal = b[sortBy!];

				if (aVal === bVal) return 0;

				const comparison = aVal > bVal ? 1 : -1;
				return sortOrder === 'ASC' ? comparison : -comparison;
			});
		}

		total = processedData.length;

		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		data = processedData.slice(startIndex, endIndex);
	};

	const fetchData = async () => {
		if (isManualMode) {
			processClientSideData();
			return;
		}

		isLoading = true;
		error = null;

		try {
			const response = await fetch(buildUrl(), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					...config.headers
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			const tableParams: TableParams = {
				page,
				pageSize,
				sortBy,
				sortOrder,
				search,
				offset: (page - 1) * pageSize,
				limit: pageSize
			};

			const paginatedData = config.parseResponse
				? config.parseResponse(result, tableParams)
				: result;

			data = paginatedData.data;
			total = paginatedData.total;

			if (paginatedData.page !== undefined) page = paginatedData.page;
			if (paginatedData.pageSize !== undefined) pageSize = paginatedData.pageSize;

			config.onSuccess?.(paginatedData);
		} catch (err) {
			error = err;
			config.onError?.(err);
		} finally {
			isLoading = false;
		}
	};

	const debouncedFetch = () => {
		if (config.debounceSearch && config.debounceSearch > 0) {
			clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(() => {
				fetchData();
			}, config.debounceSearch) as unknown as number;
		} else {
			fetchData();
		}
	};

	$effect(() => {
		if (isManualMode) {
			page;
			pageSize;
			sortBy;
			sortOrder;
			search;
			allData;

			processClientSideData();
		} else {
			page;
			pageSize;
			sortBy;
			sortOrder;
			search;

			debouncedFetch();
		}

		return () => {
			clearTimeout(debounceTimeout);
		};
	});

	$effect(() => {
		if (selectable && config.onSelectionChange) {
			config.onSelectionChange(selectedRows);
		}
	});

	const setPage = (newPage: number) => {
		page = newPage;
	};

	const setPageSize = (newPageSize: number) => {
		pageSize = newPageSize;
		page = 1;
	};

	const setSort = (column: string, order?: 'ASC' | 'DESC') => {
		sortBy = column;
		sortOrder = order ?? (sortBy === column && sortOrder === 'ASC' ? 'DESC' : 'ASC');
	};

	const setSearch = (query: string) => {
		search = query;
		page = 1;
	};

	const updateData = (newData: any[]) => {
		allData = newData;
		page = 1;
	};

	const refresh = () => {
		if (isManualMode) {
			processClientSideData();
		} else {
			fetchData();
		}
	};

	const reset = () => {
		page = config.initialPage ?? 1;
		pageSize = config.initialPageSize ?? 10;
		sortBy = config.initialSortBy;
		sortOrder = config.initialSortOrder ?? 'ASC';
		search = config.initialSearch ?? '';
		selectedKeys = new Set();
	};

	const nextPage = () => {
		if (page < Math.ceil(total / pageSize)) {
			page++;
		}
	};

	const prevPage = () => {
		if (page > 1) {
			page--;
		}
	};

	const goToPage = (targetPage: number) => {
		const maxPages = Math.ceil(total / pageSize);
		if (targetPage >= 1 && targetPage <= maxPages) {
			page = targetPage;
		}
	};

	const selectRow = (row: any) => {
		if (!selectable) return;
		const key = getRowKey(row);
		selectedKeys = new Set(selectedKeys).add(key);
	};

	const deselectRow = (row: any) => {
		if (!selectable) return;
		const key = getRowKey(row);
		const newSet = new Set(selectedKeys);
		newSet.delete(key);
		selectedKeys = newSet;
	};

	const toggleRow = (row: any) => {
		if (!selectable) return;
		const key = getRowKey(row);
		if (selectedKeys.has(key)) {
			deselectRow(row);
		} else {
			selectRow(row);
		}
	};

	const selectAll = () => {
		if (!selectable) return;
		const newSet = new Set(selectedKeys);
		data.forEach((row) => {
			newSet.add(getRowKey(row));
		});
		selectedKeys = newSet;
	};

	const deselectAll = () => {
		if (!selectable) return;
		const newSet = new Set(selectedKeys);
		data.forEach((row) => {
			newSet.delete(getRowKey(row));
		});
		selectedKeys = newSet;
	};

	const toggleAll = () => {
		if (!selectable) return;
		if (isAllSelected) {
			deselectAll();
		} else {
			selectAll();
		}
	};

	const isRowSelected = (row: any): boolean => {
		if (!selectable) return false;
		return selectedKeys.has(getRowKey(row));
	};

	const clearSelection = () => {
		if (!selectable) return;
		selectedKeys = new Set();
	};

	return {
		get data(): any[] {
			return data;
		},
		get total() {
			return total;
		},
		get page() {
			return page;
		},
		get pageSize() {
			return pageSize;
		},
		get sortBy() {
			return sortBy;
		},
		get sortOrder() {
			return sortOrder;
		},
		get search() {
			return search;
		},
		get isLoading() {
			return isLoading;
		},
		get error() {
			return error;
		},
		get totalPages() {
			return Math.ceil(total / pageSize);
		},
		get hasNextPage() {
			return page < Math.ceil(total / pageSize);
		},
		get hasPrevPage() {
			return page > 1;
		},
		get columns(): Column[] {
			return config.columns;
		},
		get selectable() {
			return selectable;
		},
		get rowKey() {
			return rowKey;
		},
		get selectedRows() {
			return selectedRows;
		},
		get selectedKeys() {
			return selectedKeys;
		},
		get isAllSelected() {
			return isAllSelected;
		},
		get isIndeterminate() {
			return isIndeterminate;
		},
		setPage,
		setPageSize,
		setSort,
		setSearch,
		refresh,
		reset,
		nextPage,
		prevPage,
		goToPage,
		updateData,
		selectRow,
		deselectRow,
		toggleRow,
		selectAll,
		deselectAll,
		toggleAll,
		isRowSelected,
		clearSelection
	};
};
