export interface WebSocketConfig {
	url: string;
	protocols?: string | string[];
	reconnect?: boolean;
	reconnectInterval?: number;
	reconnectAttempts?: number;
	onOpen?: (event: Event) => void;
	onMessage?: (data: any) => void;
	onError?: (error: string) => void;
	onClose?: (event: CloseEvent) => void;
}

export const useWebSocket = (config: WebSocketConfig) => {
	let ws = $state<WebSocket | null>(null);
	let isConnected = $state<boolean>(false);
	let reconnectCount = $state<number>(0);
	let reconnectTimeoutId: number | null = null;

	const {
		url,
		protocols,
		reconnect = true,
		reconnectInterval = 3000,
		reconnectAttempts = 5
	} = config;

	const connect = () => {
		try {
			const token = localStorage.getItem('auth_token');
			const wsUrl = token ? `${url}?token=${token}` : url;

			ws = new WebSocket(wsUrl, protocols);

			ws.onopen = (event) => {
				isConnected = true;
				reconnectCount = 0;
				config.onOpen?.(event);
			};

			ws.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					config.onMessage?.(data);
				} catch {
					config.onMessage?.(event.data);
				}
			};

			ws.onerror = () => {
				config.onError?.('WebSocket error occurred');
			};

			ws.onclose = (event) => {
				isConnected = false;
				config.onClose?.(event);

				if (reconnect && reconnectCount < reconnectAttempts) {
					reconnectTimeoutId = window.setTimeout(() => {
						reconnectCount++;
						connect();
					}, reconnectInterval);
				}
			};
		} catch (err) {
			if (err instanceof Error) {
				config.onError?.(err.message);
			} else {
				config.onError?.(String(err));
			}
		}
	};

	const send = (data: any) => {
		if (ws && isConnected) {
			const message = typeof data === 'string' ? data : JSON.stringify(data);
			ws.send(message);
		} else {
			config.onError?.('WebSocket is not connected');
		}
	};

	const close = (code?: number, reason?: string) => {
		if (reconnectTimeoutId) {
			clearTimeout(reconnectTimeoutId);
			reconnectTimeoutId = null;
		}
		if (ws) {
			ws.close(code, reason);
			ws = null;
		}
	};

	return {
		get isConnected() {
			return isConnected;
		},
		get reconnectCount() {
			return reconnectCount;
		},
		connect,
		send,
		close
	};
};
