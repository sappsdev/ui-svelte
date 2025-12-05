export interface Message {
	id: string;
	content: string;
	senderId: string;
	timestamp: Date | string;
	status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
	type?: 'text' | 'image' | 'file';
	metadata?: Record<string, any>;
}

export interface ChatConfig {
	chatId: string;
	userId: string;
	apiUrl: string;
	wsUrl: string;
	headers?: Record<string, string>;
	initialLimit?: number;
	onMessageReceived?: (message: Message) => void;
	onMessageSent?: (message: Message) => void;
	onError?: (error: any) => void;
	onConnected?: () => void;
	onDisconnected?: () => void;
	transformMessage?: (data: any) => Message;
	autoConnect?: boolean;
	reconnectInterval?: number;
	maxReconnectAttempts?: number;
}

export interface ChatState {
	messages: Message[];
	isLoading: boolean;
	isConnected: boolean;
	error: any;
	sendMessage: (content: string, type?: string, metadata?: Record<string, any>) => Promise<void>;
	loadMore: () => Promise<void>;
	markAsRead: (messageId: string) => void;
	connect: () => void;
	disconnect: () => void;
	hasMore: boolean;
	isSending: boolean;
}

export const useChat = (config: ChatConfig): ChatState => {
	let messages = $state<Message[]>([]);
	let isLoading = $state(false);
	let isConnected = $state(false);
	let error = $state<any>(null);
	let hasMore = $state(true);
	let isSending = $state(false);
	let ws: WebSocket | null = null;
	let reconnectAttempts = 0;
	let reconnectTimeout: number | undefined;
	let oldestMessageId: string | null = null;

	const maxReconnectAttempts = config.maxReconnectAttempts ?? 5;
	const reconnectInterval = config.reconnectInterval ?? 3000;

	const loadInitialMessages = async () => {
		isLoading = true;
		error = null;

		try {
			const token = localStorage.getItem('token');
			const headers: any = {
				'Content-Type': 'application/json',
				...config.headers
			};

			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}

			const limit = config.initialLimit ?? 50;
			const response = await fetch(
				`${config.apiUrl}/chats/${config.chatId}/messages?limit=${limit}`,
				{
					method: 'GET',
					headers
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			const loadedMessages = config.transformMessage
				? data.messages.map(config.transformMessage)
				: data.messages;

			messages = loadedMessages.reverse(); // Asumiendo que vienen del más reciente al más antiguo
			hasMore = data.hasMore ?? false;

			if (messages.length > 0) {
				oldestMessageId = messages[0].id;
			}
		} catch (err) {
			error = err;
			config.onError?.(err);
		} finally {
			isLoading = false;
		}
	};

	const loadMore = async () => {
		if (!hasMore || isLoading) return;

		isLoading = true;

		try {
			const token = localStorage.getItem('token');
			const headers: any = {
				'Content-Type': 'application/json',
				...config.headers
			};

			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}

			const limit = config.initialLimit ?? 50;
			const response = await fetch(
				`${config.apiUrl}/chats/${config.chatId}/messages?limit=${limit}&before=${oldestMessageId}`,
				{
					method: 'GET',
					headers
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			const loadedMessages = config.transformMessage
				? data.messages.map(config.transformMessage)
				: data.messages;

			messages = [...loadedMessages.reverse(), ...messages];
			hasMore = data.hasMore ?? false;

			if (loadedMessages.length > 0) {
				oldestMessageId = loadedMessages[0].id;
			}
		} catch (err) {
			error = err;
			config.onError?.(err);
		} finally {
			isLoading = false;
		}
	};

	const connect = () => {
		if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
			return;
		}

		try {
			const token = localStorage.getItem('token');
			const wsUrl = token
				? `${config.wsUrl}?token=${token}&chatId=${config.chatId}&userId=${config.userId}`
				: `${config.wsUrl}?chatId=${config.chatId}&userId=${config.userId}`;

			ws = new WebSocket(wsUrl);

			ws.onopen = () => {
				isConnected = true;
				reconnectAttempts = 0;
				config.onConnected?.();
			};

			ws.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);

					switch (data.type) {
						case 'message':
							const newMessage = config.transformMessage
								? config.transformMessage(data.message)
								: data.message;

							if (!messages.some((m) => m.id === newMessage.id)) {
								messages = [...messages, newMessage];
								config.onMessageReceived?.(newMessage);
							}
							break;

						case 'status':
							messages = messages.map((m) =>
								m.id === data.messageId ? { ...m, status: data.status } : m
							);
							break;

						case 'typing':
							break;
					}
				} catch (err) {
					console.error('Error parsing WebSocket message:', err);
				}
			};

			ws.onerror = (event) => {
				error = event;
				config.onError?.(event);
			};

			ws.onclose = () => {
				isConnected = false;
				config.onDisconnected?.();

				if (reconnectAttempts < maxReconnectAttempts) {
					reconnectAttempts++;
					reconnectTimeout = setTimeout(() => {
						connect();
					}, reconnectInterval) as unknown as number;
				}
			};
		} catch (err) {
			error = err;
			config.onError?.(err);
		}
	};

	const disconnect = () => {
		clearTimeout(reconnectTimeout);
		reconnectAttempts = maxReconnectAttempts;

		if (ws) {
			ws.close();
			ws = null;
		}

		isConnected = false;
	};

	const sendMessage = async (
		content: string,
		type: string = 'text',
		metadata?: Record<string, any>
	) => {
		if (!content.trim() || isSending) return;

		const tempId = `temp-${Date.now()}`;
		const tempMessage: Message = {
			id: tempId,
			content,
			senderId: config.userId,
			timestamp: new Date(),
			status: 'sending',
			type: type as any,
			metadata
		};

		messages = [...messages, tempMessage];
		isSending = true;

		try {
			if (ws && ws.readyState === WebSocket.OPEN) {
				ws.send(
					JSON.stringify({
						type: 'message',
						chatId: config.chatId,
						content,
						messageType: type,
						metadata
					})
				);
			} else {
				const token = localStorage.getItem('token');
				const headers: any = {
					'Content-Type': 'application/json',
					...config.headers
				};

				if (token) {
					headers['Authorization'] = `Bearer ${token}`;
				}

				const response = await fetch(`${config.apiUrl}/chats/${config.chatId}/messages`, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						content,
						type,
						metadata
					})
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				const sentMessage = config.transformMessage
					? config.transformMessage(data.message)
					: data.message;

				messages = messages.map((m) => (m.id === tempId ? sentMessage : m));

				config.onMessageSent?.(sentMessage);
			}
		} catch (err) {
			messages = messages.map((m) => (m.id === tempId ? { ...m, status: 'error' as const } : m));
			error = err;
			config.onError?.(err);
		} finally {
			isSending = false;
		}
	};

	const markAsRead = (messageId: string) => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(
				JSON.stringify({
					type: 'read',
					messageId,
					chatId: config.chatId
				})
			);
		}
	};

	$effect(() => {
		loadInitialMessages();

		if (config.autoConnect !== false) {
			connect();
		}

		return () => {
			disconnect();
		};
	});

	return {
		get messages() {
			return messages;
		},
		get isLoading() {
			return isLoading;
		},
		get isConnected() {
			return isConnected;
		},
		get error() {
			return error;
		},
		get hasMore() {
			return hasMore;
		},
		get isSending() {
			return isSending;
		},
		sendMessage,
		loadMore,
		markAsRead,
		connect,
		disconnect
	};
};
