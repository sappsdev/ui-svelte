<script lang="ts">
	type Props = {
		texts: string[];
		typeSpeed?: number;
		deleteSpeed?: number;
		afterTyped?: number;
		afterDeleted?: number;
		repeat?: boolean;
	};
	let {
		texts,
		typeSpeed = 100,
		deleteSpeed = 50,
		afterTyped = 1000,
		afterDeleted = 500,
		repeat = true
	}: Props = $props();

	let caret: HTMLSpanElement;
	let textDisplayed = $state(' ');
</script>

<span>{textDisplayed}<span bind:this={caret}>|</span></span>
