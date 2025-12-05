<script lang="ts">
	import {
		Button,
		Card,
		Checkbox,
		Code,
		Section,
		Divider,
		Select,
		TextField,
		ChatBox,
		useChat
	} from 'ui-svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'outline', label: 'Outline' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	let selectedVariant: any = $state('primary');
	let hasHeaderActions = $state(false);
	let hasVoiceNote = $state(false);
	let hasFileAttach = $state(false);
	let hasCameraCapture = $state(false);
	let userName = $state('John Doe');
	let userStatus = $state('Online');

	// Mock chat state for preview
	const mockChat = useChat({
		chatId: 'preview-chat',
		userId: 'user-456',
		apiUrl: 'https://localhost',
		wsUrl: 'ws://localhost:3000/ws/chats',
		autoConnect: false
	});

	let hasProps = $derived(
		[
			selectedVariant !== 'solid',
			hasHeaderActions,
			hasVoiceNote,
			hasFileAttach,
			hasCameraCapture,
			userName !== 'John Doe',
			userStatus !== 'Online'
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { ChatBox } from 'ui-svelte';`,
			`\timport { useChat } from '$lib/hooks/use-chat.svelte';`,
			``,
			`\tconst chat = useChat({`,
			`\t\tchatId: 'chat-123',`,
			`\t\tuserId: 'user-456',`,
			`\t\tapiUrl: 'https://api.example.com',`,
			`\t\twsUrl: 'ws://localhost:3000/ws/chats',`,
			`\t\tinitialLimit: 50,`,
			`\t\tonMessageReceived: (msg) => console.log('New message:', msg),`,
			`\t\tonConnected: () => console.log('Connected!'),`,
			`\t\tautoConnect: true`,
			`\t});`,
			hasVoiceNote && `\n\tconst handleVoiceNote = (blob: Blob, url: string) => {`,
			hasVoiceNote && `\t\tconsole.log('Voice note recorded:', url);`,
			hasVoiceNote && `\t};`,
			hasFileAttach && `\n\tconst handleFileAttach = (file: File) => {`,
			hasFileAttach && `\t\tconsole.log('File attached:', file.name);`,
			hasFileAttach && `\t};`,
			hasCameraCapture && `\n\tconst handleCameraCapture = () => {`,
			hasCameraCapture && `\t\tconsole.log('Camera capture triggered');`,
			hasCameraCapture && `\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<ChatBox`,
			`\t{chat}`,
			`\tcurrentUserId="user-456"`,
			userName !== 'John Doe' && `\tuserName="${userName}"`,
			userStatus !== 'Online' && `\tuserStatus="${userStatus}"`,
			selectedVariant !== 'solid' && `\tvariant="${selectedVariant}"`,
			hasVoiceNote && `\tonVoiceNote={handleVoiceNote}`,
			hasFileAttach && `\tonFileAttach={handleFileAttach}`,
			hasCameraCapture && `\tonCameraCapture={handleCameraCapture}`,
			hasHeaderActions && `>`,
			hasHeaderActions && `\t{#snippet headerActions()}`,
			hasHeaderActions &&
				`\t\t<IconButton icon="fluent:call-24-regular" size="sm" variant="ghost" />`,
			hasHeaderActions &&
				`\t\t<IconButton icon="fluent:video-24-regular" size="sm" variant="ghost" />`,
			hasHeaderActions && `\t{/snippet}`,
			hasHeaderActions && `</ChatBox>`,
			!hasProps &&
				`<ChatBox {chat} currentUserId="user-456" userName="${userName}" userStatus="${userStatus}" />`,
			hasProps && !hasHeaderActions && `/>`
		].filter(Boolean);

		return [...scriptLines, '', ...componentLines].join('\n');
	});
</script>

<Section>
	<div class="prose">
		<h1>ChatBox</h1>
		<p>
			A complete chat interface component with real-time messaging, file sharing, voice notes, and
			WebSocket support.
		</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					<div class="w-full max-w-2xl h-[600px] overflow-hidden">
						<ChatBox
							chat={mockChat}
							currentUserId="user-456"
							{userName}
							{userStatus}
							variant={selectedVariant}
							userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
							onVoiceNote={hasVoiceNote
								? (blob, url) => console.log('Voice note:', url)
								: undefined}
							onFileAttach={hasFileAttach ? (file) => console.log('File:', file.name) : undefined}
							onCameraCapture={hasCameraCapture ? () => console.log('Camera') : undefined}
						>
							{#if hasHeaderActions}
								{#snippet headerActions()}
									icons
								{/snippet}
							{/if}
						</ChatBox>
					</div>
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 min-w-64">
				<h4>Builder</h4>

				<Select
					label="Variant"
					name="variant"
					size="sm"
					options={variantOptions}
					bind:value={selectedVariant}
				/>

				<TextField label="User Name" name="userName" size="sm" bind:value={userName} />

				<TextField label="User Status" name="userStatus" size="sm" bind:value={userStatus} />

				<div class="flex flex-col gap-2">
					<h6>Features</h6>
					<div class="grid grid-cols-1 gap-2">
						<Checkbox
							bind:checked={hasHeaderActions}
							name="header-actions"
							label="Custom Header Actions"
						/>
						<Checkbox bind:checked={hasVoiceNote} name="voice-note" label="Voice Note Handler" />
						<Checkbox bind:checked={hasFileAttach} name="file-attach" label="File Attach Handler" />
						<Checkbox bind:checked={hasCameraCapture} name="camera" label="Camera Capture" />
					</div>
				</div>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Code lang="svelte" code={code()} />
</Section>

<Section>
	<div class="prose">
		<h3>useChat Hook</h3>
		<p>The ChatBox component works with the <code>useChat</code> hook for state management:</p>
	</div>
</Section>

<Section>
	<Code
		lang="typescript"
		code={`const chat = useChat({
	chatId: 'chat-123',           // Unique chat identifier
	userId: 'user-456',           // Current user ID
	apiUrl: 'https://api.example.com',  // REST API endpoint
	wsUrl: 'ws://localhost:3000/ws/chats',  // WebSocket URL
	initialLimit: 50,             // Initial message load limit
	headers: {                    // Optional custom headers
		'X-Custom-Header': 'value'
	},
	autoConnect: true,            // Auto-connect WebSocket (default: true)
	reconnectInterval: 3000,      // Reconnection delay (default: 3000ms)
	maxReconnectAttempts: 5,      // Max reconnection attempts (default: 5)

	// Event callbacks
	onMessageReceived: (message) => {
		console.log('New message:', message);
	},
	onMessageSent: (message) => {
		console.log('Message sent:', message);
	},
	onConnected: () => {
		console.log('WebSocket connected');
	},
	onDisconnected: () => {
		console.log('WebSocket disconnected');
	},
	onError: (error) => {
		console.error('Chat error:', error);
	},

	// Transform API response to Message format
	transformMessage: (data) => ({
		id: data.id,
		content: data.text,
		senderId: data.author_id,
		timestamp: new Date(data.created_at),
		status: data.status,
		type: data.message_type,
		metadata: data.extra_data
	})
});`}
	/>
</Section>

<Section>
	<div class="prose">
		<h3>Props</h3>
		<p>The ChatBox component accepts the following props:</p>
		<ul>
			<li><code>chat</code> - ChatState object from useChat hook (required)</li>
			<li><code>currentUserId</code> - Current user's ID to identify own messages (required)</li>
			<li><code>userName</code> - Display name of the chat recipient (required)</li>
			<li><code>variant</code> - Visual style: solid or soft (default: solid)</li>
			<li><code>userAvatar</code> - Avatar image URL for the recipient</li>
			<li><code>userStatus</code> - Status text to display (default: "Online")</li>
			<li><code>headerActions</code> - Snippet for custom header action buttons</li>
			<li><code>onVoiceNote</code> - Callback for voice note recording (blob, url) => void</li>
			<li><code>onFileAttach</code> - Callback for file attachment (file) => void</li>
			<li><code>onCameraCapture</code> - Callback for camera capture button click</li>
			<li><code>class</code> - Custom CSS classes</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Message Types</h3>
		<p>The ChatBox supports multiple message types:</p>
		<ul>
			<li><code>text</code> - Standard text messages (default)</li>
			<li><code>image</code> - Image attachments with preview</li>
			<li><code>voice</code> - Voice notes with audio player</li>
			<li><code>file</code> - Generic file attachments</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Message Interface</h3>
	</div>
</Section>

<Section>
	<Code
		lang="typescript"
		code={`interface Message {
	id: string;
	content: string;
	senderId: string;
	timestamp: Date | string;
	status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
	type?: 'text' | 'image' | 'file' | 'voice';
	metadata?: Record<string, any>;
}`}
	/>
</Section>

<Section>
	<div class="prose">
		<h3>ChatState Methods</h3>
		<p>The chat state object provides these methods:</p>
		<ul>
			<li>
				<code>sendMessage(content, type?, metadata?)</code> - Send a new message
			</li>
			<li><code>loadMore()</code> - Load older messages (pagination)</li>
			<li><code>markAsRead(messageId)</code> - Mark a message as read</li>
			<li><code>connect()</code> - Manually connect WebSocket</li>
			<li><code>disconnect()</code> - Disconnect WebSocket</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Custom Header Actions Example</h3>
	</div>
</Section>

<Section>
	<Code
		lang="svelte"
		code={`<ChatBox {chat} currentUserId="user-456" userName="John Doe">
	{#snippet headerActions()}
		<IconButton
			icon="fluent:call-24-regular"
			size="sm"
			variant="ghost"
			onclick={() => startVoiceCall()}
		/>
		<IconButton
			icon="fluent:video-24-regular"
			size="sm"
			variant="ghost"
			onclick={() => startVideoCall()}
		/>
		<IconButton
			icon="fluent:info-24-regular"
			size="sm"
			variant="ghost"
			onclick={() => showChatInfo()}
		/>
	{/snippet}
</ChatBox>`}
	/>
</Section>

<Section>
	<div class="prose">
		<h3>Features</h3>
		<ul>
			<li>Real-time messaging via WebSocket with automatic reconnection</li>
			<li>REST API fallback when WebSocket is unavailable</li>
			<li>Message status indicators (sending, sent, delivered, read, error)</li>
			<li>Voice note recording with audio player</li>
			<li>File and image attachment support</li>
			<li>Infinite scroll with "Load more" pagination</li>
			<li>Automatic scrolling to latest messages</li>
			<li>Message timestamps in local time format</li>
			<li>Visual distinction between own and received messages</li>
			<li>Customizable header actions via snippets</li>
			<li>Support for custom message transformers</li>
			<li>Token-based authentication support</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>API Requirements</h3>
		<p>Your backend API should implement these endpoints:</p>
		<h4>REST API</h4>
		<ul>
			<li>
				<code>GET /chats/:chatId/messages?limit=50&before=messageId</code> - Fetch messages
			</li>
			<li><code>POST /chats/:chatId/messages</code> - Send a new message</li>
		</ul>
		<h4>WebSocket</h4>
		<p>WebSocket URL format: <code>ws://host/path?token=xxx&chatId=xxx&userId=xxx</code></p>
		<p>Message types to handle:</p>
		<ul>
			<li><code>type: "message"</code> - New message received</li>
			<li><code>type: "status"</code> - Message status update</li>
			<li><code>type: "typing"</code> - User typing indicator</li>
			<li><code>type: "read"</code> - Mark message as read</li>
		</ul>
	</div>
</Section>
