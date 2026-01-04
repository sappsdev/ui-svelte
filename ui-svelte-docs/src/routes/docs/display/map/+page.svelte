<script lang="ts">
	import {
		Map,
		Card,
		Checkbox,
		Code,
		Section,
		Select,
		type LatLng,
		type MapMarker
	} from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	let color: any = $state('primary');
	let showControls = $state(true);
	let showScale = $state(false);
	let showLocationControl = $state(true);
	let interactive = $state(true);
	let showMarkers = $state(true);
	let showRoute = $state(false);
	let locationMessage = $state<string | null>(null);

	// Default center (New York City)
	const defaultCenter: LatLng = { lat: 40.7128, lng: -74.006 };

	const demoMarkers: MapMarker[] = [
		{ id: 1, position: { lat: 40.7128, lng: -74.006 }, label: 'New York', popup: 'The Big Apple' },
		{ id: 2, position: { lat: 40.758, lng: -73.9855 }, label: 'Times Square' },
		{ id: 3, position: { lat: 40.6892, lng: -74.0445 }, label: 'Statue of Liberty' }
	];

	const routeStart: LatLng = { lat: 40.7128, lng: -74.006 };
	const routeEnd: LatLng = { lat: 40.758, lng: -73.9855 };

	let routeInfo = $state<{ distance: number; duration: number } | null>(null);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Map } from 'ui-svelte';`,
			showMarkers && `\n\tconst markers = [`,
			showMarkers && `\t\t{ id: 1, position: { lat: 40.7128, lng: -74.006 }, label: 'New York' },`,
			showMarkers &&
				`\t\t{ id: 2, position: { lat: 40.758, lng: -73.9855 }, label: 'Times Square' }`,
			showMarkers && `\t];`,
			showRoute && `\n\tconst route = {`,
			showRoute && `\t\tstart: { lat: 40.7128, lng: -74.006 },`,
			showRoute && `\t\tend: { lat: 40.758, lng: -73.9855 }`,
			showRoute && `\t};`,
			showRoute && `\n\tfunction handleRouteCalculated(info) {`,
			showRoute && `\t\tconsole.log(\`Distance: \${(info.distance / 1000).toFixed(1)} km\`);`,
			showRoute && `\t}`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Map`,
			`\tcenter={{ lat: 40.7128, lng: -74.006 }}`,
			`\tzoom={12}`,
			color !== 'primary' && `\tcolor="${color}"`,
			showMarkers && `\tmarkers={markers}`,
			showRoute && `\troute={route}`,
			showRoute && `\tonRouteCalculated={handleRouteCalculated}`,
			!showControls && `\tshowControls={false}`,
			showScale && `\tshowScale`,
			showLocationControl && `\tshowLocationControl`,
			showLocationControl && `\tonLocationFound={(loc) => console.log('Location:', loc)}`,
			!interactive && `\tinteractive={false}`,
			`\theight="400px"`,
			`/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'center', type: 'LatLng', initial: '{ lat: 0, lng: 0 }' },
		{ prop: 'zoom', type: 'number', initial: '13' },
		{ prop: 'markers', type: 'MapMarker[]', initial: '[]' },
		{ prop: 'route', type: '{ start: LatLng; end: LatLng } | null', initial: 'null' },
		{ prop: 'routeWaypoints', type: 'LatLng[]', initial: '[]' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{ prop: 'height', type: 'string', initial: '400px' },
		{ prop: 'width', type: 'string', initial: '100%' },
		{ prop: 'showControls', type: 'boolean', initial: 'true' },
		{ prop: 'showScale', type: 'boolean', initial: 'false' },
		{ prop: 'showLocationControl', type: 'boolean', initial: 'false' },
		{ prop: 'interactive', type: 'boolean', initial: 'true' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'onMapReady', type: '(map: LeafletMap) => void', initial: '' },
		{ prop: 'onMarkerClick', type: '(marker: MapMarker) => void', initial: '' },
		{ prop: 'onRouteCalculated', type: '(info: RouteInfo) => void', initial: '' },
		{ prop: 'onRouteError', type: '(error: string) => void', initial: '' },
		{ prop: 'onLocationFound', type: '(location: LatLng) => void', initial: '' },
		{ prop: 'onLocationError', type: '(error: string) => void', initial: '' }
	];

	const types = [
		{
			name: 'LatLng',
			definition: '{ lat: number; lng: number }'
		},
		{
			name: 'MapMarker',
			definition: `{
  id: string | number;
  position: LatLng;
  label?: string;
  popup?: string;
  icon?: 'default' | 'start' | 'end' | 'waypoint';
}`
		},
		{
			name: 'RouteInfo',
			definition: `{
  distance: number; // meters
  duration: number; // seconds
  geometry: LatLng[];
}`
		}
	];
</script>

<DocsHeader title="Map" llmUrl="https://ui-svelte.sappsdev.com/llm/display/map.md">
	Interactive map component using OpenStreetMap tiles and OSRM for route calculation.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={showControls} label="Controls" />
			<Checkbox bind:checked={showScale} label="Scale" />
			<Checkbox bind:checked={showLocationControl} label="Location" />
			<Checkbox bind:checked={interactive} label="Interactive" />
			<Checkbox bind:checked={showMarkers} label="Markers" />
			<Checkbox bind:checked={showRoute} label="Route" />
		</div>

		<div class="doc-preview">
			<Map
				center={defaultCenter}
				zoom={12}
				{color}
				{showControls}
				{showScale}
				{showLocationControl}
				{interactive}
				markers={showMarkers ? demoMarkers : []}
				route={showRoute ? { start: routeStart, end: routeEnd } : null}
				height="400px"
				onRouteCalculated={(info) => (routeInfo = info)}
				onLocationFound={(loc) =>
					(locationMessage = `Found: ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`)}
				onLocationError={(err) => (locationMessage = `Error: ${err}`)}
			/>
			{#if showRoute && routeInfo}
				<div class="mt-2 text-sm text-on-surface/70">
					Distance: {(routeInfo.distance / 1000).toFixed(1)} km | Duration: {Math.round(
						routeInfo.duration / 60
					)} min
				</div>
			{/if}
			{#if locationMessage}
				<div class="mt-2 text-sm text-on-surface/70">{locationMessage}</div>
			{/if}
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card color="background" variant="outlined">
		<div class="grid-2 md:grid-3 gap-4">
			{#each colorOptions as item}
				<div class="column gap-1">
					<span class="text-sm font-medium">{item.label}</span>
					<Map
						center={defaultCenter}
						zoom={11}
						color={item.id as any}
						height="200px"
						showControls={false}
						markers={[{ id: 1, position: defaultCenter, label: item.label }]}
					/>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Route Calculation</p>
	<Card color="background" variant="outlined">
		<p class="text-sm text-on-surface/70 mb-4">
			The Map component uses <a
				href="https://project-osrm.org/"
				target="_blank"
				class="text-primary underline">OSRM</a
			>
			for route calculation. Provide a <code>route</code> prop with <code>start</code> and
			<code>end</code> coordinates to display a route.
		</p>
		<Map
			center={{ lat: 40.73, lng: -73.99 }}
			zoom={13}
			color="success"
			height="350px"
			route={{ start: { lat: 40.7128, lng: -74.006 }, end: { lat: 40.758, lng: -73.9855 } }}
			onRouteCalculated={(info) => console.log('Route:', info)}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Markers</p>
	<Card color="background" variant="outlined">
		<p class="text-sm text-on-surface/70 mb-4">
			Add markers using the <code>markers</code> prop. Each marker can have a label, popup, and custom
			icon type.
		</p>
		<Map
			center={defaultCenter}
			zoom={11}
			height="350px"
			markers={[
				{ id: 1, position: { lat: 40.7128, lng: -74.006 }, label: 'Default', icon: 'default' },
				{ id: 2, position: { lat: 40.73, lng: -73.99 }, label: 'Start', icon: 'start' },
				{ id: 3, position: { lat: 40.75, lng: -74.02 }, label: 'End', icon: 'end' },
				{ id: 4, position: { lat: 40.72, lng: -74.03 }, label: 'Waypoint', icon: 'waypoint' }
			]}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Geolocation</p>
	<Card color="background" variant="outlined">
		<p class="text-sm text-on-surface/70 mb-4">
			Enable the <code>showLocationControl</code> prop to display a "Find my location" button. Click it
			to center the map on your current location with a pulsing marker and accuracy circle.
		</p>
		<Map
			center={defaultCenter}
			zoom={12}
			color="info"
			height="350px"
			showLocationControl
			onLocationFound={(loc) => console.log('Location found:', loc)}
			onLocationError={(err) => console.error('Location error:', err)}
		/>
		<Code
			lang="svelte"
			code={`<Map
  center={{ lat: 40.7128, lng: -74.006 }}
  showLocationControl
  onLocationFound={(loc) => console.log('Found:', loc)}
  onLocationError={(err) => console.error(err)}
/>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Types</p>
	<Card color="background" variant="outlined">
		<div class="column gap-4">
			{#each types as type}
				<div>
					<p class="font-mono text-sm font-semibold text-primary mb-1">{type.name}</p>
					<Code lang="typescript" code={type.definition} />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
