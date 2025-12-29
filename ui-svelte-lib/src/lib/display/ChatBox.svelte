<script lang="ts">
	import type { ChatState, Message } from '$lib/hooks/use-chat.svelte.js';
	import {
		Attach24RegularIcon,
		Camera24RegularIcon,
		Microphone2LinearIcon,
		MoreVertical24RegularIcon,
		Search24RegularIcon,
		Send24RegularIcon
	} from '$lib/icons/index.js';
	import { Avatar, Record as RecordAudio, Audio, Button, Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	export interface PromptMessage {
		id: string;
		role: 'user' | 'assistant' | 'system';
		content: string;
		timestamp?: Date | string;
		isStreaming?: boolean;
		metadata?: Record<string, any>;
	}

	export interface PromptState {
		messages: PromptMessage[];
		isLoading: boolean;
		isStreaming: boolean;
		error: any;
		sendMessage: (content: string) => Promise<void>;
		stopGeneration?: () => void;
	}

	type Props = {
		rootClass?: string;
		mode?: 'conversation' | 'prompt';
		chat?: ChatState;
		currentUserId?: string;
		prompt?: PromptState;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger';
		variant?: 'solid' | 'soft' | 'outlined';
		userName?: string;
		userAvatar?: string;
		userStatus?: string;
		showHeader?: boolean;
		headerActions?: Snippet;
		placeholder?: string;
		showAttachments?: boolean;
		showVoiceNote?: boolean;
		showCamera?: boolean;
		messageRenderer?: Snippet<[PromptMessage | Message]>;
		assistantAvatar?: string;
		assistantName?: string;
		onVoiceNote?: (blob: Blob, url: string) => void;
		onFileAttach?: (file: File) => void;
		onCameraCapture?: () => void;
	};

	let {
		rootClass,
		mode = 'conversation',
		chat,
		currentUserId = '',
		prompt,
		color = 'primary',
		variant = 'solid',
		userName = '',
		userAvatar,
		userStatus = 'Online',
		showHeader = true,
		headerActions,
		placeholder = 'Type a message...',
		showAttachments = true,
		showVoiceNote = true,
		showCamera = false,
		messageRenderer,
		assistantAvatar,
		assistantName = 'Assistant',
		onVoiceNote,
		onFileAttach,
		onCameraCapture
	}: Props = $props();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger'
	};

	const variants = {
		solid: 'is-solid',
		soft: 'is-soft',
		outlined: 'is-outlined'
	};

	let messageInput = $state('');
	let messagesContainer: HTMLDivElement;
	let fileInput = $state<HTMLInputElement>();
	let isRecording = $state(false);

	const isPromptMode = $derived(mode === 'prompt');
	const messages = $derived(isPromptMode ? (prompt?.messages ?? []) : (chat?.messages ?? []));
	const isLoading = $derived(
		isPromptMode ? (prompt?.isLoading ?? false) : (chat?.isLoading ?? false)
	);
	const isSending = $derived(
		isPromptMode ? (prompt?.isLoading ?? false) : (chat?.isSending ?? false)
	);
	const isStreaming = $derived(isPromptMode ? (prompt?.isStreaming ?? false) : false);
	const hasMore = $derived(isPromptMode ? false : (chat?.hasMore ?? false));

	function handleSend() {
		if (messageInput.trim()) {
			if (isPromptMode && prompt) {
				prompt.sendMessage(messageInput);
			} else if (chat) {
				chat.sendMessage(messageInput);
			}
			messageInput = '';
			scrollToBottom();
		}
	}

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}

	function scrollToBottom() {
		if (messagesContainer) {
			setTimeout(() => {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}, 0);
		}
	}

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file && chat) {
			if (onFileAttach) {
				onFileAttach(file);
			} else {
				const type = file.type.startsWith('image/')
					? 'image'
					: file.type.startsWith('audio/')
						? 'voice'
						: 'file';
				chat.sendMessage(file.name, type, {
					fileUrl: URL.createObjectURL(file),
					fileName: file.name
				});
			}
		}
	}

	function handleRecordingComplete(blob: Blob, url: string) {
		if (onVoiceNote) {
			onVoiceNote(blob, url);
		} else if (chat) {
			chat.sendMessage('Voice note', 'voice', {
				fileUrl: url,
				fileName: 'voice-note.webm'
			});
		}
		isRecording = false;
	}

	function toggleRecording() {
		isRecording = !isRecording;
	}

	function formatTime(timestamp: Date | string | undefined) {
		if (!timestamp) return '';
		const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
		return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
	}

	function isOwnMessage(message: PromptMessage | Message): boolean {
		if (isPromptMode) {
			return (message as PromptMessage).role === 'user';
		}
		return (message as Message).senderId === currentUserId;
	}

	function getMessageRole(
		message: PromptMessage | Message
	): 'user' | 'assistant' | 'system' | 'other' {
		if (isPromptMode) {
			return (message as PromptMessage).role;
		}
		return (message as Message).senderId === currentUserId ? 'user' : 'other';
	}

	$effect(() => {
		if (messages.length > 0) {
			scrollToBottom();
		}
	});
</script>

<div
	class={cn('chatbox', colors[color], variants[variant], isPromptMode && 'is-prompt', rootClass)}
