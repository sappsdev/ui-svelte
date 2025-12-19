import type { IconData } from "$lib/index.js";

export interface ToastMessage {
	id: string;
	icon?: IconData;
	title?: string;
	description: string;
	duration?: number;
	position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	variant?: 'solid' | 'soft';
	color: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
}

let toastMessages = $state<ToastMessage[]>([]);

const generateId = (): string => {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

const toastShow = (message: Omit<ToastMessage, 'id'> & { id?: string }) => {
	const id = message.id || generateId();

	const newMessage = {
		id,
		title: message.title,
		description: message.description,
		color: message.color || 'info',
		duration: message.duration || 0,
		icon: message.icon,
		position: message.position,
		variant: message.variant || 'soft'
	};

	toastMessages = [...toastMessages, newMessage];

	if (newMessage.duration && newMessage.duration > 0) {
		setTimeout(() => {
			toastClose(id);
		}, newMessage.duration);
	}

	return id;
};

const toastClose = (id: string) => {
	toastMessages = toastMessages.filter((m) => m.id !== id);
};

const toastCloseAll = () => {
	toastMessages = [];
};

export const toast = {
	get messages() {
		return toastMessages;
	},
	show: toastShow,
	close: toastClose,
	closeAll: toastCloseAll
};
