import { Button } from '@/components/form/Button';
import { Label } from '@/components/form/Label';
import { Select } from '@/components/form/Select';
import { AppLayout } from '@/components/ui/AppLayout';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { Table } from '@/components/ui/Table';
import { useUser } from '@/utils/context/user-context';
import { useModal } from '@/utils/hooks/use-modal';
import { supabase } from '@/utils/supabase/supbase-client';
import Head from 'next/head';
import { SyntheticEvent, useEffect, useState } from 'react';

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

const DATE = new Date();

export default function Reviews() {
	const [pageCount, setPageCount] = useState<number>(0);
	const [totalPageCount, setTotalPageCount] = useState<number>(9);
	const [date, setDate] = useState<'Today' | 'This month' | 'Total'>('Total');
	const [data, setData] = useState<data[] | null>(null);
	const { loading, setLoading, error, setError } = useModal();
	const [userId, setUserId] = useState<string>('');
	const [totalDataCount, setTotalDataCount] = useState(0);
	const context = useUser();

	useEffect(() => {
		async function fetchData() {
			try {
				setUserId(context?.user.id!);
				fetchReviews(context?.user.id!);
			} catch (err) {
				setLoading(false);
				setError(true);
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

	// Function to handle change in date
	function handleChange(e: SyntheticEvent) {
		const { value, id } = e.target as HTMLSelectElement;

		if (id === 'date') {
			if (value === 'Today') {
				setDate(value);
			} else if (value === 'This month') {
				setDate(value);
			} else if (value === 'Total') {
				setDate(value);
			}

			// Fetch data for particular date and update table
			try {
				setLoading(true);
				fetchReviews(userId, value);
				setPageCount(0);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		}
	}

	// Function to handle page count and fetch reviews
	function handlePageCount(symbol: '+' | '-') {
		if (symbol === '-') {
			if (pageCount > 0) {
				try {
					setLoading(true);
					fetchReviews(
						userId,
						date,
						(pageCount - 1) * 100,
						100 * pageCount - 1
					);
					setPageCount((pageCount) => pageCount - 1);
				} catch (err) {
					setLoading(false);
					setError(true);
				}
			}
		} else {
			if (pageCount < totalPageCount) {
				try {
					setLoading(true);
					fetchReviews(
						userId,
						date,
						(pageCount + 1) * 100,
						100 * (pageCount + 2) - 1
					);
					setPageCount((pageCount) => pageCount + 1);
				} catch (err) {
					setLoading(false);
					setError(true);
				}
			}
		}
	}

	// Function to fetch reviews from the server based on user id
	async function fetchReviews(
		userId: string,
		date = 'Total',
		start = 0,
		end = 99
	) {
		const dateValue =
			date === 'Today'
				? DATE.toISOString().split('T')[0]
				: date === 'This month'
				? DATE.toISOString().split('-')[0] +
				  '-' +
				  (DATE.getMonth() + 1) +
				  '-' +
				  '01'
				: '2023-01-01';

		// Fetch data from the server
		const { data, error } = await supabase
			.from('review_view')
			.select(
				`created_at, taste, service, ambience, pricing, recommendation, mode_of_visit, feedback`,
				{ count: 'exact' }
			)
			.eq('user_id', userId)
			.gt('created_at', dateValue)
			.range(start, end)
			.order('created_at', {
				ascending: false,
			});

		if (error) throw error;

		const { count, error: countError } = await supabase
			.from('review_view')
			.select(
				`created_at, taste, service, ambience, pricing, recommendation, mode_of_visit, feedback`,
				{ count: 'exact', head: true }
			)
			.eq('user_id', userId)
			.gt('created_at', dateValue);

		if (countError) throw countError;

		setLoading(false);
		setData(data as data[]);

		if (date === 'Total' && count) {
			setTotalDataCount(count);
		}
		// Fetch total number of pages and set total page count
		if (count) {
			setTotalPageCount(Math.floor(count / 100));
		}
	}

	return (
		<AppLayout title='Reviews'>
			<Head>
				<title>Sizzle - Reviews</title>
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
					{(data && data.length > 0) || totalDataCount ? (
						<>
							<div className='mt-2 flex flex-col items-start justify-start space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0'>
								<h3 className=' font-bold text-gray-900'>Filter by</h3>
								<div>
									<div className='flex flex-row items-center justify-center space-x-2'>
										<Label id='date' text='Date' />
										<Select
											value={date}
											onChange={handleChange}
											name='date'
											id='date'
											options={['Today', 'This month', 'Total']}
										/>
									</div>
								</div>
							</div>
							{data && data.length > 0 ? (
								<>
									<Table data={data} page={pageCount} />
									<div className='flex flex-row items-center justify-between space-x-2'>
										<p className='text-sm font-medium text-gray-700'>
											Showing {pageCount + 1} of {totalPageCount + 1} pages
										</p>
										<div className='flex flex-row items-center justify-between space-x-2'>
											<Button
												onClick={() => handlePageCount('-')}
												variant='fit'
												text='&lt;'
											/>
											<Button
												onClick={() => handlePageCount('+')}
												variant='fit'
												text='&gt;'
											/>
										</div>
									</div>
								</>
							) : (
								<div className='flex h-full flex-col items-center justify-center'>
									<p className='font-medium text-gray-600'>
										Oops. You haven{"'"}t collected any reviews for{' '}
										{date.toLowerCase()}. Collect reviews from your customers to
										view them here.
									</p>
								</div>
							)}
						</>
					) : (
						!loading &&
						!error && (
							<div className='flex h-full flex-col items-center justify-center'>
								<p className='font-medium text-gray-600'>
									Oops. You haven{"'"}t collected any reviews yet. Collect
									reviews from your customers to view them here.
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
