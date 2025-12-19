<script lang="ts">
	import { IconButton, Button } from '$lib/index.js';
	import { ArrowLeftRegularIcon, ArrowRightRegularIcon } from '$lib/icons/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		page: number;
		totalPages: number;
		onPageChange?: (page: number) => void;
		onPrev?: () => void;
		onNext?: () => void;
		hasPrevPage?: boolean;
		hasNextPage?: boolean;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'ghost';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		align?: 'start' | 'center' | 'end';
		class?: string;
		hidePageNumbers?: boolean;
	};

	let {
		page = 1,
		totalPages = 1,
		onPageChange,
		onPrev,
		onNext,
		hasPrevPage,
		hasNextPage,
		color = 'primary',
		variant = 'solid',
		size = 'md',
		align = 'center',
		class: className,
		hidePageNumbers
	}: Props = $props();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning'
	};

	const aligns = {
		start: 'is-start',
		center: 'is-center',
		end: 'is-end'
	};

	const getPageNumbers = (current: number, total: number): (number | string)[] => {
		const pages: (number | string)[] = [];
		const delta = 1;

		if (total <= 7) {
			for (let i = 1; i <= total; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);
			const start = Math.max(2, current - delta);
			const end = Math.min(total - 1, current + delta);

			if (start > 2) {
				pages.push('...');
			}
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			if (end < total - 1) {
				pages.push('...');
			}
			pages.push(total);
		}
		return pages;
	};

	const pageNumbers = $derived(!hidePageNumbers ? getPageNumbers(page, totalPages) : []);

	const canGoPrev = $derived(hasPrevPage ?? page > 1);
	const canGoNext = $derived(hasNextPage ?? page < totalPages);

	const handlePrev = () => {
		if (onPrev) {
			onPrev();
		} else if (onPageChange && page > 1) {
			onPageChange(page - 1);
		}
	};

	const handleNext = () => {
		if (onNext) {
			onNext();
		} else if (onPageChange && page < totalPages) {
			onPageChange(page + 1);
		}
	};

	const handlePageClick = (pageNum: number) => {
		if (onPageChange) {
			onPageChange(pageNum);
		}
	};

	const alignStyles = {
		start: 'flex-start',
		center: 'center',
		end: 'flex-end'
	};

	let baseClasses = $derived(cn('pagination', colors[color], className));
</script>

<div class={cn('pagination-container', aligns[align])}>
	<div class={baseClasses}>
		<IconButton
			icon={ArrowLeftRegularIcon}
			onclick={handlePrev}
			isDisabled={!canGoPrev}
			{color}
			{variant}
			{size}
			class="pagination-btn pagination-nav"
		/>

		{#if !hidePageNumbers}
			{#each pageNumbers as pageNum}
				{#if pageNum === '...'}
					<span class="pagination-ellipsis">...</span>
				{:else}
					<Button
						onclick={() => handlePageClick(pageNum as number)}
						color={pageNum === page ? color : 'muted'}
						variant={pageNum === page ? variant : 'ghost'}
						{size}
						class="pagination-btn pagination-page"
					>
						{pageNum}
					</Button>
				{/if}
			{/each}
		{/if}

		<IconButton
			icon={ArrowRightRegularIcon}
			onclick={handleNext}
			isDisabled={!canGoNext}
			{color}
			{variant}
			{size}
			class="pagination-btn pagination-nav"
		/>
	</div>
</div>
