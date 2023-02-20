type card = {
	title: string;
	value: string | number;
	up?: boolean;
	total?: string | number;
};
export function Card({ title, value, up = true, total = 5 }: card) {
	return (
		<div className='mx-auto w-full max-w-sm rounded-sm bg-white p-4 shadow'>
			<div className='mb-4 flex flex-row items-center justify-between'>
				<h4 className='text-sm font-medium text-gray-700'>{title}</h4>
				<span>
					{/* {up ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='h-6 w-6 fill-green-100 stroke-green-600'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='h-6 w-6 fill-red-200 stroke-red-600'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					)} */}
				</span>
			</div>
			<p
				className='truncate text-3xl font-bold text-gray-900'
				title={value.toString()}
			>
				{value} <span className='text-lg text-gray-600'>/ {total}</span>
			</p>
		</div>
	);
}
