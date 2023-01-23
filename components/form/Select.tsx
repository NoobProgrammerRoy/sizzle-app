import { SyntheticEvent } from 'react';

type select = {
	value: number | string;
	onChange: (e: SyntheticEvent) => void;
	name: string;
	id: string;
	options: number[] | string[];
};

export function Select({ value, onChange, name, id, options }: select) {
	return (
		<select
			className='rounded border border-gray-300 bg-white p-1 text-sm text-gray-700'
			name={name}
			id={id}
			value={value}
			onChange={onChange}
		>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}
