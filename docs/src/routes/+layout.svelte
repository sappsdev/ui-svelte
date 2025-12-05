<script lang="ts">
	import { Provider } from 'ui-svelte';
	import '@fontsource-variable/montserrat';
	import '../app.css';
	import { storeApp } from '$lib/store/store.svelte';
	let { children } = $props();
</script>

<Provider
	toastPosition={storeApp.toastPosition}
	toastIcon={storeApp.toastIcon}
	toastSolid={storeApp.toastSolid}
>
	{@render children()}
</Provider>
