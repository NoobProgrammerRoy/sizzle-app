const headers = [
	'#',
	'Name',
	'Contact',
	'Taste',
	'Service',
	'Ambience',
	'Pricing',
	'Recommendation',
	'Mode of visit',
	'Feedback',
];

export function Table() {
	return (
		<table className='mx-auto overflow-x-auto'>
			<thead className='bg-gray-300 text-sm font-normal text-gray-700'>
				<tr>
					{headers.map((header) => (
						<th key={header} className='p-2 text-start'>
							{header}
						</th>
					))}
				</tr>
			</thead>
			<tbody className='text-gray-200'>
				<tr>
					<td className='p-2 text-gray-500'>1</td>
					<td className='p-2 text-gray-500'>Royston rodrigues</td>
					<td className='p-2 text-gray-500'>1234567890</td>
					<td className='p-2 text-gray-500'>5</td>
					<td className='p-2 text-gray-500'>5</td>
					<td className='p-2 text-gray-500'>5</td>
					<td className='p-2 text-gray-500'>5</td>
					<td className='p-2 text-gray-500'>5</td>
					<td className='p-2 text-gray-500'>Regular customer</td>
					<td className='p-2 text-gray-500'>Great food and service</td>
				</tr>

				<tr>
					<td className='p-2 text-gray-500'>1</td>
					<td className='p-2 text-gray-500'>Royston rodrigues</td>
					<td className='p-2 text-gray-500'>1234567890</td>
					<td className='p-2 text-gray-500'>5</td>
					<td className='p-2 text-gray-500'>5</td>
					<td className='p-2 text-gray-500'>5</td>
					<td className='p-2 text-gray-500'>5</td>
					<td className='p-2 text-gray-500'>5</td>
					<td className='p-2 text-gray-500'>Regular customer</td>
					<td className='p-2 text-gray-500'>Great food and service</td>
				</tr>
			</tbody>
		</table>
	);
}
