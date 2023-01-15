export function Stats({ title, value }: { title: string; value: string }) {
	return (
		<li className='rounded border bg-gray-100 p-4'>
			<h3 className='text-sm font-bold text-gray-700'>{title}</h3>
			<p className='mt-2 overflow-hidden text-right text-4xl font-bold text-gray-900'>
				{value}
			</p>
		</li>
	);
}
