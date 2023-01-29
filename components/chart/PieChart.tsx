import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
	redraw: true,
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: "Today's reviews",
			font: { family: 'Inter, sans-serif', weight: 'bold', size: 14 },
			color: 'rgb(55, 65, 81)',
		},
	},
};

type pieChart = {
	value: number;
	count: number;
};

export function PieChart({
	values = [
		{ value: 5, count: 20 },
		{ value: 4, count: 50 },
	],
}: {
	values?: pieChart[];
}) {
	const data = {
		labels: values?.map((item) => item.value.toString()),
		datasets: [
			{
				label: 'No. of ratings',
				data: values?.map((item) => item.count),
				backgroundColor: values?.map((item) => {
					if (item.value === 5) {
						return 'rgb(74, 222, 128)';
					} else if (item.value === 4) {
						return 'rgb(187, 247, 208)';
					} else if (item.value === 3) {
						return 'rgb(250, 204, 21)';
					} else if (item.value === 2) {
						return 'rgb(251, 146, 60)';
					} else {
						return 'rgb(248, 113, 113)';
					}
				}),
				borderColor: values?.map((item) => {
					if (item.value === 5) {
						return 'rgb(22, 163, 74)';
					} else if (item.value === 4) {
						return 'rgb(74, 222, 128)';
					} else if (item.value === 3) {
						return 'rgb(202, 138, 4)';
					} else if (item.value === 2) {
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
