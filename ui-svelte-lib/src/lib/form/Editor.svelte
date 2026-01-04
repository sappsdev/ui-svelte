<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { Icon, IconButton, type IconData } from '$lib/index.js';

	const BoldIcon: IconData = {
		body: '<path fill="currentColor" d="M6.8 4h4.9c1.2 0 2.3.4 3.2 1.2c.9.8 1.4 2 1.4 3.2c0 1.1-.4 2.1-1.1 2.9c1 .8 1.6 2.1 1.6 3.4c0 1.4-.5 2.6-1.5 3.5c-1 .9-2.3 1.4-3.6 1.4H6.8c-.3 0-.5-.1-.7-.3c-.2-.2-.3-.4-.3-.7V4.7c0-.3.1-.5.3-.7c.2-.2.4-.3.7-.3zm.7 6.3h4.2c.9 0 1.6-.3 2.2-.8c.5-.5.8-1.2.8-1.9c0-.8-.3-1.5-.8-2c-.6-.5-1.4-.8-2.2-.8H7.5v5.5zm0 1.3v5.5h5c.9 0 1.7-.3 2.4-.9c.6-.5 1-1.3 1-2.1c0-.8-.3-1.6-.9-2.1c-.7-.6-1.6-.9-2.5-.9h-5z"/>',
		viewbox: '0 0 24 24'
	};

	const ItalicIcon: IconData = {
		body: '<path fill="currentColor" d="M10 4.75a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5H15.3l-4.6 13h3.55a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5h3.95l4.6-13H10.75a.75.75 0 0 1-.75-.75z"/>',
		viewbox: '0 0 24 24'
	};

	const UnderlineIcon: IconData = {
		body: '<path fill="currentColor" d="M6 4.75a.75.75 0 0 1 1.5 0v6.5a4.5 4.5 0 1 0 9 0v-6.5a.75.75 0 0 1 1.5 0v6.5a6 6 0 0 1-12 0v-6.5zM4.75 19a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H4.75z"/>',
		viewbox: '0 0 24 24'
	};

	const StrikethroughIcon: IconData = {
		body: '<path fill="currentColor" d="M12 3c-2.5 0-4.5 1.5-5.25 3.75a.75.75 0 0 0 1.42.5C8.7 5.65 10.15 4.5 12 4.5c1.6 0 3 .85 3.7 2.15a.75.75 0 0 0 1.32-.7C16.05 4.25 14.15 3 12 3zM3.75 11a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75zm4.78 4.55a.75.75 0 0 0-1.06 1.06c1.17 1.17 2.7 1.89 4.53 1.89c2.5 0 4.5-1.5 5.25-3.75a.75.75 0 0 0-1.42-.5c-.53 1.6-1.98 2.75-3.83 2.75c-1.35 0-2.5-.5-3.47-1.45z"/>',
		viewbox: '0 0 24 24'
	};

	const AlignLeftIcon: IconData = {
		body: '<path fill="currentColor" d="M3.75 4a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75zm0 5a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H3.75zm0 5a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75zm0 5a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H3.75z"/>',
		viewbox: '0 0 24 24'
	};

	const AlignCenterIcon: IconData = {
		body: '<path fill="currentColor" d="M3.75 4a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75zm3 5a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H6.75zm-3 5a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75zm3 5a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H6.75z"/>',
		viewbox: '0 0 24 24'
	};

	const AlignRightIcon: IconData = {
		body: '<path fill="currentColor" d="M3.75 4a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75zm6 5a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H9.75zm-6 5a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75zm6 5a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H9.75z"/>',
		viewbox: '0 0 24 24'
	};

	const AlignJustifyIcon: IconData = {
		body: '<path fill="currentColor" d="M3.75 4a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75zm0 5a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75zm0 5a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75zm0 5a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75z"/>',
		viewbox: '0 0 24 24'
	};

	const ListOrderedIcon: IconData = {
		body: '<path fill="currentColor" d="M3 4.5a.5.5 0 0 0 1 0V3h.5a.5.5 0 0 0 0-1h-1a.5.5 0 0 0-.5.5v2zm5.25-1a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-12zM3 8a.5.5 0 0 1 .4-.49l.1-.01h1a.5.5 0 0 1 .09.99l-.09.01h-.55l.6.75a.5.5 0 0 1 .04.54l-.04.06l-.6.75h.55a.5.5 0 0 1 .09.99l-.09.01h-1a.5.5 0 0 1-.4-.8l.7-.87l-.7-.87A.5.5 0 0 1 3 8zm5.25 3.5a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-12zM3 16.5a.5.5 0 0 0 1 0V15h.5a.5.5 0 0 0 0-1h-1a.5.5 0 0 0-.5.5v.75h-.25a.5.5 0 0 0 0 1H3v.25zm5.25 3a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-12z"/>',
		viewbox: '0 0 24 24'
	};

	const ListUnorderedIcon: IconData = {
		body: '<path fill="currentColor" d="M4 4a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm4.25-.5a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-12zM4 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm4.25-.5a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-12zM4 18a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm4.25-.5a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-12z"/>',
		viewbox: '0 0 24 24'
	};

	const Heading1Icon: IconData = {
		body: '<path fill="currentColor" d="M4.75 4a.75.75 0 0 1 .75.75v5.5h6v-5.5a.75.75 0 0 1 1.5 0v13.5a.75.75 0 0 1-1.5 0v-6.5h-6v6.5a.75.75 0 0 1-1.5 0V4.75A.75.75 0 0 1 4.75 4zm11 3a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0v-9.2l-1.17.78a.75.75 0 1 1-.83-1.25l2.25-1.5a.75.75 0 0 1 .5-.08z"/>',
		viewbox: '0 0 24 24'
	};

	const Heading2Icon: IconData = {
		body: '<path fill="currentColor" d="M4.75 4a.75.75 0 0 1 .75.75v5.5h6v-5.5a.75.75 0 0 1 1.5 0v13.5a.75.75 0 0 1-1.5 0v-6.5h-6v6.5a.75.75 0 0 1-1.5 0V4.75A.75.75 0 0 1 4.75 4zm10.5 3a2.75 2.75 0 0 1 2.75 2.75a.75.75 0 0 1-1.5 0c0-.69-.56-1.25-1.25-1.25s-1.25.56-1.25 1.25c0 .5.22.9.6 1.3l.17.16l3.58 3.19c.57.5.9 1.23.9 2c0 1.52-1.23 2.85-2.75 2.85h-2.25a.75.75 0 0 1 0-1.5h2.25c.69 0 1.25-.59 1.25-1.35c0-.37-.15-.7-.4-.93l-3.58-3.19A3.14 3.14 0 0 1 12.5 9.75A2.75 2.75 0 0 1 15.25 7z"/>',
		viewbox: '0 0 24 24'
	};

	const Heading3Icon: IconData = {
		body: '<path fill="currentColor" d="M4.75 4a.75.75 0 0 1 .75.75v5.5h6v-5.5a.75.75 0 0 1 1.5 0v13.5a.75.75 0 0 1-1.5 0v-6.5h-6v6.5a.75.75 0 0 1-1.5 0V4.75A.75.75 0 0 1 4.75 4zM15.5 7a2.5 2.5 0 0 1 2.5 2.5a.75.75 0 0 1-1.5 0a1 1 0 0 0-2 0c0 .28.11.53.3.71l.12.1l1.08.69a.75.75 0 0 1-.4 1.38l-.1.01h-.68l.15.1c.22.2.53.51.53 1.01a1 1 0 0 0 2 0a.75.75 0 0 1 1.5 0a2.5 2.5 0 0 1-5 0c0-.52.2-1 .52-1.35l.12-.12l-.08-.05a2.5 2.5 0 0 1-.56-3.42A2.5 2.5 0 0 1 15.5 7z"/>',
		viewbox: '0 0 24 24'
	};

	const LinkIcon: IconData = {
		body: '<path fill="currentColor" d="M9.25 7a.75.75 0 0 1 .11 1.492l-.11.008H7a3.5 3.5 0 0 0-.206 6.994L7 15.5h2.25a.75.75 0 0 1 .11 1.492L9.25 17H7a5 5 0 0 1-.25-9.994L7 7h2.25zM17 7a5 5 0 0 1 .25 9.994L17 17h-2.25a.75.75 0 0 1-.11-1.492l.11-.008H17a3.5 3.5 0 0 0 .206-6.994L17 8.5h-2.25a.75.75 0 0 1-.11-1.492L14.75 7H17zM7 11.25h10a.75.75 0 0 1 .102 1.493L17 12.75H7a.75.75 0 0 1-.102-1.493L7 11.25z"/>',
		viewbox: '0 0 24 24'
	};

	const ImageIcon: IconData = {
		body: '<path fill="currentColor" d="M18.75 3A3.25 3.25 0 0 1 22 6.25v11.5A3.25 3.25 0 0 1 18.75 21H5.25A3.25 3.25 0 0 1 2 17.75V6.25A3.25 3.25 0 0 1 5.25 3h13.5zm0 1.5H5.25A1.75 1.75 0 0 0 3.5 6.25v11.5c0 .208.036.408.103.594l5.823-5.701a1.75 1.75 0 0 1 2.33-.103l.118.103l5.822 5.701c.067-.186.103-.386.103-.594V6.25a1.75 1.75 0 0 0-1.75-1.75zm-4.75 3a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5zm0 1.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2z"/>',
		viewbox: '0 0 24 24'
	};

	const QuoteIcon: IconData = {
		body: '<path fill="currentColor" d="M7.5 6A3.5 3.5 0 0 0 4 9.5v.5h1.5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4.5A5 5 0 0 1 6.5 4.5L7 4.3a.75.75 0 0 1 .5 1.41l-.5.17A3.5 3.5 0 0 0 7.5 6zm10 0A3.5 3.5 0 0 0 14 9.5v.5h1.5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4.5a5 5 0 0 1 5-5l.5-.2a.75.75 0 1 1 .5 1.41l-.5.17A3.5 3.5 0 0 0 17.5 6z"/>',
		viewbox: '0 0 24 24'
	};

	const HorizontalRuleIcon: IconData = {
		body: '<path fill="currentColor" d="M3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75z"/>',
		viewbox: '0 0 24 24'
	};

	const UndoIcon: IconData = {
		body: '<path fill="currentColor" d="M7.25 3.5a.75.75 0 0 0-1.228-.577l-5.25 4.25a.75.75 0 0 0 0 1.154l5.25 4.25a.75.75 0 0 0 1.228-.577V9.5h8a4.5 4.5 0 1 1 0 9h-4.5a.75.75 0 0 0 0 1.5h4.5a6 6 0 0 0 0-12h-8V3.5z"/>',
		viewbox: '0 0 24 24'
	};

	const RedoIcon: IconData = {
		body: '<path fill="currentColor" d="M16.75 3.5a.75.75 0 0 1 1.228-.577l5.25 4.25a.75.75 0 0 1 0 1.154l-5.25 4.25a.75.75 0 0 1-1.228-.577V9.5h-8a4.5 4.5 0 1 0 0 9h4.5a.75.75 0 0 1 0 1.5h-4.5a6 6 0 0 1 0-12h8V3.5z"/>',
		viewbox: '0 0 24 24'
	};

	const ClearFormattingIcon: IconData = {
		body: '<path fill="currentColor" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l18.5 18.5a.75.75 0 1 0 1.06-1.06L3.28 2.22zM8.5 4h7.75a.75.75 0 0 1 0 1.5h-3.16l-1.23 2.87l1.14 1.14l1.23-2.87l2.12 1.06l.89-.45L8.5 4zM7.25 19H10l-.64-1.5H7.25a.75.75 0 0 1 0-1.5h.61l-2-2H7.25l2.84 2.84L11.5 14.5h1.61l.64 1.5h1.5L13 12.19l-1.72 1.72L7.25 19z"/>',
		viewbox: '0 0 24 24'
	};

	const CodeIcon: IconData = {
		body: '<path fill="currentColor" d="M8.066 5.152a.75.75 0 0 1 .282 1.022l-5.001 9a.75.75 0 1 1-1.312-.728l5.001-9a.75.75 0 0 1 1.03-.294m7.87-.002a.75.75 0 0 1 1.03.294l5 9a.75.75 0 1 1-1.312.728l-5-9a.75.75 0 0 1 .282-1.022m-6.186.472a.75.75 0 0 1 .528.918l-3 11a.75.75 0 0 1-1.446-.394l3-11a.75.75 0 0 1 .918-.524"/>',
		viewbox: '0 0 24 24'
	};

	type EditorLabels = {
		bold?: string;
		italic?: string;
		underline?: string;
		strikethrough?: string;
		alignLeft?: string;
		alignCenter?: string;
		alignRight?: string;
		justify?: string;
		orderedList?: string;
		unorderedList?: string;
		heading1?: string;
		heading2?: string;
		heading3?: string;
		insertLink?: string;
		insertImage?: string;
		quote?: string;
		code?: string;
		horizontalRule?: string;
		undo?: string;
		redo?: string;
		clearFormatting?: string;
		linkPrompt?: string;
		imagePrompt?: string;
	};

	const defaultLabels: EditorLabels = {
		bold: 'Bold (Ctrl+B)',
		italic: 'Italic (Ctrl+I)',
		underline: 'Underline (Ctrl+U)',
		strikethrough: 'Strikethrough',
		alignLeft: 'Align left',
		alignCenter: 'Align center',
		alignRight: 'Align right',
		justify: 'Justify',
		orderedList: 'Ordered list',
		unorderedList: 'Unordered list',
		heading1: 'Heading 1',
		heading2: 'Heading 2',
		heading3: 'Heading 3',
		insertLink: 'Insert link',
		insertImage: 'Insert image',
		quote: 'Quote',
		code: 'Code',
		horizontalRule: 'Horizontal rule',
		undo: 'Undo (Ctrl+Z)',
		redo: 'Redo (Ctrl+Shift+Z)',
		clearFormatting: 'Clear formatting',
		linkPrompt: 'Enter the link URL:',
		imagePrompt: 'Enter the image URL:'
	};

	type Props = {
		el?: HTMLDivElement;
		value?: string;
		placeholder?: string;
		class?: string;
		controlClass?: string;
		onchange?: (value: string) => void;
		oninput?: (value: string) => void;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'soft' | 'solid' | 'outlined' | 'line';
		size?: 'sm' | 'md' | 'lg';
		name?: string;
		label?: string;
		islabelActive?: boolean;
		helpText?: string;
		errorText?: string;
		minHeight?: string;
		isDisabled?: boolean;
		isReadonly?: boolean;
		hideToolbar?: boolean;
		labels?: EditorLabels;
	};

	let {
		el = $bindable(),
		value = $bindable(''),
		placeholder = '',
		class: className,
		controlClass,
		onchange,
		oninput,
		variant = 'outlined',
		color = 'primary',
		size = 'md',
		name,
		label,
		islabelActive,
		helpText,
		errorText,
		minHeight = '200px',
		isDisabled = false,
		isReadonly = false,
		hideToolbar = false,
		labels: userLabels = {}
	}: Props = $props();

	const labels = $derived({ ...defaultLabels, ...userLabels });

	const uid = $props.id();

	let contentEl: HTMLDivElement;
	let isActive = $state(false);
	let isFocused = $state(false);
	let activeFormats = $state<Set<string>>(new Set());

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning'
	};

	const variants = {
		soft: 'is-soft',
		solid: 'is-solid',
		outlined: 'is-outlined',
		line: 'is-line'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	function execCommand(command: string, value?: string) {
		document.execCommand(command, false, value);
		contentEl?.focus();
		updateActiveFormats();
		handleInput();
	}

	function handleBold() {
		execCommand('bold');
	}

	function handleItalic() {
		execCommand('italic');
	}

	function handleUnderline() {
		execCommand('underline');
	}

	function handleStrikethrough() {
		execCommand('strikeThrough');
	}

	function handleAlignLeft() {
		execCommand('justifyLeft');
	}

	function handleAlignCenter() {
		execCommand('justifyCenter');
	}

	function handleAlignRight() {
		execCommand('justifyRight');
	}

	function handleAlignJustify() {
		execCommand('justifyFull');
	}

	function handleOrderedList() {
		execCommand('insertOrderedList');
	}

	function handleUnorderedList() {
		execCommand('insertUnorderedList');
	}

	function handleHeading(level: number) {
		execCommand('formatBlock', `h${level}`);
	}

	function handleLink() {
		const url = prompt(labels.linkPrompt);
		if (url) {
			execCommand('createLink', url);
		}
	}

	function handleImage() {
		const url = prompt(labels.imagePrompt);
		if (url) {
			execCommand('insertImage', url);
		}
	}

	function handleQuote() {
		execCommand('formatBlock', 'blockquote');
	}

	function handleHorizontalRule() {
		execCommand('insertHorizontalRule');
	}

	function handleCode() {
		execCommand('formatBlock', 'pre');
	}

	function handleUndo() {
		execCommand('undo');
	}

	function handleRedo() {
		execCommand('redo');
	}

	function handleClearFormatting() {
		execCommand('removeFormat');
	}

	function updateActiveFormats() {
		const formats = new Set<string>();

		if (document.queryCommandState('bold')) formats.add('bold');
		if (document.queryCommandState('italic')) formats.add('italic');
		if (document.queryCommandState('underline')) formats.add('underline');
		if (document.queryCommandState('strikeThrough')) formats.add('strikethrough');
		if (document.queryCommandState('insertOrderedList')) formats.add('orderedList');
		if (document.queryCommandState('insertUnorderedList')) formats.add('unorderedList');

		activeFormats = formats;
	}

	function handleInput() {
		if (contentEl) {
			value = contentEl.innerHTML;
			oninput?.(value);
		}
	}

	function handleChange() {
		if (contentEl) {
			value = contentEl.innerHTML;
			onchange?.(value);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.ctrlKey || e.metaKey) {
			switch (e.key.toLowerCase()) {
				case 'b':
					e.preventDefault();
					handleBold();
					break;
				case 'i':
					e.preventDefault();
					handleItalic();
					break;
				case 'u':
					e.preventDefault();
					handleUnderline();
					break;
				case 'z':
					if (e.shiftKey) {
						e.preventDefault();
						handleRedo();
					} else {
						e.preventDefault();
						handleUndo();
					}
					break;
			}
		}
	}

	function handlePaste(e: ClipboardEvent) {
		e.preventDefault();
		const text = e.clipboardData?.getData('text/plain') || '';
		document.execCommand('insertText', false, text);
		handleInput();
	}

	$effect(() => {
		if (contentEl && value !== contentEl.innerHTML) {
			contentEl.innerHTML = value;
		}
	});

	type ToolbarButton = {
		icon: IconData;
		action: () => void;
		title: string;
		formatKey?: string;
	};

	const formattingButtons = $derived<ToolbarButton[]>([
		{ icon: BoldIcon, action: handleBold, title: labels.bold!, formatKey: 'bold' },
		{ icon: ItalicIcon, action: handleItalic, title: labels.italic!, formatKey: 'italic' },
		{
			icon: UnderlineIcon,
			action: handleUnderline,
			title: labels.underline!,
			formatKey: 'underline'
		},
		{
			icon: StrikethroughIcon,
			action: handleStrikethrough,
			title: labels.strikethrough!,
			formatKey: 'strikethrough'
		}
	]);

	const alignmentButtons = $derived<ToolbarButton[]>([
		{ icon: AlignLeftIcon, action: handleAlignLeft, title: labels.alignLeft! },
		{ icon: AlignCenterIcon, action: handleAlignCenter, title: labels.alignCenter! },
		{ icon: AlignRightIcon, action: handleAlignRight, title: labels.alignRight! },
		{ icon: AlignJustifyIcon, action: handleAlignJustify, title: labels.justify! }
	]);

	const listButtons = $derived<ToolbarButton[]>([
		{
			icon: ListOrderedIcon,
			action: handleOrderedList,
			title: labels.orderedList!,
			formatKey: 'orderedList'
		},
		{
			icon: ListUnorderedIcon,
			action: handleUnorderedList,
			title: labels.unorderedList!,
			formatKey: 'unorderedList'
		}
	]);

	const headingButtons = $derived<ToolbarButton[]>([
		{ icon: Heading1Icon, action: () => handleHeading(1), title: labels.heading1! },
		{ icon: Heading2Icon, action: () => handleHeading(2), title: labels.heading2! },
		{ icon: Heading3Icon, action: () => handleHeading(3), title: labels.heading3! }
	]);

	const insertButtons = $derived<ToolbarButton[]>([
		{ icon: LinkIcon, action: handleLink, title: labels.insertLink! },
		{ icon: ImageIcon, action: handleImage, title: labels.insertImage! },
		{ icon: QuoteIcon, action: handleQuote, title: labels.quote! },
		{ icon: CodeIcon, action: handleCode, title: labels.code! },
		{ icon: HorizontalRuleIcon, action: handleHorizontalRule, title: labels.horizontalRule! }
	]);

	const historyButtons = $derived<ToolbarButton[]>([
		{ icon: UndoIcon, action: handleUndo, title: labels.undo! },
		{ icon: RedoIcon, action: handleRedo, title: labels.redo! },
		{ icon: ClearFormattingIcon, action: handleClearFormatting, title: labels.clearFormatting! }
	]);

	const showPlaceholder = $derived(!value || value === '' || value === '<br>');
</script>

<div class={cn('field', className)}>
	{#if label}
		<span class="field-label">{label}</span>
	{/if}

	<div
		bind:this={el}
		role="group"
		class={cn(
			'editor',
			colors[color],
			variants[variant],
			sizeClasses[size],
			(isActive || isFocused) && 'is-active',
			isDisabled && 'is-disabled',
			isReadonly && 'is-readonly',
			controlClass
		)}
		class:is-error={errorText}
		onmouseenter={() => (isActive = true)}
		onmouseleave={() => (isActive = false)}
	>
		{#if !hideToolbar && !isReadonly}
			<div class="editor-toolbar">
				<div class="editor-toolbar-group">
					{#each formattingButtons as btn}
						<button
							type="button"
							class={cn(
								'editor-toolbar-btn',
								activeFormats.has(btn.formatKey || '') && 'is-active'
							)}
							onclick={btn.action}
							title={btn.title}
							disabled={isDisabled}
						>
							<Icon icon={btn.icon} />
						</button>
					{/each}
				</div>

				<div class="editor-toolbar-divider"></div>

				<div class="editor-toolbar-group">
					{#each alignmentButtons as btn}
						<button
							type="button"
							class="editor-toolbar-btn"
							onclick={btn.action}
							title={btn.title}
							disabled={isDisabled}
						>
							<Icon icon={btn.icon} />
						</button>
					{/each}
				</div>

				<div class="editor-toolbar-divider"></div>

				<div class="editor-toolbar-group">
					{#each listButtons as btn}
						<button
							type="button"
							class={cn(
								'editor-toolbar-btn',
								activeFormats.has(btn.formatKey || '') && 'is-active'
							)}
							onclick={btn.action}
							title={btn.title}
							disabled={isDisabled}
						>
							<Icon icon={btn.icon} />
						</button>
					{/each}
				</div>

				<div class="editor-toolbar-divider"></div>

				<div class="editor-toolbar-group">
					{#each headingButtons as btn}
						<button
							type="button"
							class="editor-toolbar-btn"
							onclick={btn.action}
							title={btn.title}
							disabled={isDisabled}
						>
							<Icon icon={btn.icon} />
						</button>
					{/each}
				</div>

				<div class="editor-toolbar-divider"></div>

				<div class="editor-toolbar-group">
					{#each insertButtons as btn}
						<button
							type="button"
							class="editor-toolbar-btn"
							onclick={btn.action}
							title={btn.title}
							disabled={isDisabled}
						>
							<Icon icon={btn.icon} />
						</button>
					{/each}
				</div>

				<div class="editor-toolbar-divider"></div>

				<div class="editor-toolbar-group">
					{#each historyButtons as btn}
						<button
							type="button"
							class="editor-toolbar-btn"
							onclick={btn.action}
							title={btn.title}
							disabled={isDisabled}
						>
							<Icon icon={btn.icon} />
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<div class="editor-content-wrapper">
			{#if showPlaceholder && placeholder}
				<div class="editor-placeholder">{placeholder}</div>
			{/if}
			<div
				bind:this={contentEl}
				id={`${uid}-${name}`}
				class="editor-content"
				style:min-height={minHeight}
				contenteditable={!isDisabled && !isReadonly}
				tabindex="0"
				role="textbox"
				aria-multiline="true"
				aria-placeholder={placeholder}
				oninput={handleInput}
				onblur={handleChange}
				onfocusin={() => {
					isFocused = true;
					updateActiveFormats();
				}}
				onfocusout={() => (isFocused = false)}
				onkeydown={handleKeydown}
				onkeyup={updateActiveFormats}
				onmouseup={updateActiveFormats}
				onpaste={handlePaste}
			></div>
		</div>
	</div>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>
			{errorText || helpText}
		</div>
	{/if}
</div>
