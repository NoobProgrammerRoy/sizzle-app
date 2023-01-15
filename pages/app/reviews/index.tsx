import { Layout } from '@/components/app/layout/Layout';
import { Table } from '@/components/app/table/Table';
import { useState } from 'react';

export default function ReviewsAppPage() {
	const [pageCount, setPageCount] = useState<number>(0);

	return (
		<Layout title={'Reviews'}>
			{/* All reviews */}
			<div className='mb-4 flex flex-row items-center justify-end space-x-2'>
				<p className='mr-auto text-base'>Displaying 100 out of 1000 reviews</p>

				<button className='rounded bg-red-500 p-2 text-sm text-gray-100 hover:bg-red-600'>
					Prev
				</button>
				<button className='rounded bg-red-500 p-2 text-sm text-gray-100 hover:bg-red-600'>
					Next
				</button>
			</div>
			<Table />
		</Layout>
	);
}
