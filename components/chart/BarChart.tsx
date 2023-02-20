import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
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
		y: {
			grid: {
				display: false,
			},
			ticks: {
				callback: (val: string | number, index: number) =>
					index % 2 == 0 ? val.toString() : '',
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

type barChart = {
	value: number | null;
	count: number | null;
};

export function BarChart({
	values = [
		{ value: 5, count: 20 },
		{ value: 3, count: 10 },
		{ value: 1, count: 25 },
	],
}: {
	values?: barChart[];
}) {
	const data = {
		labels: [1, 2, 3, 4, 5],
		datasets: [
			{
				label: 'No. of ratings',
				data: getChartData(values),
				backgroundColor: 'rgb(34, 197, 94)',
				barPercentage: 0.5,
			},
		],
	};

	return (
		<div className='mx-auto w-full max-w-xl rounded-sm bg-white p-2 shadow md:p-4'>
			<Bar options={options} data={data} />
		</div>
	);
}

function getChartData(values: barChart[]) {
	const data = [];

	const _values = values.map((item) => item.value);

	if (_values.includes(1)) {
		data.push(values.filter((item) => item.value === 1)[0].count);
	} else {
		data.push(0);
	}
	if (_values.includes(2)) {
		data.push(values.filter((item) => item.value === 2)[0].count);
	} else {
		data.push(0);
	}
	if (_values.includes(3)) {
		data.push(values.filter((item) => item.value === 3)[0].count);
	} else {
		data.push(0);
	}
	if (_values.includes(4)) {
		data.push(values.filter((item) => item.value === 4)[0].count);
	} else {
		data.push(0);
	}
	if (_values.includes(5)) {
		data.push(values.filter((item) => item.value === 5)[0].count);
	} else {
		data.push(0);
	}

	return data;
}
