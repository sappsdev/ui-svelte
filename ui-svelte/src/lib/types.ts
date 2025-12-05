export interface DatePosition {
	top: number;
	left: number;
	width: string | number;
	origin: string;
}

export interface DateFormatOptions {
	year?: 'numeric' | '2-digit';
	month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
	day?: 'numeric' | '2-digit';
}

export type Scale = (value: number) => number;

export type BandScale = ((value: string) => number) & {
	bandwidth: () => number;
	step: () => number;
};

export interface ChartConfig {
	[key: string]: {
		label: string;
		color: string;
		icon?: string;
	};
}

export interface ChartDataPoint {
	[key: string]: string | number;
}

export interface ChartMargin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

export type ChartData = ChartDataPoint[];

export interface ChartProps {
	data: ChartData;
	config: ChartConfig;
	className?: string;
	width?: number;
	height?: number;
}

export interface BarChartProps extends ChartProps {
	xKey: string;
	yKeys: string[];
	showGrid?: boolean;
	showAxis?: boolean;
	barSpacing?: number;
}

export interface LineChartProps extends ChartProps {
	xKey: string;
	yKeys: string[];
	showGrid?: boolean;
	showAxis?: boolean;
	smooth?: boolean;
	showDots?: boolean;
}

export interface PieChartProps extends ChartProps {
	valueKey: string;
	labelKey: string;
	showLabels?: boolean;
	innerRadius?: number;
}

export interface AreaChartProps extends ChartProps {
	xKey: string;
	yKeys: string[];
	showGrid?: boolean;
	showAxis?: boolean;
	smooth?: boolean;
	stacked?: boolean;
}

export interface DoughnutChartProps extends ChartProps {
	valueKey: string;
	labelKey: string;
	showLabels?: boolean;
	innerRadius?: number;
}
