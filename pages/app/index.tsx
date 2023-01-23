import { Card } from '@/components/card/Card';
import { AppLayout } from '@/components/ui/AppLayout';

export default function app() {
	return (
		<AppLayout title='Home'>
			<section className=' mt-2 mb-8 '>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>Reviews</h3>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
					<Card title='Total' value={100} />
					<Card title='Today' value={20} />
					<Card title='This Week' value={20} />
				</div>
			</section>
			<section className=' mt-2 mb-8 '>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>Average Rating</h3>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
					<Card title='Total' value={4} />
					<Card title='Today' value={4.5} />
					<Card title='This Week' value={4.25} />
				</div>
			</section>
			<section className=' mt-2 mb-8 '>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>Taste Rating</h3>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
					<Card title='Total' value={4} />
					<Card title='Today' value={4.5} />
					<Card title='This Week' value={4.25} />
				</div>
			</section>
			<section className=' mt-2 mb-8 '>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>Service Rating</h3>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
					<Card title='Total' value={4} />
					<Card title='Today' value={4.5} />
					<Card title='This Week' value={4.25} />
				</div>
			</section>
			<section className=' mt-2 mb-8 '>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>
					Ambience Rating
				</h3>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
					<Card title='Total' value={4} />
					<Card title='Today' value={4.5} />
					<Card title='This Week' value={4.25} />
				</div>
			</section>
			<section className=' mt-2 mb-8 '>
				<h3 className='mb-2 text-lg font-bold text-gray-900'>Pricing Rating</h3>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
					<Card title='Total' value={4} />
					<Card title='Today' value={4.5} />
					<Card title='This Week' value={4.25} />
				</div>
			</section>
		</AppLayout>
	);
}
