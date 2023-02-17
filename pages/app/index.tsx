import { Card } from '@/components/card/Card';
import { AppLayout } from '@/components/ui/AppLayout';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { useUser } from '@/utils/context/user-context';
import { formatRating } from '@/utils/helpers/format-rating';
import { useModal } from '@/utils/hooks/use-modal';
import { supabase } from '@/utils/supabase/supbase-client';
import Head from 'next/head';
import { useEffect, useState } from 'react';

type data = {
	ambience_today: number | null;
	ambience_total: number | null;
	ambience_week: number | null;
	count_today: number | null;
	count_total: number | null;
	count_week: number | null;
	pricing_today: number | null;
	pricing_total: number | null;
	pricing_week: number | null;
	recommendation_today: number | null;
	recommendation_total: number | null;
	recommendation_week: number | null;
	service_today: number | null;
	service_total: number | null;
	service_week: number | null;
	taste_today: number | null;
	taste_total: number | null;
	taste_week: number | null;
} | null;

export default function App() {
	const { loading, setLoading, error, setError } = useModal();
	const [data, setData] = useState<data>(null);
	const context = useUser();

	useEffect(() => {
		async function fetchData() {
			try {
				// Fetch restaurant data from the server
				const { data, error: dataError } = await supabase
					.rpc('fetch_restaurant_data_based_on_user_id', {
						id: context?.user.id,
					})
					.single();

				if (dataError) throw dataError;

				setData(data as data);
			} catch (err) {
				setError(true);
			} finally {
				setLoading(false);
			}
		}

		setLoading(true);
		if (context?.user.user) {
			fetchData();
		}

		return () => {
			setLoading(false);
			setError(false);
		};
	}, []);
	return (
		<AppLayout title='Home'>
			<Head>
				<title>Sizzle - Home</title>
				<meta
					name='description'
					content='Sizzle allows you to supercharge your restaurant using the power
							of data. Collect reviews from your customers through our platform
							and analyze customer sentiment and data to grow your business.'
				/>
				<link rel='shortcut icon' href='logo.svg' type='image/x-icon' />
			</Head>
			{loading ? (
				<Loader />
			) : (
				<>
					{data && data!.count_total ? (
						<>
							<section className=' mt-2 mb-8 '>
								<h3 className='mb-2 font-bold text-gray-900'>Reviews</h3>
								<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
									<Card
										title='Total'
										value={data.count_total}
										total={data.count_total}
									/>
									<Card
										title='Today'
										value={data.count_today ? data.count_today : '-'}
										total={data.count_total}
									/>
									<Card
										title='This Week'
										value={data.count_week ? data.count_week : '-'}
										total={data.count_total}
									/>
								</div>
							</section>
							<section className=' mt-2 mb-8 '>
								<h3 className='mb-2 font-bold text-gray-900'>
									Average Overall Rating
								</h3>
								<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
									<Card
										title='Total'
										value={formatRating(
											(data.taste_total! +
												data.service_total! +
												data.ambience_total! +
												data.pricing_total! +
												data.recommendation_total!) /
												5
										)}
									/>
									<Card
										title='Today'
										value={
											data.count_today
												? formatRating(
														(data.taste_today! +
															data.service_today! +
															data.ambience_today! +
															data.pricing_today! +
															data.recommendation_today!) /
															5
												  )
												: '-'
										}
									/>
									<Card
										title='This Week'
										value={
											data.count_week
												? formatRating(
														(data.taste_week! +
															data.service_week! +
															data.ambience_week! +
															data.pricing_week! +
															data.recommendation_week!) /
															5
												  )
												: '-'
										}
									/>
								</div>
							</section>
							<section className=' mt-2 mb-8 '>
								<h3 className='mb-2 font-bold text-gray-900'>
									Average Taste Rating
								</h3>
								<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
									<Card title='Total' value={formatRating(data.taste_total!)} />
									<Card
										title='Today'
										value={
											data.taste_today ? formatRating(data.taste_today) : '-'
										}
									/>
									<Card
										title='This Week'
										value={
											data.taste_week ? formatRating(data.taste_week) : '-'
										}
									/>
								</div>
							</section>
							<section className=' mt-2 mb-8 '>
								<h3 className='mb-2 font-bold text-gray-900'>
									Average Service Rating
								</h3>
								<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
									<Card
										title='Total'
										value={formatRating(data.service_total!)}
									/>
									<Card
										title='Today'
										value={
											data.service_today
												? formatRating(data.service_today)
												: '-'
										}
									/>
									<Card
										title='This Week'
										value={
											data.service_week ? formatRating(data.service_week) : '-'
										}
									/>
								</div>
							</section>
							<section className=' mt-2 mb-8 '>
								<h3 className='mb-2 font-bold text-gray-900'>
									Average Ambience Rating
								</h3>
								<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
									<Card
										title='Total'
										value={formatRating(data.ambience_total!)}
									/>
									<Card
										title='Today'
										value={
											data.ambience_today
												? formatRating(data.ambience_today)
												: '-'
										}
									/>
									<Card
										title='This Week'
										value={
											data.ambience_week
												? formatRating(data.ambience_week)
												: '-'
										}
									/>
								</div>
							</section>
							<section className=' mt-2 mb-8 '>
								<h3 className='mb-2 font-bold text-gray-900'>
									Average Pricing Rating
								</h3>
								<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
									<Card
										title='Total'
										value={formatRating(data.pricing_total!)}
									/>
									<Card
										title='Today'
										value={
											data.pricing_today
												? formatRating(data.pricing_today)
												: '-'
										}
									/>
									<Card
										title='This Week'
										value={
											data.pricing_week ? formatRating(data.pricing_week) : '-'
										}
									/>
								</div>
							</section>
							<section className=' mt-2 mb-8 '>
								<h3 className='mb-2 font-bold text-gray-900'>
									Average Recommendation Rating
								</h3>
								<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
									<Card
										title='Total'
										value={formatRating(data.recommendation_total!)}
									/>
									<Card
										title='Today'
										value={
											data.recommendation_today
												? formatRating(data.recommendation_today)
												: '-'
										}
									/>
									<Card
										title='This Week'
										value={
											data.recommendation_week
												? formatRating(data.recommendation_week)
												: '-'
										}
									/>
								</div>
							</section>
						</>
					) : (
						!error && (
							<div className='flex h-full flex-col items-center justify-center'>
								<p className='font-medium text-gray-600'>
									Oops. You haven't collected any reviews yet. Collect reviews
									from your customers to view them here.
								</p>
							</div>
						)
					)}
				</>
			)}
			{error && (
				<Modal
					status='error'
					message='An error has occured. Please try again later.'
				/>
			)}
		</AppLayout>
	);
}
