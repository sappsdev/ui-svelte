<script lang="ts">
	import './layout.css';
	import { Provider } from 'ui-svelte';
	import '@fontsource-variable/montserrat';
	import '../app.css';

	let { children } = $props();
</script>

<Provider>{@render children()}</Provider>
