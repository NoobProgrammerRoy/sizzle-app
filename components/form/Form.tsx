import { SyntheticEvent } from 'react';

type form = {
	children: any;
	onSubmit: (e: SyntheticEvent) => Promise<void>;
};

export function Form({ children, onSubmit }: form) {
	return (
		<form
			onSubmit={onSubmit}
			className='w-full max-w-md rounded bg-gray-50 p-4 shadow md:p-8'
		>
			{children}
		</form>
	);
}
