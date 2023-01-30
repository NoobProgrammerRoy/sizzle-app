import { SyntheticEvent } from 'react';

type radio = {
	name: string;
	id: string;
	value: string;
	current: string;
	onChange: (e: SyntheticEvent) => void;
};

export function Radio({ name, id, value, current, onChange }: radio) {
	return (
		<input
			value={value}
			onChange={onChange}
			type='radio'
			name={name}
			id={id}
			checked={value === current}
			required
		/>
	);
}
