import { Button } from '@/components/form/Button';
import { Label } from '@/components/form/Label';
import { Radio } from '@/components/form/Radio';
import { Rating } from '@/components/form/Rating';
import { TextField } from '@/components/form/TextField';
import { Alert } from '@/components/ui/Alert';
import { useError } from '@/utils/hooks/use-error';
import { useForm } from '@/utils/hooks/use-form';
import { Inter } from '@next/font/google';
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
	feedback: z.string().regex(/^[a-zA-Z0-9\s]{1,100}$/),
});

// Regex for contact
const contactRegex = /^[0-9]{0,10}$/;

export default function review() {
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
	function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		if (!schema.safeParse(formData).success) {
			setError(true);
			return;
		}
	}

	return (
		<main
			className={`${inter.className} min-h-screen w-full bg-gradient-to-b from-green-200 via-green-300 to-green-50 p-4`}
		>
			<section className='mx-auto flex w-full max-w-2xl flex-row items-center justify-start space-x-4 rounded bg-gray-50 p-4 shadow md:p-8'>
				<div className='h-16 w-16 rounded-full bg-gray-300'></div>
				<div>
					<h1 className='text-xl font-bold'>Restaurant name</h1>
					<p className='mt-1 text-sm text-gray-600'>Contact number</p>
				</div>
			</section>
			{error && (
				<div className='mx-auto mt-4 w-fit'>
					<Alert variant='danger' text='Please fill out all the fields' />
				</div>
			)}
			<section className='mx-auto my-4 w-full max-w-2xl rounded bg-gray-50 p-4 shadow md:p-8'>
				<p className='mb-4 font-bold text-gray-700'>Add a review</p>
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
									value={formData.mode}
									onChange={handleChange}
								/>
								<Label id='mode-1' text='Social media and Advertisement' />
							</div>
							<div className='mb-1 flex flex-row items-center justify-start space-x-2'>
								<Radio
									name='mode'
									id='mode-3'
									value={formData.mode}
									onChange={handleChange}
								/>
								<Label id='mode-3' text='Regular customer' />
							</div>
							<div className='mb-1 flex flex-row items-center justify-start space-x-2'>
								<Radio
									name='mode'
									id='mode-4'
									value={formData.mode}
									onChange={handleChange}
								/>
								<Label id='mode-4' text='Recommendation' />
							</div>
							<div className='flex flex-row items-center justify-start space-x-2'>
								<Radio
									name='mode'
									id='mode-5'
									value={formData.mode}
									onChange={handleChange}
								/>
								<Label id='mode-5' text='Wanted to try a new place' />
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
		</main>
	);
}
