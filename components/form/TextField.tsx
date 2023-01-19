import { SyntheticEvent } from 'react';

type textField = {
	value: string;
	onChange: (e: SyntheticEvent) => void;
	type: 'email' | 'text' | 'password';
	name: string;
	id: string;
	placeholder: string;
	required: boolean;
};

export function TextField({
	value,
	onChange,
	type,
	name,
	id,
	placeholder,
	required,
}: textField) {
	return (
		<input
			className='block w-full rounded border border-gray-300 p-2 text-sm text-gray-700 outline-none valid:border-green-500 focus:valid:border-green-500 focus:invalid:border-red-500'
			value={value}
			onChange={onChange}
			type={type}
			name={name}
			id={id}
			placeholder={placeholder}
			required={required}
		/>
	);
}
