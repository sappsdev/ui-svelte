# Candlestick Component

Financial candlestick chart with zoom, scroll, and technical indicators.

## Import

```svelte
import {Candlestick} from 'ui-svelte';
```

## Props

| Prop            | Type                                                       | Default     | Description          |
| --------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `data`          | `CandleData[]`                                             | `[]`        | OHLCV data           |
| `size`          | `'sm' \| 'md' \| 'lg' \| 'xl'`                             | `'md'`      | Chart size           |
| `theme`         | `'default' \| 'tradingview' \| 'dark' \| 'light'`          | `'default'` | Visual theme         |
| `candleStyle`   | `'filled' \| 'hollow' \| 'heikinashi' \| 'line' \| 'area'` | `'filled'`  | Candle style         |
| `gridStyle`     | `'solid' \| 'dashed' \| 'dotted' \| 'none'`                | `'dashed'`  | Grid line style      |
| `bullishColor`  | `Color`                                                    | `'success'` | Up candle color      |
| `bearishColor`  | `Color`                                                    | `'danger'`  | Down candle color    |
| `indicators`    | `Indicator[]`                                              | `[]`        | Technical indicators |
| `hideVolume`    | `boolean`                                                  | `false`     | Hide volume bars     |
| `hideGrid`      | `boolean`                                                  | `false`     | Hide grid            |
| `hideCrosshair` | `boolean`                                                  | `false`     | Hide crosshair       |
| `hideLastPrice` | `boolean`                                                  | `false`     | Hide last price line |
| `disableZoom`   | `boolean`                                                  | `false`     | Disable zoom         |
| `disableScroll` | `boolean`                                                  | `false`     | Disable scroll       |
| `loading`       | `boolean`                                                  | `false`     | Loading state        |

## Types

```typescript
type CandleData = {
	date: string | Date;
	open: number;
	high: number;
	low: number;
	close: number;
	volume?: number;
};

type Indicator =
	| { type: 'sma'; period: number; color?: Color }
	| { type: 'ema'; period: number; color?: Color }
	| { type: 'bollinger'; period: number; stdDev?: number; color?: Color };
```

## Patterns

### Basic

```svelte
<script>
	const data = [
		{ date: '2024-01-01', open: 100, high: 105, low: 98, close: 103, volume: 500000 },
		{ date: '2024-01-02', open: 103, high: 108, low: 102, close: 106, volume: 600000 }
	];
</script>

<Candlestick {data} />
```

### With Indicators

```svelte
<Candlestick
	{data}
	indicators={[
		{ type: 'sma', period: 20, color: 'primary' },
		{ type: 'ema', period: 10, color: 'warning' }
	]}
/>
```

### Heikin-Ashi Style

```svelte
<Candlestick {data} candleStyle="heikinashi" />
```

### Custom Colors

```svelte
<Candlestick {data} bullishColor="info" bearishColor="warning" />
```

## Notes

- Zoom with mouse wheel, scroll by dragging
- Volume displayed below price chart
- Crosshair shows OHLCV on hover
- Supports SMA, EMA, Bollinger Bands indicators
