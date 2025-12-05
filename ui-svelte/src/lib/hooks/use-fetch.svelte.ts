export interface FetchConfig {
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	headers?: Record<string, string>;
	onSuccess?: (data: Object) => void;
	onError?: (error: string) => void;
}

export const useFetch = (config: FetchConfig) => {
	let loading = $state<boolean>(false);

	const request = async (body: Object) => {
		loading = true;

		try {
			const token = localStorage.getItem('auth_token');

			const response = await fetch(config.url, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					...config.headers
				},
				body: body ? JSON.stringify(body) : undefined
			});

			if (!response.ok) throw new Error('Network response was not ok');
			const data = await response.json();

			config.onSuccess?.(data);
		} catch (err) {
			if (err instanceof Error) {
				config.onError?.(err.message);
			} else {
				config.onError?.(String(err));
			}
		} finally {
			loading = false;
		}
	};

	return {
		get loading() {
			return loading;
		},
		request
	};
};
