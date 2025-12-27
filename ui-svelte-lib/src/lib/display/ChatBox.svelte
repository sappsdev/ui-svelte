<script lang="ts">
	import type { ChatState } from '$lib/hooks/use-chat.svelte.js';
	import {
		Attach24RegularIcon,
		Camera24RegularIcon,
		Microphone2LinearIcon,
		MoreVertical24RegularIcon,
		Search24RegularIcon,
		Send24RegularIcon
	} from '$lib/icons/index.js';
	import { Avatar, Record, Audio, Button, Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		rootClass?: string;
		chat: ChatState;
		currentUserId: string;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger';
		variant?: 'solid' | 'soft' | 'outlined';
		userName: string;
		userAvatar?: string;
		userStatus?: string;
		headerActions?: Snippet;
		onVoiceNote?: (blob: Blob, url: string) => void;
		onFileAttach?: (file: File) => void;
		onCameraCapture?: () => void;
	};

	let {
		rootClass,
		chat,
		currentUserId,
		color = 'primary',
		variant = 'solid',
		userName,
		userAvatar,
		userStatus = 'Online',
		headerActions,
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
	let fileInput: HTMLInputElement;
	let isRecording = $state(false);

	function handleSend() {
		if (messageInput.trim()) {
			chat.sendMessage(messageInput);
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
		if (file) {
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
		} else {
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

	function formatTime(timestamp: Date | string) {
		const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
		return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
	}

	$effect(() => {
		if (chat.messages.length > 0) {
			scrollToBottom();
		}
	});
</script>

<div class={cn('chatbox', colors[color], variants[variant], rootClass)}>
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

	<div class="chatbox-messages" bind:this={messagesContainer}>
		{#if chat.hasMore}
			<button class="load-more-btn" onclick={() => chat.loadMore()} disabled={chat.isLoading}>
				{chat.isLoading ? 'Loading...' : 'Load more messages'}
			</button>
		{/if}

		{#each chat.messages as message}
			{@const isOwn = message.senderId === currentUserId}
			<div class="message-wrapper" class:own={isOwn}>
				<div class="message" class:own={isOwn}>
					{#if message.type === 'image'}
						<!-- svelte-ignore a11y_img_redundant_alt -->
						<img src={message.metadata?.fileUrl} alt="Shared image" class="message-image" />
					{:else if message.type === ('voice' as any)}
						<Audio src={message.metadata?.fileUrl || ''} color={isOwn ? color : 'muted'} />
					{:else if message.type === 'file'}
						<div class="message-file">
							<span class="message-file-icon">📎</span>
							<span class="message-file-name">{message.metadata?.fileName || 'File'}</span>
						</div>
					{:else}
						<div class="message-content">{message.content}</div>
					{/if}

					<div class="message-meta">
						<span class="message-time">{formatTime(message.timestamp)}</span>
						{#if isOwn}
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
				</div>
			</div>
		{/each}
	</div>

	{#if isRecording}
		<div class="chatbox-record-overlay">
			<Record name="voice-note" {color} onRecordingComplete={handleRecordingComplete} />
		</div>
	{/if}

	<div class="chatbox-footer">
		<label class="chatbox-input-wrapper">
			<label class="flex-1">
				<input
					bind:value={messageInput}
					placeholder="Type a message..."
					onkeydown={handleKeyPress}
					disabled={chat.isSending}
					class="chatbox-input"
				/>
			</label>

			<div class="chatbox-input-actions">
				<Button size="sm" {color} variant="ghost" onclick={toggleRecording}>
					<Icon icon={Microphone2LinearIcon} />
				</Button>
				<Button size="sm" {color} variant="ghost" onclick={() => fileInput.click()}>
					<Icon icon={Attach24RegularIcon} />
				</Button>
				<input
					type="file"
					bind:this={fileInput}
					onchange={handleFileSelect}
					style="display: none"
				/>
				{#if onCameraCapture}
					<Button size="sm" {color} variant="ghost" onclick={onCameraCapture}>
						<Icon icon={Camera24RegularIcon} />
					</Button>
				{/if}
			</div>

			<Button
				size="sm"
				{color}
				variant={variant === 'outlined' ? 'outlined' : 'solid'}
				onclick={handleSend}
				isDisabled={chat.isSending || !messageInput.trim()}
			>
				<Icon icon={Send24RegularIcon} />
			</Button>
		</label>
	</div>
</div>
