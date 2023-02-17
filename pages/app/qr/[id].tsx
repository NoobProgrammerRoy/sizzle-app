import { supabase } from '@/utils/supabase/supbase-client';
import { Inter } from '@next/font/google';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { SyntheticEvent, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import styles from 'styles/page.module.css';
import { Button } from '@/components/form/Button';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

type props = {
	name: string;
	contact: string;
	review_id: string;
};

export default function qr({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		try {
			clear(ref.current);
			draw(ref.current, data.review_id);
		} catch (err: any) {
			console.log(err.message);
		}

		return () => {
			clear(ref.current);
		};
	}, []);

	// Function to draw the QR code
	function draw(canvas: HTMLCanvasElement | null, id: string) {
		if (canvas) {
			QRCode.toCanvas(
				canvas,
				process.env.NEXT_PUBLIC_REVIEW_URL + id,
				{
					errorCorrectionLevel: 'L',
					margin: 2,
					scale: 8,
					version: 4,
				},
				(err) => {
					if (err) throw err;
				}
			);
		}
	}

	// Function to clear the canvas
	function clear(canvas: HTMLCanvasElement | null) {
		if (canvas) {
			const ctx = canvas.getContext('2d');
			ctx?.clearRect(0, 0, canvas.width, canvas.height);
		}
	}

	// Function to download QR code template
	function handleClick() {
		window.print();
	}

	return (
		<main
			className={`${inter.className} ${styles} grid min-h-screen w-full content-center justify-items-center bg-gradient-to-b from-green-300 to-green-100`}
		>
			<Head>
				<title>Sizzle - QR Code</title>
				<meta
					name='description'
					content='Sizzle allows you to supercharge your restaurant using the power
							of data. Collect reviews from your customers through our platform
							and analyze customer sentiment and data to grow your business.'
				/>
				<link rel='shortcut icon' href='logo.svg' type='image/x-icon' />
			</Head>
			<div className='absolute top-0 left-0 hidden w-full border-green-300 [border-top-width:100vh] print:block'></div>
			<section className='w-96 rounded-md bg-white p-4 shadow print:z-10'>
				<div className='mb-8 flex flex-row items-start justify-center space-x-1 text-gray-700'>
					<span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							className='h-6 w-6'
						>
							<path
								fillRule='evenodd'
								d='M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z'
								clipRule='evenodd'
							/>
						</svg>
					</span>
					<h1 className=' text-xl font-bold '>Sizzle</h1>
				</div>
				<h2 className='mb-2 text-center text-sm font-medium leading-relaxed text-gray-600'>
					Share your experience to help us serve you better.
				</h2>
				<p className='text-center font-bold leading-relaxed text-gray-900'>
					{data.name}
				</p>
				<div className='grid content-center justify-items-center'>
					<canvas ref={ref}></canvas>
				</div>
				<p className='text-center font-bold leading-relaxed text-gray-900'>
					{data.contact}
				</p>
				<p className='mt-8 text-center text-sm font-medium text-gray-600'>
					For any inquires, contact us at sizzleapp@gmail.com
				</p>
			</section>
			<div className='mt-8'>
				<Button
					onClick={handleClick}
					text='Download QR code template'
					variant='fit'
				/>
			</div>
		</main>
	);
}

export const getServerSideProps: GetServerSideProps<{ data: props }> = async ({
	params,
}) => {
	const { data, error } = await supabase
		.from('restaurants')
		.select('name, contact, review_id')
		.eq('review_id', params!.id)
		.single();

	if (error || !data) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			data,
		},
	};
};