>
	{#if showHeader && !isPromptMode}
		<div class="chatbox-header">
			<div class="chatbox-header-start">
				<Avatar src={userAvatar} alt={userName} size="sm" />
				<div class="chatbox-header-center">
					<div class="chatbox-header-name">{userName}</div>
					<div class="chatbox-header-status">{userStatus}</div>
				</div>
			</div>
			<div class="chatbox-header-end">
				{#if headerActions}
					{@render headerActions()}
				{:else}
					<Button size="sm" {color} variant="ghost">
						<Icon icon={Search24RegularIcon} />
					</Button>
					<Button size="sm" {color} variant="ghost">
						<Icon icon={MoreVertical24RegularIcon} />
					</Button>
				{/if}
			</div>
		</div>
	{/if}

	<div class="chatbox-messages" bind:this={messagesContainer}>
		{#if hasMore && chat}
			<button class="load-more-btn" onclick={() => chat?.loadMore()} disabled={isLoading}>
				{isLoading ? 'Loading...' : 'Load more messages'}
			</button>
		{/if}

		{#each messages as message}
			{@const isOwn = isOwnMessage(message)}
			{@const role = getMessageRole(message)}
			<div
				class="message-wrapper"
				class:own={isOwn}
				class:assistant={role === 'assistant'}
				class:system={role === 'system'}
			>
				{#if isPromptMode && role === 'assistant'}
					<div class="message-avatar">
						<Avatar src={assistantAvatar} alt={assistantName} size="sm" />
					</div>
				{/if}

				<div
					class="message"
					class:own={isOwn}
					class:assistant={role === 'assistant'}
					class:system={role === 'system'}
				>
					{#if messageRenderer}
						{@render messageRenderer(message)}
					{:else if 'type' in message && message.type === 'image'}
						<!-- svelte-ignore a11y_img_redundant_alt -->
						<img src={message.metadata?.fileUrl} alt="Shared image" class="message-image" />
					{:else if 'type' in message && message.type === ('voice' as any)}
						<Audio src={message.metadata?.fileUrl || ''} color={isOwn ? color : 'muted'} />
					{:else if 'type' in message && message.type === 'file'}
						<div class="message-file">
							<span class="message-file-icon">📎</span>
							<span class="message-file-name">{message.metadata?.fileName || 'File'}</span>
						</div>
					{:else}
						<div class="message-content">
							{message.content}
							{#if isPromptMode && (message as PromptMessage).isStreaming}
								<span class="streaming-cursor">▊</span>
							{/if}
						</div>
					{/if}

					{#if !isPromptMode || role !== 'system'}
						<div class="message-meta">
							<span class="message-time"
								>{formatTime('timestamp' in message ? message.timestamp : undefined)}</span
							>
							{#if !isPromptMode && isOwn && 'status' in message}
								<span class="message-status">
									{#if message.status === 'sending'}⏱{/if}
									{#if message.status === 'sent'}✓{/if}
									{#if message.status === 'delivered'}✓✓{/if}
									{#if message.status === 'read'}
										<span class="message-status-read">✓✓</span>
									{/if}
									{#if message.status === 'error'}⚠{/if}
								</span>
							{/if}
						</div>
					{/if}
				</div>

				{#if isPromptMode && role === 'user'}
					<div class="message-avatar">
						<Avatar src={userAvatar} alt="You" size="sm" />
					</div>
				{/if}
			</div>
		{/each}

		{#if isStreaming}
			<div class="message-wrapper assistant">
				<div class="message-avatar">
					<Avatar src={assistantAvatar} alt={assistantName} size="sm" />
				</div>
				<div class="message assistant">
					<div class="typing-indicator">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		{/if}
	</div>

	{#if isRecording && !isPromptMode}
		<div class="chatbox-record-overlay">
			<RecordAudio name="voice-note" {color} onRecordingComplete={handleRecordingComplete} />
		</div>
	{/if}

	<div class="chatbox-footer">
		<label class="chatbox-input-wrapper">
			<label class="flex-1">
				<input
					bind:value={messageInput}
					{placeholder}
					onkeydown={handleKeyPress}
					disabled={isSending}
					class="chatbox-input"
				/>
			</label>

			{#if !isPromptMode}
				<div class="chatbox-input-actions">
					{#if showVoiceNote}
						<Button size="sm" {color} variant="ghost" onclick={toggleRecording}>
							<Icon icon={Microphone2LinearIcon} />
						</Button>
					{/if}
					{#if showAttachments}
						<Button size="sm" {color} variant="ghost" onclick={() => fileInput?.click()}>
							<Icon icon={Attach24RegularIcon} />
						</Button>
						<input
							type="file"
							bind:this={fileInput}
							onchange={handleFileSelect}
							style="display: none"
						/>
					{/if}
					{#if showCamera && onCameraCapture}
						<Button size="sm" {color} variant="ghost" onclick={onCameraCapture}>
							<Icon icon={Camera24RegularIcon} />
						</Button>
					{/if}
				</div>
			{/if}

			{#if isPromptMode && isStreaming && prompt?.stopGeneration}
				<Button size="sm" color="danger" variant="soft" onclick={() => prompt?.stopGeneration?.()}>
					Stop
				</Button>
			{:else}
				<Button
					size="sm"
					{color}
					variant={variant === 'outlined' ? 'outlined' : 'solid'}
					onclick={handleSend}
					isDisabled={isSending || !messageInput.trim()}
				>
					<Icon icon={Send24RegularIcon} />
				</Button>
			{/if}
		</label>
	</div>
</div>
