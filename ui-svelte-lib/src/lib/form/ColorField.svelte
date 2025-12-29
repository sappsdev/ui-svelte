<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';
	import { Code } from '$lib/index.js';

	type Props = {
		hex?: string;
		rgb?: string;
		cmyk?: string;
		oklch?: string;
		foreground?: string;
		onHex?: (value: string) => void;
		onRgb?: (value: string) => void;
		onCmyk?: (value: string) => void;
		onOklch?: (value: string) => void;
		onForeground?: (value: string) => void;
		showHex?: boolean;
		showRgb?: boolean;
		showCmyk?: boolean;
		showOklch?: boolean;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'line';
		size?: 'sm' | 'md' | 'lg';
		name?: string;
		rootClass?: string;
		label?: string;
		isFloatLabel?: boolean;
		helpText?: string;
		errorText?: string;
		placeholder?: string;
	};

	let {
		hex = $bindable('#3b82f6'),
		rgb = $bindable('rgb(59, 130, 246)'),
		cmyk = $bindable('cmyk(76%, 47%, 0%, 4%)'),
		oklch = $bindable('oklch(0.62 0.21 255)'),
		foreground = $bindable('#ffffff'),
		onHex,
		onRgb,
		onCmyk,
		onOklch,
		onForeground,
		showHex = false,
		showRgb = false,
		showCmyk = false,
		showOklch = false,
		variant = 'outlined',
		color = 'muted',
		size = 'md',
		name,
		rootClass,
		label,
		isFloatLabel,
		helpText,
		errorText,
		placeholder = 'Select color'
	}: Props = $props();

	let isOpen = $state(false);
	let controlElement = $state<HTMLElement>();
	let popoverEl = $state<HTMLElement>();
	let canvasEl = $state<HTMLCanvasElement>();
	let hueSliderEl = $state<HTMLElement>();

	let isActive = $state(false);
	let isFocused = $state(false);

	let hue = $state(220);
	let saturation = $state(75);
	let brightness = $state(96);
	let alpha = $state(1);

	let isDraggingCanvas = $state(false);
	let isDraggingHue = $state(false);

	let position = $state({
		top: 0,
		left: 0,
		isBottomHalf: false
	});

	const style = $derived(
		`top: ${position.top}px; left: ${position.left}px; transform-origin: ${position.isBottomHalf ? 'bottom' : 'top'} center;`
	);

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
		solid: 'is-solid',
		soft: 'is-soft',
		outlined: 'is-outlined',
		line: 'is-line'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
		s /= 100;
		v /= 100;
		const c = v * s;
		const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
		const m = v - c;

		let r = 0,
			g = 0,
			b = 0;

		if (h >= 0 && h < 60) {
			r = c;
			g = x;
			b = 0;
		} else if (h >= 60 && h < 120) {
			r = x;
			g = c;
			b = 0;
		} else if (h >= 120 && h < 180) {
			r = 0;
			g = c;
			b = x;
		} else if (h >= 180 && h < 240) {
			r = 0;
			g = x;
			b = c;
		} else if (h >= 240 && h < 300) {
			r = x;
			g = 0;
			b = c;
		} else {
			r = c;
			g = 0;
			b = x;
		}

		return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
	}

	function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
		r /= 255;
		g /= 255;
		b /= 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const d = max - min;

		let h = 0;
		const s = max === 0 ? 0 : d / max;
		const v = max;

		if (d !== 0) {
			switch (max) {
				case r:
					h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
					break;
				case g:
					h = ((b - r) / d + 2) * 60;
					break;
				case b:
					h = ((r - g) / d + 4) * 60;
					break;
			}
		}

		return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
	}

	function rgbToHex(r: number, g: number, b: number): string {
		return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
	}

	function hexToRgb(hexColor: string): [number, number, number] | null {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
		return result
			? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
			: null;
	}

	function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
		r /= 255;
		g /= 255;
		b /= 255;

		const k = 1 - Math.max(r, g, b);
		if (k === 1) return [0, 0, 0, 100];

		const c = (1 - r - k) / (1 - k);
		const m = (1 - g - k) / (1 - k);
		const y = (1 - b - k) / (1 - k);

		return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
	}

	function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
		const linearize = (c: number) => {
			c /= 255;
			return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
		};

		const lr = linearize(r);
		const lg = linearize(g);
		const lb = linearize(b);

		const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
		const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
		const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

		const l = Math.cbrt(l_);
		const m = Math.cbrt(m_);
		const s = Math.cbrt(s_);

		const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
		const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
		const bVal = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

		const C = Math.sqrt(a * a + bVal * bVal);
		let H = (Math.atan2(bVal, a) * 180) / Math.PI;
		if (H < 0) H += 360;

		return [parseFloat(L.toFixed(2)), parseFloat(C.toFixed(2)), Math.round(H)];
	}

	function getContrastColor(hexColor: string): string {
		const rgbValues = hexToRgb(hexColor);
		if (!rgbValues) return '#000000';

		const [r, g, b] = rgbValues;
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return luminance > 0.5 ? '#000000' : '#ffffff';
	}

	function updateAllFormats() {
		const [r, g, b] = hsvToRgb(hue, saturation, brightness);

		hex = rgbToHex(r, g, b);
		rgb = `rgb(${r}, ${g}, ${b})`;

		const [c, m, y, k] = rgbToCmyk(r, g, b);
		cmyk = `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;

		const [l, ch, h] = rgbToOklch(r, g, b);
		oklch = `oklch(${l} ${ch} ${h})`;

		foreground = getContrastColor(hex);

		onHex?.(hex);
		onRgb?.(rgb);
		onCmyk?.(cmyk);
		onOklch?.(oklch);
		onForeground?.(foreground);
	}

	function parseHexAndUpdateHsv(hexValue: string) {
		const rgbValues = hexToRgb(hexValue);
		if (rgbValues) {
			const [r, g, b] = rgbValues;
			const [h, s, v] = rgbToHsv(r, g, b);
			hue = h;
			saturation = s;
			brightness = v;
		}
	}

	function drawCanvas() {
		if (!canvasEl) return;
		const ctx = canvasEl.getContext('2d');
		if (!ctx) return;

		const width = canvasEl.width;
		const height = canvasEl.height;

		const baseColor = `hsl(${hue}, 100%, 50%)`;

		const whiteGradient = ctx.createLinearGradient(0, 0, width, 0);
		whiteGradient.addColorStop(0, 'white');
		whiteGradient.addColorStop(1, baseColor);

		ctx.fillStyle = whiteGradient;
		ctx.fillRect(0, 0, width, height);

		const blackGradient = ctx.createLinearGradient(0, 0, 0, height);
		blackGradient.addColorStop(0, 'transparent');
		blackGradient.addColorStop(1, 'black');

		ctx.fillStyle = blackGradient;
		ctx.fillRect(0, 0, width, height);
	}

	const updatePosition = () => {
		if (!controlElement || !popoverEl) return;

		const rect = controlElement.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		const popoverHeight = popoverEl.getBoundingClientRect().height;
		const isBottomHalf = rect.top + rect.height / 2 > windowHeight / 2;

		const top = isBottomHalf ? rect.top - popoverHeight - 8 : rect.top + rect.height;
		position = {
			top: top,
			left: rect.left + window.scrollX,
			isBottomHalf
		};
	};

	const togglePopover = () => {
		if (!isOpen) {
			parseHexAndUpdateHsv(hex);
			startEventListeners();
			updatePosition();
			isOpen = true;
			requestAnimationFrame(() => {
				drawCanvas();
			});
		} else {
			stopEventListeners();
			isOpen = false;
		}
	};

	const handleClickOutside = (event: Event) => {
		if (
			isOpen &&
			!controlElement?.contains(event.target as Node) &&
			!popoverEl?.contains(event.target as Node)
		) {
			isOpen = false;
			stopEventListeners();
		}
	};

	const handleCanvasMouseDown = (event: MouseEvent) => {
		isDraggingCanvas = true;
		updateCanvasFromEvent(event);
	};

	const handleCanvasMouseMove = (event: MouseEvent) => {
		if (!isDraggingCanvas) return;
		updateCanvasFromEvent(event);
	};

	const handleCanvasMouseUp = () => {
		isDraggingCanvas = false;
	};

	const updateCanvasFromEvent = (event: MouseEvent) => {
		if (!canvasEl) return;
		const rect = canvasEl.getBoundingClientRect();
		const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
		const y = Math.max(0, Math.min(event.clientY - rect.top, rect.height));

		saturation = Math.round((x / rect.width) * 100);
		brightness = Math.round(100 - (y / rect.height) * 100);
		updateAllFormats();
	};

	const handleHueMouseDown = (event: MouseEvent) => {
		isDraggingHue = true;
		updateHueFromEvent(event);
	};

	const handleHueMouseMove = (event: MouseEvent) => {
		if (!isDraggingHue) return;
		updateHueFromEvent(event);
	};

	const handleHueMouseUp = () => {
		isDraggingHue = false;
	};

	const updateHueFromEvent = (event: MouseEvent) => {
		if (!hueSliderEl) return;
		const rect = hueSliderEl.getBoundingClientRect();
		const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
		hue = Math.round((x / rect.width) * 360);
		updateAllFormats();
		drawCanvas();
	};

	const handleGlobalMouseUp = () => {
		isDraggingCanvas = false;
		isDraggingHue = false;
	};

	const handleGlobalMouseMove = (event: MouseEvent) => {
		if (isDraggingCanvas) {
			updateCanvasFromEvent(event);
		} else if (isDraggingHue) {
			updateHueFromEvent(event);
		}
	};

	const startEventListeners = () => {
		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition, true);
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('mouseup', handleGlobalMouseUp);
		document.addEventListener('mousemove', handleGlobalMouseMove);
	};

	const stopEventListeners = () => {
		window.removeEventListener('resize', updatePosition);
		window.removeEventListener('scroll', updatePosition, true);
		document.removeEventListener('click', handleClickOutside);
		document.removeEventListener('mouseup', handleGlobalMouseUp);
		document.removeEventListener('mousemove', handleGlobalMouseMove);
	};

	$effect(() => {
		if (isOpen && canvasEl) {
			drawCanvas();
		}
	});

	onMount(() => {
		parseHexAndUpdateHsv(hex);
		updateAllFormats();
		return () => stopEventListeners();
	});

	const cursorX = $derived((saturation / 100) * 100);
	const cursorY = $derived(100 - (brightness / 100) * 100);
	const hueThumbPosition = $derived((hue / 360) * 100);
</script>

<div class={cn('field', rootClass)}>
	<input type="text" {name} bind:value={hex} hidden />

	{#if !isFloatLabel && label}
		<div class="field-label">{label}</div>
	{/if}

	<button
		type="button"
		bind:this={controlElement}
		class={cn(
			'control',
			colors[color],
			variants[variant],
			sizeClasses[size],
			isFloatLabel && 'is-float',
			(isActive || isFocused) && 'is-active'
		)}
		class:is-error={errorText}
		onclick={togglePopover}
		onmouseenter={() => (isActive = true)}
		onmouseleave={() => (isActive = false)}
	>
		{#if isFloatLabel && label}
			<span
				class={cn('control-label', (isActive || isFocused || isOpen || hex !== '') && 'is-active')}
			>
				{label}
			</span>
		{/if}

		<span class={cn('color-field-swatch', sizeClasses[size])} style="background-color: {hex};"
		></span>

		<div class="control-selected">
			{#if hex}
				<span class="color-field-value">{hex}</span>
			{:else if isFloatLabel}
				{#if isActive || isOpen}
					{placeholder}
				{/if}
			{:else}
				{placeholder}
			{/if}
		</div>
	</button>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>{errorText || helpText}</div>
	{/if}

	<div class:is-active={isOpen} class="color-picker-popover" bind:this={popoverEl} {style}>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="color-picker-canvas-wrapper"
			onmousedown={handleCanvasMouseDown}
			onmousemove={handleCanvasMouseMove}
			onmouseup={handleCanvasMouseUp}
		>
			<canvas bind:this={canvasEl} class="color-picker-canvas" width="240" height="140"></canvas>
			<div
				class="color-picker-cursor"
				style="left: {cursorX}%; top: {cursorY}%; background-color: {hex};"
			></div>
		</div>

		<div class="color-picker-slider-wrapper">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				bind:this={hueSliderEl}
				class="color-picker-slider color-picker-hue"
				onmousedown={handleHueMouseDown}
				onmousemove={handleHueMouseMove}
				onmouseup={handleHueMouseUp}
			>
				<div class="color-picker-slider-thumb" style="left: {hueThumbPosition}%;"></div>
			</div>
		</div>

		<div class="color-picker-preview">
			<div class="color-picker-preview-swatch relative">
				<div class="color-picker-preview-color" style="background-color: {hex};"></div>
			</div>
			<div class="color-picker-preview-info">
				<span class="color-picker-preview-hex">{hex}</span>
				<span class="color-picker-preview-foreground">Foreground: {foreground}</span>
			</div>
		</div>

		{#if showHex || showRgb || showCmyk || showOklch}
			<div class="color-picker-values">
				{#if showHex}
					<Code code={`hex: ${hex}`} copyContent={hex} lang="css" hideLang />
				{/if}
				{#if showRgb}
					<Code code={`rgb: ${rgb}`} copyContent={rgb} lang="css" hideLang />
				{/if}
				{#if showCmyk}
					<Code code={`cmyk: ${cmyk}`} copyContent={cmyk} lang="css" hideLang />
				{/if}
				{#if showOklch}
					<Code code={`oklch: ${oklch}`} copyContent={oklch} lang="css" hideLang />
				{/if}
			</div>
		{/if}
	</div>
</div>
