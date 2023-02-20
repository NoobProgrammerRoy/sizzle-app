type button = {
	text: string;
	variant: 'full' | 'fit';
	onClick?: () => void;
};

export function Button({ text, variant, onClick }: button) {
	return (
		<button
			onClick={onClick}
			className={`${
				variant === 'full' ? 'w-full' : 'w-fit'
			} block rounded-sm bg-gradient-to-r from-green-600 to-green-400 px-4 py-2 text-sm font-medium text-gray-50`}
		>
			{text}
		</button>
	);
}
