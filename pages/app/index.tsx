import { Layout } from '@/components/app/layout/Layout';
import { Stats } from '@/components/app/stats/Stats';
import { Table } from '@/components/app/table/Table';

export default function AppPage() {
	return (
		<Layout title={'Home'}>
			{/* Stats */}
			<ul className='grid grid-cols-1 gap-4 md:grid-cols-3'>
				<Stats title='Total reviews' value='1000' />
				<Stats title='Reviews today' value='1000' />
				<Stats title='Reviews this week' value='1000' />
				<Stats title='Average review this week' value='1000' />
				<Stats title='Average taste this week' value='1000' />
				<Stats title='Average service this week' value='1000' />
				<Stats title='Average ambience this week' value='1000' />
				<Stats title='Average pricing this week' value='1000' />
				<Stats title='Average recommendation this week' value='1000' />
			</ul>
			{/* Latest reviews */}
			<h2 className='mt-8 mb-4 text-xl'>Latest Reviews</h2>
			<Table />
		</Layout>
	);
}
