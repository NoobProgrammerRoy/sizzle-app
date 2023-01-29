import { SyntheticEvent } from 'react';

type rating = {
	name: string;
	id: string;
	value: number;
	onChange: (e: SyntheticEvent) => void;
};

export function Rating({ name, id, value, onChange }: rating) {
	const ratings = [1, 2, 3, 4, 5];

	return (
		<div className='flex flex-row items-center justify-center space-x-1 md:space-x-2'>
			{ratings.map((rating, index) => {
				const ratingId = `${id}-${index}`;
				return (
					<label htmlFor={ratingId} key={ratingId}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className={`${
								value >= rating ? 'fill-yellow-300' : ''
							} h-8 w-8 cursor-pointer stroke-gray-500 md:h-10 md:w-10`}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
							/>
						</svg>
						<input
							onChange={onChange}
							className='hidden'
							type='radio'
							value={rating}
							name={name}
							id={ratingId}
							checked={value === rating}
						/>
					</label>
				);
			})}
		</div>
	);
}
