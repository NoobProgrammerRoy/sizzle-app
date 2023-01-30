type info = {
	text: string;
};

export function Info({ text }: info) {
	return (
		<p className='mt-1 text-xs text-gray-600'>
			<span className='mr-1 inline-block h-2 w-2 rounded-full border border-red-200 bg-red-600'></span>
			{text}
		</p>
	);
}
