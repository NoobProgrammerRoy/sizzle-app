import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

const options = {
	redraw: true,
	responsive: true,
	scales: {
		x: {
			grid: {
				display: false,
			},
		},
	},
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'All reviews',
			font: { family: 'Inter, sans-serif', weight: 'bold', size: 14 },
			color: 'rgb(55, 65, 81)',
		},
	},
};

export function LineChart({ values = [5, 4, 3, 4, 2] }: { values?: number[] }) {
	const labels = values?.map((value, index) => (index + 1).toString());

	const data = {
		labels,
		datasets: [
			{
				fill: true,
				label: 'Rating',
				data: values,
				borderColor: 'rgb(34, 197, 94)',
				backgroundColor: 'rgb(220, 252, 231)',
			},
		],
	};

	return (
		<div className='mx-auto w-full max-w-xl rounded bg-white p-2 shadow md:p-4'>
			<Line options={options} data={data} />
		</div>
	);
}
