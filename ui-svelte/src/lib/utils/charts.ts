import type { BandScale, ChartMargin, Scale } from '$lib/types.js';

export function calculateDomain(data: any[], key: string): [number, number] {
	const values = data.map((d) => Number(d[key])).filter((v) => !isNaN(v));
	if (values.length === 0) return [0, 1];

	const min = Math.min(...values);
	const max = Math.max(...values);

	const padding = (max - min) * 0.1;
	return [Math.min(0, min - padding), max + padding];
}

export function createLinearScale(domain: [number, number], range: [number, number]): Scale {
	const [domainMin, domainMax] = domain;
	const [rangeMin, rangeMax] = range;

	return (value: number) => {
		if (domainMax === domainMin) return rangeMin;
		const ratio = (value - domainMin) / (domainMax - domainMin);
		return rangeMin + ratio * (rangeMax - rangeMin);
	};
}

export function createBandScale(
	domain: string[],
	range: [number, number],
	padding = 0.1
): BandScale {
	const [rangeMin, rangeMax] = range;
	const rangeSize = rangeMax - rangeMin;
	const step = rangeSize / domain.length;
	const bandwidth = step * (1 - padding);
	const paddingOuter = (step * padding) / 2;

	const scale = (value: string) => {
		const index = domain.indexOf(value);
		return rangeMin + paddingOuter + index * step;
	};

	scale.bandwidth = () => bandwidth;
	scale.step = () => step;

	return scale as BandScale;
}

export const DEFAULT_MARGIN: ChartMargin = {
	top: 20,
	right: 30,
	bottom: 40,
	left: 40
};

export function getChartDimensions(
	width: number,
	height: number,
	margin: ChartMargin
): { width: number; height: number } {
	return {
		width: width - margin.left - margin.right,
		height: height - margin.top - margin.bottom
	};
}

export function generateGridLines(
	domain: [number, number],
	scale: Scale,
	count = 5
): Array<{ value: number; position: number }> {
	const [min, max] = domain;
	return Array.from({ length: count + 1 }, (_, i) => {
		const value = min + ((max - min) * i) / count;
		return {
			value,
			position: scale(value)
		};
	});
}

export function polarToCartesian(
	centerX: number,
	centerY: number,
	radius: number,
	angleInDegrees: number
): { x: number; y: number } {
	const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians)
	};
}

export function createArcPath(
	centerX: number,
	centerY: number,
	radius: number,
	startAngle: number,
	endAngle: number,
	innerRadius = 0
): string {
	const start = polarToCartesian(centerX, centerY, radius, endAngle);
	const end = polarToCartesian(centerX, centerY, radius, startAngle);
	const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

	if (innerRadius > 0) {
		// Donut/doughnut chart
		const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
		const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);

		return [
			'M',
			start.x,
			start.y,
			'A',
			radius,
			radius,
			0,
			largeArcFlag,
			0,
			end.x,
			end.y,
			'L',
			innerEnd.x,
			innerEnd.y,
			'A',
			innerRadius,
			innerRadius,
			0,
			largeArcFlag,
			1,
			innerStart.x,
			innerStart.y,
			'Z'
		].join(' ');
	} else {
		return [
			'M',
			centerX,
			centerY,
			'L',
			start.x,
			start.y,
			'A',
			radius,
			radius,
			0,
			largeArcFlag,
			0,
			end.x,
			end.y,
			'Z'
		].join(' ');
	}
}

export function createSmoothPath(points: Array<{ x: number; y: number }>): string {
	if (points.length === 0) return '';
	if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

	let path = `M ${points[0].x} ${points[0].y}`;

	for (let i = 1; i < points.length; i++) {
		const prev = points[i - 1];
		const curr = points[i];
		const controlPointX = (prev.x + curr.x) / 2;

		path += ` Q ${controlPointX} ${prev.y} ${curr.x} ${curr.y}`;
	}

	return path;
}

export function createLinearPath(points: Array<{ x: number; y: number }>): string {
	if (points.length === 0) return '';

	return points
		.map((point, i) => (i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`))
		.join(' ');
}

export function generateColors(count: number): string[] {
	return Array.from({ length: count }, (_, i) => `hsl(${(i * 360) / count}, 70%, 50%)`);
}
