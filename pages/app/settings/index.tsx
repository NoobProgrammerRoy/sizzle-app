import { Layout } from '@/components/app/layout/Layout';
import { restaurantDetailsSchema } from '@/utils/types/restaurant-details';
import { SyntheticEvent, useState } from 'react';
import { z } from 'zod';

export default function ReviewsAppPage() {
	const [form, setForm] = useState<z.infer<typeof restaurantDetailsSchema>>({
		name: '',
		description: '',
		contact: '',
	});
	const [error, setError] = useState<boolean>(false);

	// Function to handle form submission
	function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();
		const result = restaurantDetailsSchema.safeParse(form);

		if (result.success) {
			// Submit data to the server and update the restaurant details
		} else {
			setError(true);
		}
	}

	return (
		<Layout title={'Settings'}>
			<form onSubmit={handleSubmit} className='mx-auto max-w-2xl'>
				<label className='mb-1 block text-sm' htmlFor='name'>
					Restaurant name
				</label>
				<input
					className=' mb-4 block w-full rounded border border-gray-300 p-2 text-sm focus:border-gray-500'
					type='text'
					id='name'
					placeholder='Restaurant name'
				/>
				<label className='mb-1 block text-sm' htmlFor='description'>
					Restaurant description
				</label>
				<input
					className=' mb-4 block w-full rounded border border-gray-300 p-2 text-sm focus:border-gray-500'
					type='text'
					id='description'
					placeholder='Restaurant description'
				/>
				<label className='mb-1 block text-sm' htmlFor='contact'>
					Contact number
				</label>
				<input
					className='mb-4 block w-full rounded border border-gray-300 p-2 text-sm focus:border-gray-500'
					type='text'
					id='contact'
					placeholder='Contact number'
				/>
				{error && (
					<p className='mb-4 text-xs font-bold text-red-600'>
						Please enter valid details
					</p>
				)}
				<button className=' ml-auto block rounded bg-red-500 px-4 py-2 text-sm text-gray-100 transition-colors hover:bg-red-600'>
					Update details
				</button>
			</form>
		</Layout>
	);
}
