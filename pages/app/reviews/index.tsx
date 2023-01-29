import { Button } from '@/components/form/Button';
import { Label } from '@/components/form/Label';
import { Select } from '@/components/form/Select';
import { AppLayout } from '@/components/ui/AppLayout';
import { SyntheticEvent, useState } from 'react';

export default function reviews() {
	const [pageCount, setPageCount] = useState<number>(1);
	const [totalCount, settotalCount] = useState<number>(10);
	const [date, setDate] = useState<'Today' | 'This week' | 'Total'>('Today');

	// Function to handle change in date
	function handleChange(e: SyntheticEvent) {
		const { value, id } = e.target as HTMLSelectElement;

		if (id === 'date') {
			if (value === 'Today') {
				setDate(value);
			} else if (value === 'This week') {
				setDate(value);
			} else if (value === 'Total') {
				setDate(value);
			}
		}
	}

	// Function to handle page count
	function handlePageCount(symbol: '+' | '-') {
		if (symbol === '-') {
			if (pageCount > 1) {
				setPageCount((pageCount) => pageCount - 1);
			}
		} else {
			if (pageCount < totalCount) {
				setPageCount((pageCount) => pageCount + 1);
			}
		}
	}

	return (
		<AppLayout title='Reviews'>
			<div className='mt-2 flex flex-col items-start justify-start space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0'>
				<h3 className='text-lg font-bold text-gray-900'>Filter by</h3>
				<div>
					<div className='flex flex-row items-center justify-center space-x-2'>
						<Label id='date' text='Date' />
						<Select
							value={date}
							onChange={handleChange}
							name='date'
							id='date'
							options={['Today', 'This week', 'Total']}
						/>
					</div>
				</div>
			</div>
			<div className='my-4 w-full overflow-x-auto rounded shadow'>
				<table className='w-full table-fixed rounded '>
					<thead>
						<tr className='bg-gray-200 text-sm'>
							<th className='truncate p-2 text-left'>#</th>
							<th className='truncate p-2 text-left'>Date</th>
							<th className='truncate p-2 text-left'>Taste</th>
							<th className='truncate p-2 text-left'>Service</th>
							<th className='truncate p-2 text-left'>Ambience</th>
							<th className='truncate p-2 text-left'>Pricing</th>
							<th className='truncate p-2 text-left'>Recommendation</th>
							<th className='truncate p-2 text-left'>Mode of visit</th>
						</tr>
					</thead>
					<tbody>
						<tr className='border-b border-gray-300 bg-white text-sm text-gray-700'>
							<td className='p-2'>1</td>
							<td className='p-2'>2023-01-25</td>
							<td className='p-2'>5</td>
							<td className='p-2'>5</td>
							<td className='p-2'>5</td>
							<td className='p-2'>5</td>
							<td className='p-2'>5</td>
							<td className='p-2'>Social media</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='flex flex-row items-center justify-between space-x-2'>
				<p className='text-gray-700'>
					Showing {pageCount} of {totalCount} pages
				</p>
				<div className='flex flex-row items-center justify-between space-x-2'>
					<Button
						onClick={() => handlePageCount('-')}
						variant='fit'
						text='&lt;'
					/>
					<Button
						onClick={() => handlePageCount('+')}
						variant='fit'
						text='&gt;'
					/>
				</div>
			</div>
		</AppLayout>
	);
}
