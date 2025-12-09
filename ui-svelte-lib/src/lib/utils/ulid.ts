const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateULID = (): string => {
	const timestamp = Date.now();
	const timestampPart = encodeTime(timestamp);
	const randomPart = encodeRandom();

	return timestampPart + randomPart;
};

function encodeTime(timestamp: number): string {
	const encoded = new Array(10);

	for (let i = 9; i >= 0; i--) {
		encoded[i] = CHARSET[timestamp & 31];
		timestamp = Math.floor(timestamp / 32);
	}

	return encoded.join('');
}

function encodeRandom(): string {
	const encoded = new Array(16);

	for (let i = 0; i < 16; i++) {
		encoded[i] = CHARSET[Math.floor(Math.random() * 32)];
	}

	return encoded.join('');
}
