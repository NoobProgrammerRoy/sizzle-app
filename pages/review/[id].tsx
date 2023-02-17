import { Button } from '@/components/form/Button';
import { Label } from '@/components/form/Label';
import { Radio } from '@/components/form/Radio';
import { Rating } from '@/components/form/Rating';
import { TextField } from '@/components/form/TextField';
import { Alert } from '@/components/ui/Alert';
import { Modal } from '@/components/ui/Modal';
import { useError } from '@/utils/hooks/use-error';
import { useForm } from '@/utils/hooks/use-form';
import { useModal } from '@/utils/hooks/use-modal';
import { supabase } from '@/utils/supabase/supbase-client';
import { Inter } from '@next/font/google';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { SyntheticEvent } from 'react';
import { z } from 'zod';

const inter = Inter({ subsets: ['latin'] });

// Schema for the review data
const schema = z.object({
	name: z.string().regex(/^[a-zA-Z0-9\s]{1,100}$/),
	contact: z.string().regex(/^[0-9]{10}$/),
	taste: z.number().gte(1).lte(5),
	service: z.number().gte(1).lte(5),
	ambience: z.number().gte(1).lte(5),
	pricing: z.number().gte(1).lte(5),
	recommendation: z.number().gte(1).lte(5),
	mode: z.union([
		z.literal('Social media and Advertisement'),
		z.literal('Regular customer'),
		z.literal('Recommendation'),
		z.literal('Wanted to try a new place'),
	]),
	feedback: z.string().regex(/^[a-zA-Z0-9\s\,\.]{1,100}$/),
});

// Regex for contact
const contactRegex = /^[0-9]{0,10}$/;

// Type definition of props
type props = {
	name: string;
	contact: string;
	review_id: string;
};

