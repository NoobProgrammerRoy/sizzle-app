type data = {
	created_at: any;
	taste: any;
	service: any;
	ambience: any;
	pricing: any;
	recommendation: any;
	mode_of_visit: any;
	feedback: any;
};

export function Table({ data, page }: { data: data[]; page: number }) {
	return (
		<div className='my-4 w-full overflow-x-auto rounded shadow'>
			<table className='w-[300%] table-fixed rounded md:w-[200%] lg:w-full'>
				<thead>
					<tr className='bg-green-600 text-sm'>
						<th className='truncate p-2 text-left font-medium text-gray-50'>
							#
						</th>
						<th className='truncate p-2 text-left font-medium text-gray-50'>
							Date
						</th>
						<th className='truncate p-2 text-left font-medium text-gray-50'>
							Taste
						</th>
						<th className='truncate p-2 text-left font-medium text-gray-50'>
							Service
						</th>
						<th className='truncate p-2 text-left font-medium text-gray-50'>
							Ambience
						</th>
						<th className='truncate p-2 text-left font-medium text-gray-50'>
							Pricing
						</th>
						<th className='truncate p-2 text-left font-medium text-gray-50'>
							Recommendation
						</th>
						<th className='truncate p-2 text-left font-medium text-gray-50'>
							Mode of visit
						</th>
						<th className='truncate p-2 text-left font-medium text-gray-50'>
							Feedback
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr
							key={index}
							className={`${
								index % 2 === 0 ? 'bg-white' : 'bg-green-50'
							} text-sm text-gray-700`}
						>
							<td title={(index + 1).toString()} className='p-2'>
								{page * 100 + index + 1}
							</td>
							<td
								title={item.created_at.split('T')[0].toString()}
								className='p-2'
							>
								{item.created_at.split('T')[0]}
							</td>
							<td title={item.taste.toString()} className='p-2'>
								{item.taste}
							</td>
							<td title={item.service.toString()} className='p-2'>
								{item.service}
							</td>
							<td title={item.ambience.toString()} className='p-2'>
								{item.ambience}
							</td>
							<td title={item.pricing.toString()} className='p-2'>
								{item.pricing}
							</td>
							<td title={item.recommendation.toString()} className='p-2'>
								{item.recommendation}
							</td>
							<td
								title={item.mode_of_visit.toString()}
								className='truncate p-2'
							>
								{item.mode_of_visit}
							</td>
							<td title={item.feedback.toString()} className='truncate p-2'>
								{item.feedback}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
