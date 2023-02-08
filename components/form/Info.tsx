type info = {
	text: string;
};

export function Info({ text }: info) {
	return (
		<p className='mt-1 flex flex-row items-center justify-start text-xs text-red-600'>
			{/* <span className='mr-1 inline-block h-1 w-1 rounded-full border border-red-600 bg-red-600'></span> */}
			<span>{text}</span>
		</p>
	);
}
