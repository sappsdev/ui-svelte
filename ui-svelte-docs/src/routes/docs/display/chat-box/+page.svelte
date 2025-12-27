<script lang="ts">
	import { ChatBox, Card, Checkbox, Code, Section, Select, TextField, useChat } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' }
	];

	let color: any = $state('primary');
	let variant: any = $state('solid');
	let userName = $state('John Doe');
	let userStatus = $state('Online');

	let hasHeaderActions = $state(false);
	let hasVoiceNote = $state(false);
	let hasFileAttach = $state(false);
	let hasCameraCapture = $state(false);

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
			color !== 'primary',
			variant !== 'solid',
			userName !== 'John Doe',
			userStatus !== 'Online',
			hasHeaderActions,
			hasVoiceNote,
			hasFileAttach,
			hasCameraCapture
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { ChatBox, useChat } from 'ui-svelte';`,
			``,
			`\tconst chat = useChat({`,
			`\t\tchatId: 'chat-123',`,
			`\t\tuserId: 'user-456',`,
			`\t\tapiUrl: 'https://api.example.com',`,
			`\t\twsUrl: 'ws://localhost:3000/ws/chats',`,
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
			hasProps && `\t{chat}`,
			hasProps && `\tcurrentUserId="user-456"`,
			hasProps && `\tuserName="${userName}"`,
			userStatus !== 'Online' && `\tuserStatus="${userStatus}"`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			hasVoiceNote && `\tonVoiceNote={handleVoiceNote}`,
			hasFileAttach && `\tonFileAttach={handleFileAttach}`,
			hasCameraCapture && `\tonCameraCapture={handleCameraCapture}`,
			hasHeaderActions && hasProps && `>`,
			hasHeaderActions && `\t{#snippet headerActions()}`,
			hasHeaderActions &&
				`\t\t<IconButton icon={CallIcon} size="sm" color="${color}" variant="ghost" />`,
			hasHeaderActions &&
				`\t\t<IconButton icon={VideoIcon} size="sm" color="${color}" variant="ghost" />`,
			hasHeaderActions && `\t{/snippet}`,
			hasHeaderActions && `</ChatBox>`,
			hasProps && !hasHeaderActions && `/>`,
			!hasProps && `<ChatBox {chat} currentUserId="user-456" userName="John Doe" />`
		].filter(Boolean);

		return [...scriptLines, '', ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'chat', type: 'ChatState', initial: 'required' },
		{ prop: 'currentUserId', type: 'string', initial: 'required' },
		{ prop: 'userName', type: 'string', initial: 'required' },
		{ prop: 'userAvatar', type: 'string', initial: '' },
		{ prop: 'userStatus', type: 'string', initial: 'Online' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined',
			initial: 'solid'
		},
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'headerActions', type: 'Snippet', initial: '' },
		{ prop: 'onVoiceNote', type: '(blob: Blob, url: string) => void', initial: '' },
		{ prop: 'onFileAttach', type: '(file: File) => void', initial: '' },
		{ prop: 'onCameraCapture', type: '() => void', initial: '' }
	];
</script>

{#snippet headerActions()}
	<span class="text-sm text-on-muted">Custom Actions</span>
{/snippet}

<DocsHeader title="ChatBox" llmUrl="https://ui-svelte.sappsdev.com/llm/display/chat-box.md">
	A complete chat interface component with real-time messaging, file sharing, voice notes, and
	WebSocket support.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			<TextField
				isFloatLabel
				rootClass="max-w-xs"
				label="User Name"
				size="sm"
				bind:value={userName}
			/>
			<TextField
				isFloatLabel
				rootClass="max-w-xs"
				label="User Status"
				size="sm"
				bind:value={userStatus}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hasHeaderActions} label="Custom Header" />
			<Checkbox bind:checked={hasVoiceNote} label="Voice Note" />
			<Checkbox bind:checked={hasFileAttach} label="File Attach" />
			<Checkbox bind:checked={hasCameraCapture} label="Camera" />
		</div>

		<div class="doc-preview">
			<div class="w-full max-w-2xl h-[500px] overflow-hidden">
				<ChatBox
					chat={mockChat}
					currentUserId="user-456"
					{userName}
					{userStatus}
					{color}
					{variant}
					headerActions={hasHeaderActions ? headerActions : undefined}
					userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
					onVoiceNote={hasVoiceNote ? (blob, url) => console.log('Voice note:', url) : undefined}
					onFileAttach={hasFileAttach ? (file) => console.log('File:', file.name) : undefined}
					onCameraCapture={hasCameraCapture ? () => console.log('Camera') : undefined}
				/>
			</div>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					<div
						class="w-80 h-48 rounded-ui overflow-hidden border border-muted"
						title="{item.label} {colorItem.label}"
					>
						<ChatBox
							chat={mockChat}
							currentUserId="user-456"
							userName={colorItem.label}
							userStatus={item.label}
							variant={item.id as any}
							color={colorItem.id as any}
						/>
					</div>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">useChat Hook</p>
	<Card>
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
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Message Types</p>
	<Card>
		<div class="prose">
			<p>The ChatBox supports multiple message types:</p>
			<ul>
				<li><code>text</code> - Standard text messages (default)</li>
				<li><code>image</code> - Image attachments with preview</li>
				<li><code>voice</code> - Voice notes with audio player</li>
				<li><code>file</code> - Generic file attachments</li>
			</ul>
		</div>
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
	</Card>
</Section>

<Section>
	<p class="section-subtitle">ChatState Methods</p>
	<Card>
		<div class="prose">
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
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Custom Header Actions</p>
	<Card>
		<Code
			lang="svelte"
			code={`<ChatBox {chat} currentUserId="user-456" userName="John Doe">
	{#snippet headerActions()}
		<IconButton
			icon={CallIcon}
			size="sm"
			variant="ghost"
			onclick={() => startVoiceCall()}
		/>
		<IconButton
			icon={VideoIcon}
			size="sm"
			variant="ghost"
			onclick={() => startVideoCall()}
		/>
	{/snippet}
</ChatBox>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Features</p>
	<Card>
		<div class="prose">
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
	</Card>
</Section>

<Section>
	<p class="section-subtitle">API Requirements</p>
	<Card>
		<div class="prose">
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
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
