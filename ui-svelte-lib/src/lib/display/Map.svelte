<script lang="ts" module>
	export type LatLng = { lat: number; lng: number };

	export type MapMarker = {
		id: string | number;
		position: LatLng;
		label?: string;
		popup?: string;
		icon?: 'default' | 'start' | 'end' | 'waypoint';
	};

	export type RouteInfo = {
		distance: number;
		duration: number;
		geometry: LatLng[];
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';

	type LeafletMap = any;
	type LeafletLayerGroup = any;

	type Props = {
		center?: LatLng;
		zoom?: number;
		markers?: MapMarker[];
		route?: { start: LatLng; end: LatLng } | null;
		routeWaypoints?: LatLng[];
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger';
		height?: string;
		width?: string;
		showControls?: boolean;
		showScale?: boolean;
		showLocationControl?: boolean;
		interactive?: boolean;
		rootClass?: string;
		onMapReady?: (map: LeafletMap) => void;
		onMarkerClick?: (marker: MapMarker) => void;
		onRouteCalculated?: (info: RouteInfo) => void;
		onRouteError?: (error: string) => void;
		onLocationFound?: (location: LatLng) => void;
		onLocationError?: (error: string) => void;
	};

	const {
		center = { lat: 0, lng: 0 },
		zoom = 13,
		markers = [],
		route = null,
		routeWaypoints = [],
		color = 'primary',
		height = '400px',
		width = '100%',
		showControls = true,
		showScale = false,
		showLocationControl = false,
		interactive = true,
		rootClass,
		onMapReady,
		onMarkerClick,
		onRouteCalculated,
		onRouteError,
		onLocationFound,
		onLocationError
	}: Props = $props();

	let mapContainer = $state<HTMLDivElement>();
	let map = $state<LeafletMap | null>(null);
	let isLoading = $state(true);
	let isLocating = $state(false);
	let markerLayer = $state<LeafletLayerGroup | null>(null);
	let routeLayer = $state<LeafletLayerGroup | null>(null);
	let locationMarker = $state<any>(null);
	let locationCircle = $state<any>(null);
	let L: any = $state(null);

	const colorClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger'
	};

	const colorHex: Record<string, string> = {
		primary: '#2563eb',
		secondary: '#db2777',
		muted: '#6b7280',
		success: '#16a34a',
		info: '#0284c7',
		warning: '#ca8a04',
		danger: '#dc2626'
	};

	const createMarkerIcon = (iconType: MapMarker['icon'] = 'default') => {
		const iconColor = colorHex[color];
		const size = iconType === 'start' || iconType === 'end' ? 32 : 24;
		const anchor = size / 2;

		let svgContent = '';
		switch (iconType) {
			case 'start':
				svgContent = `<circle cx="16" cy="16" r="12" fill="${iconColor}" stroke="white" stroke-width="3"/><polygon points="13,11 21,16 13,21" fill="white"/>`;
				break;
			case 'end':
				svgContent = `<circle cx="16" cy="16" r="12" fill="${iconColor}" stroke="white" stroke-width="3"/><rect x="11" y="11" width="10" height="10" rx="2" fill="white"/>`;
				break;
			case 'waypoint':
				svgContent = `<circle cx="12" cy="12" r="8" fill="${iconColor}" stroke="white" stroke-width="2"/>`;
				break;
			default:
				svgContent = `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${iconColor}" stroke="white" stroke-width="1"/>`;
		}

		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${svgContent}</svg>`;
		const iconUrl = `data:image/svg+xml;base64,${btoa(svg)}`;

		return L.icon({
			iconUrl,
			iconSize: [size, size],
			iconAnchor: [anchor, iconType === 'default' ? size : anchor],
			popupAnchor: [0, iconType === 'default' ? -size : -anchor]
		});
	};

	const updateMarkers = () => {
		if (!map || !L) return;

		if (markerLayer) {
			markerLayer.clearLayers();
		} else {
			markerLayer = L.layerGroup().addTo(map);
		}

		markers.forEach((markerData) => {
			const icon = createMarkerIcon(markerData.icon);
			const marker = L.marker([markerData.position.lat, markerData.position.lng], { icon });

			if (markerData.popup || markerData.label) {
				marker.bindPopup(markerData.popup || markerData.label || '');
			}

			if (markerData.label) {
				marker.bindTooltip(markerData.label);
			}

			marker.on('click', () => {
				onMarkerClick?.(markerData);
			});

			markerLayer?.addLayer(marker);
		});
	};

	const calculateRoute = async () => {
		if (!map || !route || !L) return;

		if (routeLayer) {
			routeLayer.clearLayers();
		} else {
			routeLayer = L.layerGroup().addTo(map);
		}

		const waypoints = [route.start, ...routeWaypoints, route.end];

		const coordinates = waypoints.map((wp) => `${wp.lng},${wp.lat}`).join(';');

		const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.code !== 'Ok' || !data.routes?.[0]) {
				throw new Error(data.message || 'Route calculation failed');
			}

			const routeData = data.routes[0];
			const geometry: LatLng[] = routeData.geometry.coordinates.map(
				([lng, lat]: [number, number]) => ({ lat, lng })
			);

			const polyline = L.polyline(
				geometry.map((p) => [p.lat, p.lng]),
				{
					color: colorHex[color],
					weight: 5,
					opacity: 0.8,
					lineCap: 'round',
					lineJoin: 'round'
				}
			);

			routeLayer?.addLayer(polyline);

			const startIcon = createMarkerIcon('start');
			const startMarker = L.marker([route.start.lat, route.start.lng], { icon: startIcon });
			startMarker.bindTooltip('Start');
			routeLayer?.addLayer(startMarker);
			const endIcon = createMarkerIcon('end');
			const endMarker = L.marker([route.end.lat, route.end.lng], { icon: endIcon });
			endMarker.bindTooltip('End');
			routeLayer?.addLayer(endMarker);

			routeWaypoints.forEach((wp, index) => {
				const waypointIcon = createMarkerIcon('waypoint');
				const waypointMarker = L.marker([wp.lat, wp.lng], { icon: waypointIcon });
				waypointMarker.bindTooltip(`Waypoint ${index + 1}`);
				routeLayer?.addLayer(waypointMarker);
			});

			map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

			const routeInfo: RouteInfo = {
				distance: routeData.distance,
				duration: routeData.duration,
				geometry
			};

			onRouteCalculated?.(routeInfo);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Route calculation failed';
			onRouteError?.(errorMessage);
		}
	};

	const loadLeaflet = (): Promise<void> => {
		return new Promise((resolve, reject) => {
			console.log('[Map] Starting Leaflet load...');

			if (typeof window !== 'undefined' && (window as any).L) {
				console.log('[Map] Leaflet already loaded');
				L = (window as any).L;
				resolve();
				return;
			}

			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
			link.crossOrigin = 'anonymous';

			link.onload = () => {
				console.log('[Map] Leaflet CSS loaded');

				const script = document.createElement('script');
				script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
				script.crossOrigin = 'anonymous';
				script.onload = () => {
					console.log('[Map] Leaflet JS loaded');
					L = (window as any).L;
					if (L) {
						console.log('[Map] Leaflet L object available');
						resolve();
					} else {
						console.error('[Map] Leaflet L object not found after script load');
						reject(new Error('Leaflet not available'));
					}
				};
				script.onerror = (e) => {
					console.error('[Map] Failed to load Leaflet JS:', e);
					reject(new Error('Failed to load Leaflet JS'));
				};
				document.head.appendChild(script);
			};

			link.onerror = (e) => {
				console.error('[Map] Failed to load Leaflet CSS:', e);
				reject(new Error('Failed to load Leaflet CSS'));
			};

			document.head.appendChild(link);
		});
	};

	const initMap = async () => {
		console.log('[Map] initMap called, mapContainer:', mapContainer);
		if (!mapContainer) {
			console.error('[Map] mapContainer is null/undefined');
			return;
		}

		console.log(
			'[Map] Container dimensions:',
			mapContainer.offsetWidth,
			'x',
			mapContainer.offsetHeight
		);

		try {
			await loadLeaflet();

			console.log('[Map] Creating map instance...');
			map = L.map(mapContainer, {
				center: [center.lat, center.lng],
				zoom,
				zoomControl: showControls,
				attributionControl: false,
				dragging: interactive,
				scrollWheelZoom: interactive,
				doubleClickZoom: interactive,
				touchZoom: interactive
			});
			console.log('[Map] Map instance created:', map);

			console.log('[Map] Adding tile layer...');
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			if (showScale) {
				L.control.scale().addTo(map);
			}

			setTimeout(() => {
				console.log('[Map] Invalidating size...');
				map?.invalidateSize();
			}, 100);

			isLoading = false;
			console.log('[Map] Map initialization complete');
			onMapReady?.(map);

			updateMarkers();
			if (route) {
				calculateRoute();
			}
		} catch (error) {
			console.error('[Map] Failed to initialize map:', error);
			isLoading = false;
		}
	};

	const locateUser = () => {
		if (!map || !L || !navigator.geolocation) {
			onLocationError?.('Geolocation is not supported by your browser');
			return;
		}

		isLocating = true;

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude: lat, longitude: lng, accuracy } = position.coords;
				const location: LatLng = { lat, lng };

				if (locationMarker) {
					map.removeLayer(locationMarker);
				}
				if (locationCircle) {
					map.removeLayer(locationCircle);
				}

				locationCircle = L.circle([lat, lng], {
					radius: accuracy,
					color: colorHex[color],
					fillColor: colorHex[color],
					fillOpacity: 0.15,
					weight: 2
				}).addTo(map);

				const pulsingIcon = L.divIcon({
					className: 'map-location-marker',
					html: `<div class="map-location-dot" style="--location-color: ${colorHex[color]}"></div>`,
					iconSize: [24, 24],
					iconAnchor: [12, 12]
				});

				locationMarker = L.marker([lat, lng], {
					icon: pulsingIcon,
					zIndexOffset: 1000
				}).addTo(map);

				map.setView([lat, lng], 16);

				isLocating = false;
				onLocationFound?.(location);
			},
			(error) => {
				isLocating = false;
				let errorMessage = 'Unable to retrieve your location';
				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMessage = 'Location permission denied';
						break;
					case error.POSITION_UNAVAILABLE:
						errorMessage = 'Location information unavailable';
						break;
					case error.TIMEOUT:
						errorMessage = 'Location request timed out';
						break;
				}
				onLocationError?.(errorMessage);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0
			}
		);
	};

	onMount(() => {
		initMap();

		return () => {
			if (map) {
				map.remove();
				map = null;
			}
		};
	});

	$effect(() => {
		if (map && L) {
			map.setView([center.lat, center.lng], zoom);
		}
	});

	$effect(() => {
		markers;
		if (map && L) {
			updateMarkers();
		}
	});

	$effect(() => {
		route;
		routeWaypoints;
		if (map && L && route) {
			calculateRoute();
		} else if (map && !route && routeLayer) {
			routeLayer.clearLayers();
		}
	});
</script>

<div
	class={cn('map', colorClasses[color], rootClass)}
	style="--map-height: {height}; --map-width: {width};"
>
	{#if isLoading}
		<div class="map-loading">
			<div class="map-spinner"></div>
		</div>
	{/if}
	<div class="map-container" bind:this={mapContainer}></div>
	{#if showLocationControl && !isLoading}
		<button
			type="button"
			class="map-location-btn"
			class:is-locating={isLocating}
			onclick={locateUser}
			disabled={isLocating}
			title="Find my location"
		>
			{#if isLocating}
				<svg
					class="map-location-spinner"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12" />
				</svg>
			{:else}
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="3" />
					<path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
				</svg>
			{/if}
		</button>
	{/if}
</div>
