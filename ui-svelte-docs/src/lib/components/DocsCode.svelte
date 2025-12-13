<script lang="ts">
	import { Code } from 'ui-svelte';

	type Props = {
		code: string;
		lang?: string;
	};

	let { code, lang = 'svelte' }: Props = $props();
</script>

<Code {lang} {code} class="span-3" />
