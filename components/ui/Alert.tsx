type alert = {
	text: string;
	variant: 'success' | 'danger';
};

export function Alert({ text, variant }: alert) {
	return (
		<div
			className={`${
				variant === 'success'
					? 'bg-gren-200 border-green-600 text-green-600'
					: 'border-red-600 bg-red-200 text-red-600'
			} flex flex-row items-center justify-center space-x-2 rounded-sm border py-2 px-4 text-sm`}
		>
			{variant === 'success' && (
				<span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='h-6 w-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</span>
			)}
			{variant === 'danger' && (
				<span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='h-6 w-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</span>
			)}
			<span>{text}</span>
		</div>
	);
}
