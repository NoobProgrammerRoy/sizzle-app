import { Inter } from '@next/font/google';
import Link from 'next/link';
import { FeatureCard } from '@/components/card/FeatureCard';
import { Form } from '@/components/form/Form';
import { Label } from '@/components/form/Label';
import { TextField } from '@/components/form/TextField';
import { Button } from '@/components/form/Button';
import { useForm } from '@/utils/hooks/use-form';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { useError } from '@/utils/hooks/use-error';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { supabase } from '@/utils/supabase/supbase-client';
import { Modal } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';
import { useModal } from '@/utils/hooks/use-modal';
import { Info } from '@/components/form/Info';
import { PricingCard } from '@/components/card/PricingCard';
import Image from 'next/image';
import dashboardPic from '@/public/dashboard.png';
import reviewPic from '@/public/review.png';
import Head from 'next/head';
import animationStyles from '@/styles/index.module.css';

const inter = Inter({ subsets: ['latin'] });

const schema = z.object({
	name: z.string().regex(/^[a-zA-Z0-9\s]{1,100}$/),
	email: z.string().email(),
	message: z.string().regex(/^[a-zA-Z0-9\s\.\,]{1,100}$/),
});

export default function IndexPage() {
	const [formData, setFormData] = useForm({
		name: '',
		email: '',
		message: '',
	});
	const [error, setError] = useError();

	const { loading, setLoading } = useModal();

	// Refs for adding animation along with intersection observer
	const imageRef = useRef<HTMLImageElement>(null);
	const pricingRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLDivElement>(null);
	const cardRefs = [
		useRef<HTMLDivElement>(null),
		useRef<HTMLDivElement>(null),
		useRef<HTMLDivElement>(null),
		useRef<HTMLDivElement>(null),
	];

	// Use effect to add / remove intersection observer
	useEffect(() => {
		const observer = new IntersectionObserver(
			(elements) => {
				elements.forEach((el) => {
					if (el.isIntersecting) {
						if (el.target.id === 'pricing-card') {
							el.target.classList.add(animationStyles['animate-from-right']);
							el.target.classList.remove('opacity-0');
						} else {
							el.target.classList.add(animationStyles['animate-from-left']);
							el.target.classList.remove('opacity-0');
						}
						observer.unobserve(el.target);
					}
				});
			},
			{
				threshold: 0.5,
			}
		);

		if (imageRef && imageRef.current) {
			observer.observe(imageRef.current);
		}

		if (pricingRef && pricingRef.current) {
			observer.observe(pricingRef.current);
		}

		if (formRef && formRef.current) {
			observer.observe(formRef.current);
		}

		cardRefs.forEach((cardRef) => {
			if (cardRef && cardRef.current) {
				observer.observe(cardRef.current);
			}
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	// Function to handle change in user input
	function handleChange(e: SyntheticEvent) {
		const { value, id } = e.target as HTMLInputElement;

		if (id === 'name') {
			setFormData({ ...formData, name: value });
		} else if (id === 'email') {
			setFormData({ ...formData, email: value });
		} else if (id === 'message') {
			setFormData({ ...formData, message: value });
		}
	}

	// Function to handle form submission
	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		if (!schema.safeParse(formData).success) {
			setError({
				error: true,
				message: 'Please enter valid details',
			});
			return;
		}

		// Send data to the server and submit the message
		setLoading(true);

		try {
			const { error } = await supabase.from('contacts').insert({
				name: formData.name.trim(),
				email: formData.email,
				message: formData.message.trim(),
			});

			if (error) throw error;

			// Reset form data and error
			setFormData({
				name: '',
				email: '',
				message: '',
			});
			setError({ error: false, message: '' });
		} catch (err) {
			setError({
				error: true,
				message: 'An error has occured. Please try again later',
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Head>
				<title>Sizzle - Restaurant Review and Analytical Platform</title>
				<meta
					name='description'
					content='Sizzle allows you to supercharge your restaurant using the power
							of data. Collect reviews from your customers through our platform
							and analyze customer sentiment and data to grow your business.'
				/>
				<link rel='shortcut icon' href='logo.svg' type='image/x-icon' />
			</Head>
			<Navbar />
			<main
				className={`${inter.className} overflow-hidden bg-gradient-to-b from-gray-50  to-white`}
			>
				{/* Main */}
				<section className='container mx-auto grid grid-cols-1 py-16 md:min-h-screen md:grid-cols-2 md:gap-4 md:py-0'>
					<article className='p-4 md:my-auto'>
						<h1 className='text-3xl font-bold text-gray-900 md:text-5xl'>
							Sizzle - Restaurant Review and Analytical Platform
						</h1>
						<p className='my-4 text-base leading-relaxed text-gray-700 md:my-8 md:text-lg'>
							Sizzle allows you to supercharge your restaurant using the power
							of data. Collect reviews from your customers through our platform
							and analyze customer sentiment and data to grow your business.
						</p>
						<Link
							href={'/signup'}
							className='block w-fit rounded-sm bg-gradient-to-r from-green-600 to-green-400 px-4 py-2 text-sm font-medium text-gray-100 md:text-base'
						>
							Try now for free
						</Link>
					</article>
					<article className='mx-auto p-4 md:my-auto'>
						<Image
							className={`${animationStyles['animate-from-right']} relative rounded-sm ring-1 ring-green-600 `}
							src={dashboardPic}
							alt='Sizzle Dashboard'
							priority={true}
						/>
					</article>
				</section>
				{/* About  */}
				<section id='about' className='bg-gray-100 py-16 md:py-0'>
					<div className='container mx-auto grid grid-cols-1 md:min-h-screen md:grid-cols-2 md:gap-4'>
						<article className='order-last mx-auto p-4 md:order-first md:my-auto'>
							<Image
								ref={imageRef}
								className={`relative rounded-sm opacity-0 shadow md:w-96`}
								src={reviewPic}
								alt='Sizzle Dashboard'
							/>
						</article>
						<article className='p-4 md:my-auto'>
							<h2 className='mb-2 text-center text-xl font-bold text-gray-900 md:mb-4 md:text-3xl'>
								About Us
							</h2>
							<p className='text-base leading-relaxed text-gray-700 md:text-lg'>
								Sizzle is a platform that allows restaurants to understand their
								customers better and provide better quality meals and services.
								This is done by analyzing real-time customer feedback which is
								then processed and delivered to your business. Understand and
								analyze key customer metrics such as taste, pricing, ambience
								etc. through tabular and graphical visualizations to serve your
								customers better.
							</p>
						</article>
					</div>
				</section>

				{/* Features */}
				<section
					id='features'
					className='grid bg-gradient-to-r from-green-600 to-green-400 py-16 md:min-h-screen md:py-0'
				>
					<article className='container mx-auto p-4 md:my-auto'>
						<h2 className='mb-2 text-center text-xl font-bold text-gray-50 md:mb-4 md:text-3xl'>
							Our Features
						</h2>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
							<FeatureCard
								elementRef={cardRefs[0]}
								title='Data Visualization'
								text='Visualize and study customer feedback using tabular data and graphical charts'
								icon={
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='currentColor'
										className='h-8 w-8 fill-green-400 md:h-12 md:w-12'
									>
										<path d='M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z' />
									</svg>
								}
							/>
							<FeatureCard
								elementRef={cardRefs[1]}
								title='Analyze Customer Data'
								text='Understand the key customer metrics and patterns to enhance and grow your business'
								icon={
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='currentColor'
										className='h-8 w-8 fill-yellow-400 md:h-12 md:w-12'
									>
										<path
											fillRule='evenodd'
											d='M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM9.75 17.25a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zm2.25-3a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-5.25z'
											clipRule='evenodd'
										/>
										<path d='M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z' />
									</svg>
								}
							/>
							<FeatureCard
								elementRef={cardRefs[2]}
								title='Unique QR Code'
								text='Collect real-time customer feedback using QR codes unique to your business'
								icon={
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='currentColor'
										className='h-8 w-8 fill-gray-700 md:h-12 md:w-12'
									>
										<path
											fillRule='evenodd'
											d='M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 013 9.375v-4.5zM4.875 4.5a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 01-1.875-1.875v-4.5zm1.875-.375a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75A.75.75 0 016 7.5v-.75zm9.75 0A.75.75 0 0116.5 6h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 013 19.125v-4.5zm1.875-.375a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zm7.875-.75a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm6 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM6 16.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm9.75 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm-3 3a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm6 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75z'
											clipRule='evenodd'
										/>
									</svg>
								}
							/>
							<FeatureCard
								elementRef={cardRefs[3]}
								title='Notifications'
								text='Send custom notifications to your customers regarding offers and discounts (Coming soon)'
								icon={
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='currentColor'
										className='h-8 w-8 fill-blue-400 md:h-12 md:w-12'
									>
										<path
											fillRule='evenodd'
											d='M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z'
											clipRule='evenodd'
										/>
									</svg>
								}
							/>
						</div>
					</article>
				</section>
				{/* Pricing  */}
				<section id='pricing' className='bg-gray-100 py-16 md:py-0'>
					<div className='container mx-auto grid grid-cols-1 bg-gray-100 md:min-h-screen md:grid-cols-2 md:gap-4'>
						<article className='p-4 md:my-auto'>
							<h2 className='mb-2 text-center text-xl font-bold text-gray-900 md:mb-4 md:text-3xl'>
								Pricing
							</h2>
							<p className='text-base leading-relaxed text-gray-700 md:text-lg'>
								Simple and budget-friendly monthly subscription. No tiered
								pricing. No hidden charges. Just straight to the point. Want to
								use it before you pay for it?{' '}
								<span className='font-bold text-gray-900'>
									Try Sizzle for free for{' '}
									<span className='text-green-700'>14 days.</span>
								</span>
							</p>
						</article>
						<article className='p-4 md:my-auto'>
							<PricingCard elementRef={pricingRef} />
						</article>
					</div>
				</section>

				{/* Contact */}
				<section
					id='contact'
					className='container mx-auto grid grid-cols-1 py-16 md:mb-8 md:min-h-screen md:grid-cols-2 md:gap-4 md:py-0'
				>
					<article className='order-last p-4 md:order-first md:my-auto'>
						{error.error && (
							<div className='my-4 mx-auto max-w-fit'>
								<Alert variant='danger' text={error.message} />
							</div>
						)}
						<div className='flex flex-row items-center justify-center'>
							<div
								ref={formRef}
								className='relative w-fit rounded-sm opacity-0 shadow'
							>
								<Form onSubmit={handleSubmit}>
									<div className='mb-4'>
										<div className='mb-1'>
											<Label id='name' text='Name' />
										</div>
										<TextField
											value={formData.name}
											onChange={handleChange}
											type='text'
											name='name'
											id='name'
											placeholder='Name'
											required={true}
										/>
									</div>
									<div className='mb-4'>
										<div className='mb-1'>
											<Label id='email' text='Email address' />
										</div>
										<TextField
											value={formData.email}
											onChange={handleChange}
											type='email'
											name='email'
											id='email'
											placeholder='Email address'
											required={true}
										/>
									</div>
									<div className='mb-4'>
										<div className='mb-1'>
											<Label id='message' text='Message' />
										</div>
										<TextField
											value={formData.message}
											onChange={handleChange}
											type='text'
											name='message'
											id='message'
											placeholder='Message'
											required={true}
										/>
										<Info text='Message should only contain alphanumeric characters, comma or full stop.' />
									</div>
									<Button variant='full' text='Send a message' />
								</Form>
							</div>
						</div>
					</article>
					<article className='p-4 md:my-auto'>
						<h2 className='mb-2 text-center text-xl font-bold text-gray-900 md:mb-4 md:text-3xl'>
							Contact Us
						</h2>
						<p className='leading-relaxed text-gray-700 md:text-center  md:text-lg'>
							Want to book a live demo or have any queries? Please do let us
							know.
						</p>
					</article>
				</section>
			</main>
			{/* Footer */}
			<Footer />
			{loading && (
				<Modal status='loading' message={'Sending your message...'} />
			)}
		</>
	);
}
