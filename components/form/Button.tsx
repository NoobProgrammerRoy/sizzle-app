type button = {
	text: string;
	variant: 'full' | 'fit';
};

export function Button({ text, variant }: button) {
	return (
		<button
			className={`${
				variant === 'full' ? 'w-full' : 'w-fit'
			} block rounded bg-gradient-to-r from-green-600 to-green-400 px-4 py-2 text-sm text-gray-50`}
		>
			{text}
		</button>
	);
}
