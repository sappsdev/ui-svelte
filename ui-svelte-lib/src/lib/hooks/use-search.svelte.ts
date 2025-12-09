export interface SearchOption {
	id: string | number;
	label: string;
	description?: string;
	icon?: string;
	src?: string;
	disabled?: boolean;
	[key: string]: unknown;
}

export interface SearchState {
	options: SearchOption[];
	isLoading: boolean;
	isLoadingMore: boolean;
	hasMore: boolean;
	error: any;
	search: string;
	selectedValue: string | number | null;
	selectedOption: SearchOption | null;
	currentPage: number;
	totalResults: number;
	setSearch: (query: string) => void;
	setSelectedValue: (value: string | number | null) => void;
	refresh: () => void;
	reset: () => void;
	setOptions: (newOptions: SearchOption[]) => void;
	loadMore: () => Promise<void>;
}

export interface SearchResponse {
	options: SearchOption[];
	total?: number;
	hasMore?: boolean;
}

export interface SearchConfig {
	url?: string;
	options?: SearchOption[];
	initialSearch?: string;
	initialValue?: string | number | null;
	headers?: Record<string, string>;
	transformData?: (data: any, search: string) => SearchResponse;
	onError?: (error: any) => void;
	onSuccess?: (response: SearchResponse) => void;
	debounceSearch?: number;
	clientSide?: boolean;
	minSearchLength?: number;
	buildQueryParams?: (search: string, page: number) => Record<string, string>;
	pageSize?: number;
	enablePagination?: boolean;
}

export const useSearch = (config: SearchConfig): SearchState => {
	const isManualMode = !config.url || config.clientSide;
	const pageSize = config.pageSize ?? 20;
	const enablePagination = config.enablePagination ?? true;

	let allOptions = $state<SearchOption[]>(config.options ?? []);
	let options = $state<SearchOption[]>([]);
	let search = $state(config.initialSearch ?? '');
	let selectedValue = $state<string | number | null>(config.initialValue ?? null);
	let isLoading = $state(false);
	let isLoadingMore = $state(false);
	let hasMore = $state(false);
	let error = $state<any>(null);
	let currentPage = $state(0);
	let totalResults = $state(0);

	let debounceTimeout: number | undefined;

	const buildUrl = (page: number = 0): string => {
		if (!config.url) return '';

		const params = new URLSearchParams();

		if (config.buildQueryParams) {
			const customParams = config.buildQueryParams(search, page);

			Object.entries(customParams).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== '') {
					params.append(key, value);
				}
			});
		} else {
			if (search) params.append('search', search);
			if (enablePagination) {
				params.append('limit', String(pageSize));
				params.append('skip', String(page * pageSize));
			}
		}

		return `${config.url}?${params.toString()}`;
	};

	const processClientSideData = () => {
		let processedOptions = [...allOptions];

		if (search) {
			const lowerSearch = search.toLowerCase();
			processedOptions = processedOptions.filter((option) => {
				return (
					option.label.toLowerCase().includes(lowerSearch) ||
					String(option.id).toLowerCase().includes(lowerSearch) ||
					(option.description && option.description.toLowerCase().includes(lowerSearch))
				);
			});
		}

		// Client-side pagination
		if (enablePagination) {
			const start = 0;
			const end = (currentPage + 1) * pageSize;
			options = processedOptions.slice(start, end);
			hasMore = end < processedOptions.length;
			totalResults = processedOptions.length;
		} else {
			options = processedOptions;
			hasMore = false;
			totalResults = processedOptions.length;
		}
	};

	const fetchData = async (page: number = 0, append: boolean = false) => {
		if (isManualMode) {
			processClientSideData();
			return;
		}

		if (config.minSearchLength && search.length < config.minSearchLength) {
			options = [];
			hasMore = false;
			totalResults = 0;
			return;
		}

		if (append) {
			isLoadingMore = true;
		} else {
			isLoading = true;
		}
		error = null;

		try {
			const response = await fetch(buildUrl(page), {
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

			const searchResponse = config.transformData ? config.transformData(result, search) : result;

			if (append) {
				options = [...options, ...searchResponse.options];
			} else {
				options = searchResponse.options;
			}

			// Determinar si hay más resultados
			if (searchResponse.hasMore !== undefined) {
				hasMore = searchResponse.hasMore;
			} else if (searchResponse.total !== undefined) {
				totalResults = searchResponse.total;
				hasMore = options.length < searchResponse.total;
			} else {
				// Si no hay info de total, asumimos que hay más si recibimos pageSize resultados
				hasMore = searchResponse.options.length >= pageSize;
			}

			config.onSuccess?.(searchResponse);
		} catch (err) {
			error = err;
			config.onError?.(err);
		} finally {
			isLoading = false;
			isLoadingMore = false;
		}
	};

	const debouncedFetch = () => {
		if (config.debounceSearch && config.debounceSearch > 0) {
			clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(() => {
				currentPage = 0;
				fetchData(0, false);
			}, config.debounceSearch) as unknown as number;
		} else {
			currentPage = 0;
			fetchData(0, false);
		}
	};

	$effect(() => {
		if (isManualMode) {
			search;
			allOptions;

			processClientSideData();
		} else {
			search;

			debouncedFetch();
		}

		return () => {
			clearTimeout(debounceTimeout);
		};
	});

	const setSearch = (query: string) => {
		search = query;
		currentPage = 0;
	};

	const setSelectedValue = (value: string | number | null) => {
		selectedValue = value;
	};

	const setOptions = (newOptions: SearchOption[]) => {
		allOptions = newOptions;
		currentPage = 0;
	};

	const refresh = () => {
		currentPage = 0;
		if (isManualMode) {
			processClientSideData();
		} else {
			fetchData(0, false);
		}
	};

	const reset = () => {
		search = config.initialSearch ?? '';
		selectedValue = config.initialValue ?? null;
		currentPage = 0;
		if (isManualMode) {
			processClientSideData();
		}
	};

	const loadMore = async () => {
		if (!hasMore || isLoadingMore || isLoading) return;

		currentPage += 1;

		if (isManualMode) {
			processClientSideData();
		} else {
			await fetchData(currentPage, true);
		}
	};

	return {
		get options(): SearchOption[] {
			return options;
		},
		get search() {
			return search;
		},
		set search(value: string) {
			search = value;
		},
		get selectedValue() {
			return selectedValue;
		},
		get selectedOption(): SearchOption | null {
			return options.find((opt) => opt.id === selectedValue) ?? null;
		},
		get isLoading() {
			return isLoading;
		},
		get isLoadingMore() {
			return isLoadingMore;
		},
		get hasMore() {
			return hasMore;
		},
		get error() {
			return error;
		},
		get currentPage() {
			return currentPage;
		},
		get totalResults() {
			return totalResults;
		},
		setSearch,
		setSelectedValue,
		refresh,
		reset,
		setOptions,
		loadMore
	};
};
