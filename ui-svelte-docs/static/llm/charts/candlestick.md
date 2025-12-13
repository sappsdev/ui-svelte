## Candlestick Component

Professional candlestick chart for financial data with interactive features.

```svelte
<Candlestick
  data={[{ date: '2024-01-01', open: 100, high: 110, low: 95, close: 105, volume: 1000000 }]}
  size="md"
  theme="default"
  candleStyle="filled"
  scaleType="linear"
  showVolume
  showGrid
  showCrosshair
  showLastPrice
  bullishColor="success"
  bearishColor="danger"
  indicators={[{ type: 'sma', period: 20, color: 'info' }]}
  enableZoom
  enableScroll
  onClick={(candle, i) => {}}
/>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `data` | `[]` | Array of `CandleData` objects |
| `size` | `'md'` | `sm` `md` `lg` `xl` |
| `theme` | `'default'` | `default` `tradingview` `dark` `light` |
| `candleStyle` | `'filled'` | `filled` `hollow` `heikinashi` `line` `area` |
| `scaleType` | `'linear'` | `linear` `log` |
| `gridStyle` | `'dashed'` | `solid` `dashed` `dotted` `none` |
| `showVolume` | `false` | Show volume bars |
| `showGrid` | `false` | Show grid lines |
| `showCrosshair` | `false` | Show crosshair on hover |
| `showLastPrice` | `false` | Show current price line |
| `bullishColor` | `'success'` | Color for up candles |
| `bearishColor` | `'danger'` | Color for down candles |
| `indicators` | `[]` | Technical indicators array |
| `enableZoom` | `false` | Ctrl/Cmd + scroll to zoom |
| `enableScroll` | `false` | Drag to scroll |
| `onClick` | - | Click handler `(candle, index) => void` |
| `priceFormatter` | - | Custom price format |

### CandleData Type

| Prop | Required | Description |
|------|----------|-------------|
| `date` | ✓ | Date string or Date object |
| `open` | ✓ | Opening price |
| `high` | ✓ | Highest price |
| `low` | ✓ | Lowest price |
| `close` | ✓ | Closing price |
| `volume` | - | Trading volume |

### Indicator Type

| Prop | Required | Description |
|------|----------|-------------|
| `type` | ✓ | `sma` `ema` `bollinger` |
| `period` | ✓ | Calculation period |
| `color` | - | Line color |
| `stdDev` | - | Standard deviation (bollinger) |

### Examples

```svelte
<!-- Basic -->
<Candlestick data={priceData} />

<!-- With Volume -->
<Candlestick data={priceData} showVolume />

<!-- Heikin-Ashi -->
<Candlestick data={priceData} candleStyle="heikinashi" />

<!-- TradingView Theme -->
<Candlestick data={priceData} theme="tradingview" size="lg" />

<!-- With Indicators -->
<Candlestick
  data={priceData}
  indicators={[
    { type: 'sma', period: 20, color: 'info' },
    { type: 'ema', period: 12, color: 'warning' },
    { type: 'bollinger', period: 20, color: 'secondary' }
  ]}
/>

<!-- Line Chart -->
<Candlestick data={priceData} candleStyle="line" />

<!-- Logarithmic Scale -->
<Candlestick data={priceData} scaleType="log" />
```

**For LLMs**: Use `data` array with OHLCV structure. Use `candleStyle` for presentation (filled, hollow, heikinashi, line, area). Use `indicators` for overlays (SMA, EMA, Bollinger). Use `theme` for color schemes (tradingview for dark trading style).
