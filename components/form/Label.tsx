type label = {
	id: string;
	text: string;
};

export function Label({ id, text }: label) {
	return (
		<label className='block text-sm font-medium text-gray-900' htmlFor={id}>
			{text}
		</label>
	);
}
