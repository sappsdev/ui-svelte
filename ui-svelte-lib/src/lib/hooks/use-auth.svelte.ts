import { goto } from '$app/navigation';
import { onMount } from 'svelte';

type Config = {
	endpoint: string;
	routeAccess?: string;
	urlSuccess?: string;
	urlError?: string;
};

export const useAuth = (config: Config) => {
	let isLoading = $state(true);
	let isAuthorized = $state(false);

	onMount(async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				isAuthorized = false;
				if (config.urlError) {
					await goto(config.urlError);
				}
				isLoading = false;
				return;
			}
			let url = config.endpoint;
			if (config.routeAccess) {
				const separator = url.includes('?') ? '&' : '?';
				url = `${url}${separator}routeAccess=${encodeURIComponent(config.routeAccess)}`;
			}
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			});

			if (!res.ok) {
				throw new Error(`Error de autenticación: ${res.status}`);
			}

			const data = await res.json();

			if (!data || !data.user) {
				throw new Error('Respuesta inválida del servidor');
			}

			isAuthorized = true;

			if (config.urlSuccess) {
				await goto(config.urlSuccess);
			}
			isLoading = false;
		} catch {
			if (config.urlError) {
				localStorage.removeItem('token');
				await goto(config.urlError);
			}
			isAuthorized = false;
			isLoading = false;
		}
	});
	return {
		get isLoading() {
			return isLoading;
		},
		get isAuthorized() {
			return isAuthorized;
		}
	};
};
