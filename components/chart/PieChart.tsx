import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type pieChart = {
	value: number | null | string;
	count: number | null;
};

export function PieChart({
	values = [
		{ value: 5, count: 20 },
		{ value: 4, count: 50 },
	],
}: {
	values?: pieChart[] | null;
}) {
	if (!values) {
		return (
			<div className='mx-auto grid w-full max-w-xl content-center justify-items-center rounded bg-white px-4 py-8 shadow lg:py-4 '>
				<p className='text-xs font-medium leading-relaxed text-gray-600 md:text-center md:text-sm'>
					Oops. You haven't collected any reviews for today. Collect reviews
					from your customers to view them here.
				</p>
			</div>
		);
	}

	const options = {
		redraw: true,
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text:
					typeof values[0].value === 'number'
						? "Today's reviews"
						: 'All reviews',
				font: { family: 'Inter, sans-serif', weight: 'bold', size: 14 },
				color: 'rgb(55, 65, 81)',
			},
		},
	};

	const data = {
		labels: values?.map((item) =>
			typeof item.value! === 'number' ? item.value!.toString() : item.value
		),
		datasets: [
			{
				label: 'No. of ratings',
				data: values?.map((item) => item.count),
				backgroundColor: values?.map((item) => {
					if (
						item.value === 5 ||
						item.value === 'Social media and Advertisement'
					) {
						return 'rgb(74, 222, 128)';
					} else if (item.value === 4 || item.value === 'Regular customer') {
						return 'rgb(187, 247, 208)';
					} else if (item.value === 3 || item.value === 'Recommendation') {
						return 'rgb(250, 204, 21)';
					} else if (
						item.value === 2 ||
						item.value === 'Wanted to try a new place'
					) {
						return 'rgb(251, 146, 60)';
					} else {
						return 'rgb(248, 113, 113)';
					}
				}),
				borderColor: values?.map((item) => {
					if (
						item.value === 5 ||
						item.value === 'Social media and Advertisement'
					) {
						return 'rgb(22, 163, 74)';
					} else if (item.value === 4 || item.value === 'Regular customer') {
						return 'rgb(74, 222, 128)';
					} else if (item.value === 3 || item.value === 'Recommendation') {
						return 'rgb(202, 138, 4)';
					} else if (
						item.value === 2 ||
						item.value === 'Wanted to try a new place'
					) {
						return 'rgb(234, 88, 12)';
					} else {
						return 'rgb(220, 38, 38)';
					}
				}),
				borderWidth: 1,
			},
		],
	};

	return (
		<div className='mx-auto w-full max-w-xl rounded bg-white p-2 shadow md:p-4'>
			<div className='mx-auto w-full md:w-1/2'>
				<Pie data={data} options={options} />
			</div>
		</div>
	);
}
