import { BarChart } from '@/components/chart/BarChart';
import { PieChart } from '@/components/chart/PieChart';
import { AppLayout } from '@/components/ui/AppLayout';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { useUser } from '@/utils/context/user-context';
import { useModal } from '@/utils/hooks/use-modal';
import { supabase } from '@/utils/supabase/supbase-client';
import Head from 'next/head';
import { useEffect, useState } from 'react';

type data = {
	ambience: number | null;
	count_ambience: number | null;
	count_pricing: number | null;
	count_recommendation: number | null;
	count_service: number | null;
	count_taste: number | null;
	pricing: number | null;
	recommendation: number | null;
	service: number | null;
	taste: number | null;
	mode: string | null;
	count_mode: number | null;
};

type mode = {
	mode: string | null;
	count_mode: number | null;
};

export default function charts() {
	const { loading, setLoading, error, setError } = useModal();
	const [todayData, setTodayData] = useState<data[] | null>(null);
	const [totalData, setTotalData] = useState<data[] | null>(null);
	const [modeData, setModeData] = useState<mode[] | null>(null);
	const context = useUser();

	useEffect(() => {
		async function fetchData() {
			try {
				// Fetch restaurant data from the server
				const { data: dataToday, error: dataTodayError } = await supabase.rpc(
					'fetch_restaurant_data_for_charts_today',
					{ id: context?.user.id }
				);
				if (dataTodayError) throw dataTodayError;

				const { data: dataTotal, error: dataTotalError } = await supabase.rpc(
					'fetch_restaurant_data_for_charts_total',
					{ id: context?.user.id }
				);
				if (dataTotalError) throw dataTotalError;

				const { data: modeTotal, error: modeTotalError } = await supabase.rpc(
					'fetch_restaurant_mode_for_charts',
					{ id: context?.user.id }
				);
				if (modeTotalError) throw modeTotalError;

				setTodayData(dataToday as data[]);
				setTotalData(dataTotal as data[]);
				setModeData(modeTotal as mode[]);
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
		<AppLayout title='Charts'>
			<Head>
				<title>Sizzle - Charts</title>
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
					{totalData && totalData.length > 0 ? (
						<>
							<div className='mt-2 mb-8'>
								<h3 className='mb-2 font-bold text-gray-900'>Taste</h3>
								<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
									<BarChart
										values={totalData
											.filter((item) => item.taste && item.count_taste)
											.map((item) => {
												return {
													value: item.taste,
													count: item.count_taste,
												};
											})}
									/>
									{todayData && todayData.length > 0 ? (
										<PieChart
											values={todayData
												.filter((item) => item.taste && item.count_taste)
												.map((item) => {
													return {
														value: item.taste,
														count: item.count_taste,
													};
												})}
										/>
									) : (
										<PieChart values={null} />
									)}
								</div>
							</div>
							<div className='mt-2 mb-8'>
								<h3 className='mb-2 font-bold text-gray-900'>Service</h3>
								<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
									<BarChart
										values={totalData
											.filter((item) => item.service && item.count_service)
											.map((item) => {
												return {
													value: item.service,
													count: item.count_service,
												};
											})}
									/>
									{todayData && todayData.length > 0 ? (
										<PieChart
											values={todayData
												.filter((item) => item.service && item.count_service)
												.map((item) => {
													return {
														value: item.service,
														count: item.count_service,
													};
												})}
										/>
									) : (
										<PieChart values={null} />
									)}
								</div>
							</div>
							<div className='mt-2 mb-8'>
								<h3 className='mb-2 font-bold text-gray-900'>Ambience</h3>
								<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
									<BarChart
										values={totalData
											.filter((item) => item.ambience && item.count_ambience)
											.map((item) => {
												return {
													value: item.ambience,
													count: item.count_ambience,
												};
											})}
									/>
									{todayData && todayData.length > 0 ? (
										<PieChart
											values={todayData
												.filter((item) => item.ambience && item.count_ambience)
												.map((item) => {
													return {
														value: item.ambience,
														count: item.count_ambience,
													};
												})}
										/>
									) : (
										<PieChart values={null} />
									)}
								</div>
							</div>
							<div className='mt-2 mb-8'>
								<h3 className='mb-2 font-bold text-gray-900'>Pricing</h3>
								<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
									<BarChart
										values={totalData
											.filter((item) => item.pricing && item.count_pricing)
											.map((item) => {
												return {
													value: item.pricing,
													count: item.count_pricing,
												};
											})}
									/>
									{todayData && todayData.length > 0 ? (
										<PieChart
											values={todayData
												.filter((item) => item.pricing && item.count_pricing)
												.map((item) => {
													return {
														value: item.pricing,
														count: item.count_pricing,
													};
												})}
										/>
									) : (
										<PieChart values={null} />
									)}
								</div>
							</div>
							<div className='mt-2 mb-8'>
								<h3 className='mb-2 font-bold text-gray-900'>Recommendation</h3>
								<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
									<BarChart
										values={totalData
											.filter(
												(item) =>
													item.recommendation && item.count_recommendation
											)
											.map((item) => {
												return {
													value: item.recommendation,
													count: item.count_recommendation,
												};
											})}
									/>
									{todayData && todayData.length > 0 ? (
										<PieChart
											values={todayData
												.filter(
													(item) =>
														item.recommendation && item.count_recommendation
												)
												.map((item) => {
													return {
														value: item.recommendation,
														count: item.count_recommendation,
													};
												})}
										/>
									) : (
										<PieChart values={null} />
									)}
								</div>
							</div>
							<div className='mt-2 mb-8'>
								<h3 className='mb-2 font-bold text-gray-900'>Mode of visit</h3>
								{modeData && modeData.length > 0 ? (
									<PieChart
										values={modeData.map((item) => {
											return {
												value: item.mode,
												count: item.count_mode,
											};
										})}
									/>
								) : null}
							</div>
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
