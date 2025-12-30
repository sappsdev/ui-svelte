# Map Component

Interactive map using OpenStreetMap tiles and OSRM for route calculation.

## Import

```svelte
import { Map, type LatLng, type MapMarker } from 'ui-svelte';
```

## Props

| Prop                  | Type                                                                                  | Default              | Description            |
| --------------------- | ------------------------------------------------------------------------------------- | -------------------- | ---------------------- |
| `center`              | `LatLng`                                                                              | `{ lat: 0, lng: 0 }` | Map center coordinates |
| `zoom`                | `number`                                                                              | `13`                 | Initial zoom level     |
| `markers`             | `MapMarker[]`                                                                         | `[]`                 | Array of map markers   |
| `route`               | `{ start: LatLng; end: LatLng } \| null`                                              | `null`               | Route to display       |
| `routeWaypoints`      | `LatLng[]`                                                                            | `[]`                 | Intermediate waypoints |
| `color`               | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'`          | Marker and route color |
| `height`              | `string`                                                                              | `'400px'`            | Map height             |
| `width`               | `string`                                                                              | `'100%'`             | Map width              |
| `showControls`        | `boolean`                                                                             | `true`               | Show zoom controls     |
| `showScale`           | `boolean`                                                                             | `false`              | Show scale indicator   |
| `showLocationControl` | `boolean`                                                                             | `false`              | Show location button   |
| `interactive`         | `boolean`                                                                             | `true`               | Enable pan/zoom        |
| `rootClass`           | `string`                                                                              | -                    | Container classes      |

## Events

| Event               | Type                          | Description              |
| ------------------- | ----------------------------- | ------------------------ |
| `onMapReady`        | `(map: LeafletMap) => void`   | Map instance ready       |
| `onMarkerClick`     | `(marker: MapMarker) => void` | Marker clicked           |
| `onRouteCalculated` | `(info: RouteInfo) => void`   | Route calculated         |
| `onRouteError`      | `(error: string) => void`     | Route calculation failed |
| `onLocationFound`   | `(location: LatLng) => void`  | User location found      |
| `onLocationError`   | `(error: string) => void`     | Location access failed   |

## Types

```typescript
type LatLng = { lat: number; lng: number };

type MapMarker = {
	id: string | number;
	position: LatLng;
	label?: string;
	popup?: string;
	icon?: 'default' | 'start' | 'end' | 'waypoint';
};

type RouteInfo = {
	distance: number; // meters
	duration: number; // seconds
	geometry: LatLng[];
};
```

## Patterns

### Basic Map

```svelte
<Map center={{ lat: 40.7128, lng: -74.006 }} zoom={12} height="400px" />
```

### With Markers

```svelte
<script>
	const markers = [
		{ id: 1, position: { lat: 40.7128, lng: -74.006 }, label: 'NYC' },
		{ id: 2, position: { lat: 40.758, lng: -73.9855 }, label: 'Times Square' }
	];
</script>

<Map center={{ lat: 40.73, lng: -73.99 }} zoom={12} {markers} />
```

### Route Display

```svelte
<Map
	center={{ lat: 40.73, lng: -73.99 }}
	zoom={13}
	route={{
		start: { lat: 40.7128, lng: -74.006 },
		end: { lat: 40.758, lng: -73.9855 }
	}}
	onRouteCalculated={(info) => {
		console.log(`Distance: ${(info.distance / 1000).toFixed(1)} km`);
	}}
/>
```

### Geolocation

```svelte
<Map
	center={{ lat: 40.7128, lng: -74.006 }}
	showLocationControl
	onLocationFound={(loc) => console.log('Found:', loc)}
	onLocationError={(err) => console.error(err)}
/>
```

## Notes

- Uses OpenStreetMap tiles (free, no API key required)
- Route calculation via OSRM public demo server
- Marker icons: `default`, `start`, `end`, `waypoint`
- Geolocation requires user permission
