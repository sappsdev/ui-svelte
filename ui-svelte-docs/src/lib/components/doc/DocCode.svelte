<script lang="ts">
	import { Code, Section } from 'ui-svelte';

	type Props = {
		code: string;
	};

	let { code }: Props = $props();
</script>

<Section>
	<Code lang="svelte" {code} showCopy showLang />
</Section>