export default function Review({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [formData, setFormData] = useForm({
		name: '',
		contact: '',
		taste: 0,
		service: 0,
		ambience: 0,
		pricing: 0,
		recommendation: 0,
		mode: '',
		feedback: '',
	});
	const [error, setError] = useError();
	const {
		loading,
		setLoading,
		error: modalError,
		setError: setModalError,
		success,
		setSuccess,
	} = useModal();

	// Function to handle change in input
	function handleChange(e: SyntheticEvent) {
		const { value, id, name } = e.target as HTMLInputElement;

		if (id === 'name') {
			setFormData({ ...formData, name: value });
		} else if (id === 'contact') {
			if (contactRegex.test(value)) {
				setFormData({ ...formData, contact: value });
			}
		} else if (name === 'taste') {
			setFormData({ ...formData, taste: +value });
		} else if (name === 'service') {
			setFormData({ ...formData, service: +value });
		} else if (name === 'ambience') {
			setFormData({ ...formData, ambience: +value });
		} else if (name === 'pricing') {
			setFormData({ ...formData, pricing: +value });
		} else if (name === 'recommendation') {
			setFormData({ ...formData, recommendation: +value });
		} else if (name === 'mode') {
			setFormData({ ...formData, mode: value });
		} else if (id === 'feedback') {
			setFormData({ ...formData, feedback: value });
		}
	}

	// Function to handle form submission
	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		if (!schema.safeParse(formData).success) {
			setError({
				error: true,
				message: 'Please fill in all the fields with suitable data',
			});
			return;
		}

		// Send data to the server and submit the review
		setLoading(true);

		try {
			const { error } = await supabase.from('reviews').insert({
				review_id: data.review_id,
				name: formData.name.trim(),
				contact: formData.contact,
				taste: formData.taste,
				service: formData.service,
				ambience: formData.ambience,
				pricing: formData.pricing,
				recommendation: formData.recommendation,
				mode_of_visit: formData.mode,
				feedback: formData.feedback,
			});

			if (error) throw error;

			setSuccess(true);
			setFormData({
				name: '',
				contact: '',
				taste: 0,
				service: 0,
				ambience: 0,
				pricing: 0,
				recommendation: 0,
				mode: '',
				feedback: '',
			});
		} catch (err) {
			setModalError(true);
		} finally {
			setLoading(false);
		}
	}

	return (
		<main
			className={`${inter.className} min-h-screen w-full bg-gradient-to-b from-green-300 to-green-100 p-4`}
		>
			<Head>
				<title>Sizzle - Share a review</title>
				<meta
					name='description'
					content='Sizzle allows you to supercharge your restaurant using the power
							of data. Collect reviews from your customers through our platform
							and analyze customer sentiment and data to grow your business.'
				/>
				<link rel='shortcut icon' href='logo.svg' type='image/x-icon' />
			</Head>
			<section className='mx-auto flex w-full max-w-2xl flex-row items-center justify-start space-x-4 rounded bg-gray-50 p-4 shadow md:p-8'>
				<div className='grid h-16 w-16 content-center justify-items-center rounded-full bg-green-600'>
					<span className='text-3xl font-medium text-gray-50'>
						{data.name[0]}
					</span>
				</div>
				<div>
					<h1 className='text-xl font-bold'>{data.name}</h1>
					<p className='mt-2 text-sm font-medium text-gray-600'>
						{data.contact}
					</p>
				</div>
			</section>
			{error.error && (
				<div className='mx-auto mt-4 w-fit'>
					<Alert variant='danger' text={error.message} />
				</div>
			)}
			<section className='mx-auto my-4 w-full max-w-2xl rounded bg-gray-50 p-4 shadow md:p-8'>
				<p className='mb-4 font-bold text-gray-900'>Add a review</p>
				<form onSubmit={handleSubmit}>
					{/* Name */}
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
					{/* Contact */}
					<div className='mb-4'>
						<div className='mb-1'>
							<Label id='contact' text='Contact number' />
						</div>
						<TextField
							value={formData.contact}
							onChange={handleChange}
							type='text'
							name='contact'
							id='contact'
							placeholder='Contact number'
							required={true}
						/>
					</div>
					{/* Taste */}
					<div className='mb-4'>
						<div className='mb-1'>
							<Label id='taste' text='Taste' />
						</div>
						<Rating
							value={formData.taste}
							onChange={handleChange}
							name='taste'
							id='taste'
						/>
					</div>
					{/* Service */}
					<div className='mb-4'>
						<div className='mb-1'>
							<Label id='service' text='Service' />
						</div>
						<Rating
							value={formData.service}
							onChange={handleChange}
							name='service'
							id='service'
						/>
					</div>
					{/* Ambience */}
					<div className='mb-4'>
						<div className='mb-1'>
							<Label id='ambience' text='Ambience' />
						</div>
						<Rating
							value={formData.ambience}
							onChange={handleChange}
							name='ambience'
							id='ambience'
						/>
					</div>
					{/* Pricing */}
					<div className='mb-4'>
						<div className='mb-1'>
							<Label id='pricing' text='Pricing' />
						</div>
						<Rating
							value={formData.pricing}
							onChange={handleChange}
							name='pricing'
							id='pricing'
						/>
					</div>
					{/* Recommendation */}
					<div className='mb-4'>
						<div className='mb-1'>
							<Label
								id='recommendation'
								text='Would you recommend this place to others?'
							/>
						</div>
						<Rating
							value={formData.recommendation}
							onChange={handleChange}
							name='recommendation'
							id='recommendation'
						/>
					</div>
					{/* Mode of visit */}
					<div className='mb-4'>
						<div className='mb-1'>
							<Label id='mode' text='How did you find out about this place?' />
						</div>
						<div>
							<div className='mb-1 flex flex-row items-center justify-start space-x-2'>
								<Radio
									name='mode'
									id='mode-1'
									value='Social media and Advertisement'
									current={formData.mode}
									onChange={handleChange}
								/>
								<Label id='mode-1' text='Social media and Advertisement' />
							</div>
							<div className='mb-1 flex flex-row items-center justify-start space-x-2'>
								<Radio
									name='mode'
									id='mode-2'
									value='Regular customer'
									current={formData.mode}
									onChange={handleChange}
								/>
								<Label id='mode-2' text='Regular customer' />
							</div>
							<div className='mb-1 flex flex-row items-center justify-start space-x-2'>
								<Radio
									name='mode'
									id='mode-3'
									value='Recommendation'
									current={formData.mode}
									onChange={handleChange}
								/>
								<Label id='mode-3' text='Recommendation' />
							</div>
							<div className='flex flex-row items-center justify-start space-x-2'>
								<Radio
									name='mode'
									id='mode-4'
									value='Wanted to try a new place'
									current={formData.mode}
									onChange={handleChange}
								/>
								<Label id='mode-4' text='Wanted to try a new place' />
							</div>
						</div>
					</div>
					{/* Feedback */}
					<div className='mb-4'>
						<div className='mb-1'>
							<Label id='feedback' text='Feedback' />
						</div>
						<TextField
							value={formData.feedback}
							onChange={handleChange}
							type='text'
							name='feedback'
							id='feedback'
							placeholder='Feedback'
							required={true}
						/>
					</div>
					<Button text='Submit review' variant='fit' />
				</form>
			</section>
			<div className='flex flex-row items-center justify-center space-x-1 text-gray-700'>
				<p className='text-sm font-medium'>Powered by </p>
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
			</div>
			{loading && (
				<Modal status='loading' message='Submitting your review...' />
			)}
			{success && (
				<Modal status='success' message='Review submitted successfully.' />
			)}
			{modalError && (
				<Modal
					status='error'
					message='An error has occured. Please try again later.'
				/>
			)}
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
		.limit(1)
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
