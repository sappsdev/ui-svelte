<script lang="ts">
	import type { IconData } from '$lib/display/Icon.svelte';
	import { Attach24RegularIcon, Dismiss24RegularIcon } from '$lib/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type FileWithUrl = {
		file: File;
		name: string;
		size: number;
		url: Promise<string>;
		uploadedAt: number;
	};

	type Props = {
		files?: FileWithUrl[];
		accept?: string;
		multiple?: boolean;
		maxSize?: number;
		class?: string;
		controlClass?: string;
		icon?: IconData;
		variant?: 'primary' | 'secondary' | 'muted' | 'outlined' | 'line';
		size?: 'sm' | 'md' | 'lg';
		name?: string;
		label?: string;
		helpText?: string;
		errorText?: string;
		placeholder?: string;
		disabled?: boolean;
		onchange?: (files: FileWithUrl[]) => void;
		isSolid?: boolean;
	};

	let {
		files = $bindable([]),
		accept,
		multiple = true,
		maxSize,
		class: className,
		controlClass,
		icon,
		variant = 'outlined',
		size = 'md',
		name,
		label,
		helpText,
		errorText,
		placeholder = 'Drag & drop files here or click to select',
		disabled = false,
		onchange,
		isSolid
	}: Props = $props();

	const uid = $props.id();

	let isActive = $state(false);
	let isDragging = $state(false);

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		outlined: 'is-outlined',
		line: 'is-line'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const handleFiles = (fileList: FileList | null) => {
		if (!fileList || disabled) return;

		const newFiles: FileWithUrl[] = Array.from(fileList).map((file) => ({
			file,
			name: file.name,
			size: file.size,
			url: Promise.resolve(URL.createObjectURL(file)),
			uploadedAt: Date.now()
		}));

		files = multiple ? [...files, ...newFiles] : newFiles;
		onchange?.(files);
	};

	const drop = (e: DragEvent) => {
		e.preventDefault();
		isDragging = false;
		handleFiles(e.dataTransfer?.files || null);
	};

	const removeFile = async (index: number) => {
		const fileToRemove = files[index];
		const url = await fileToRemove.url;
		URL.revokeObjectURL(url);
		files = [...files.slice(0, index), ...files.slice(index + 1)];
		onchange?.(files);
	};

	const displaySize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
	};
</script>

<div class={cn('field', className)}>
	{#if label}
		<span class="field-label">{label}</span>
	{/if}

	<label
		for={`${uid}-${name}`}
		class={cn(
			'dropzone-input',
			variantClasses[variant],
			sizeClasses[size],
			isSolid && 'is-solid',
			(isActive || isDragging) && 'is-active',
			disabled && 'is-disabled',
			controlClass
		)}
		class:is-error={errorText}
		ondragover={(e) => {
			e.preventDefault();
			if (!disabled) isDragging = true;
		}}
		ondragleave={() => (isDragging = false)}
		ondrop={drop}
		onmouseenter={() => !disabled && (isActive = true)}
		onmouseleave={() => (isActive = false)}
	>
		<input
			id={`${uid}-${name}`}
			type="file"
			hidden
			{accept}
			{multiple}
			{disabled}
			{name}
			onchange={(e) => handleFiles((e.target as HTMLInputElement).files)}
		/>

		<div class="dropzone-content">
			{#if icon}
				<Icon {icon} class="dropzone-icon" />
			{/if}
			<span class="dropzone-placeholder">{placeholder}</span>
		</div>
	</label>

	{#if files.length > 0}
		<div class="dropzone-files">
			{#each files as fileItem, i (fileItem.name + fileItem.uploadedAt)}
				<div class="dropzone-file">
					<div class="dropzone-file-preview">
						{#await fileItem.url then src}
							{#if fileItem.file.type.startsWith('image/')}
								<img {src} alt={fileItem.name} class="dropzone-file-image" />
							{:else}
								<div class="dropzone-file-icon">
									<Icon icon={Attach24RegularIcon} />
								</div>
							{/if}
						{/await}
					</div>

					<div class="dropzone-file-info">
						<span class="dropzone-file-name">{fileItem.name}</span>
						<span class="dropzone-file-size">{displaySize(fileItem.size)}</span>
					</div>

					<button
						type="button"
						class="dropzone-file-remove"
						onclick={() => removeFile(i)}
						aria-label="Eliminar archivo"
					>
						<Icon icon={Dismiss24RegularIcon} />
					</button>
				</div>
			{/each}
		</div>
	{/if}

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>
			{errorText || helpText}
		</div>
	{/if}
</div>
