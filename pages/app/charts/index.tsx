import { LineChart } from '@/components/chart/LineChart';
import { PieChart } from '@/components/chart/PieChart';
import { AppLayout } from '@/components/ui/AppLayout';

export default function charts() {
	return (
		<AppLayout title='Charts'>
			<div className='mt-2 mb-8'>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>Taste</h3>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					<PieChart />
					<LineChart />
				</div>
			</div>
			<div className='mt-2 mb-8'>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>Service</h3>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					<PieChart />
					<LineChart />
				</div>
			</div>
			<div className='mt-2 mb-8'>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>Ambience</h3>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					<PieChart />
					<LineChart />
				</div>
			</div>
			<div className='mt-2 mb-8'>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>Pricing</h3>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					<PieChart />
					<LineChart />
				</div>
			</div>
			<div className='mt-2 mb-8'>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>Recommendation</h3>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					<PieChart />
					<LineChart />
				</div>
			</div>
			<div className='mt-2 mb-8'>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>Mode of visit</h3>
				<div className='grid grid-cols-1 gap-4'>
					<PieChart />
				</div>
			</div>
		</AppLayout>
	);
}
