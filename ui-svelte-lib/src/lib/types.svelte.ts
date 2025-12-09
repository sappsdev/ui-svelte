import type { IconData } from './display/Icon.svelte';

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

export type { IconData };
