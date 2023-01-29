import { Button } from '@/components/form/Button';
import { Label } from '@/components/form/Label';
import { TextField } from '@/components/form/TextField';
import { Alert } from '@/components/ui/Alert';
import { AppLayout } from '@/components/ui/AppLayout';
import { useError } from '@/utils/hooks/use-error';
import { useForm } from '@/utils/hooks/use-form';
import { SyntheticEvent } from 'react';
import { z } from 'zod';

// Schema for settings data
const schema = z.object({
	name: z.string().regex(/^[a-zA-Z0-9\s]{1,100}$/),
	contact: z.string().regex(/^[0-9]{10}$/),
});

// Regex for contact
const contactRegex = /^[0-9]{0,10}$/;

export default function settings() {
	const [formData, setFormData] = useForm({
		name: '',
		contact: '',
	});
	const [error, setError] = useError();

	// Function to download QR code
	function handleClick() {}

	// Function to handle change in input
	function handleChange(e: SyntheticEvent) {
		const { value, id } = e.target as HTMLInputElement;

		if (id === 'name') {
			setFormData({ ...formData, name: value });
		} else if (id === 'contact') {
			if (contactRegex.test(value)) {
				setFormData({ ...formData, contact: value });
			}
		}
	}

	// Function to handle form submission
	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		if (!schema.safeParse(formData).success) {
			setError(true);
			return;
		}
	}

	return (
		<AppLayout title='Settings'>
			<section className='mt-2 mb-8'>
				<h3 className='mb-4 text-lg font-bold text-gray-900 md:text-center'>
					Restaurant QR Code
				</h3>
				<div>{/* QR code to be rendered here */}</div>
				<p className='mt-2 mb-4 text-gray-600 md:text-center'>
					The QR code above is unique to your restaurant. Download the QR code
					or Scan it to open the review portal for your restaurant.
				</p>
				<div className='mx-auto max-w-lg'>
					<Button variant='fit' text='Download QR code' onClick={handleClick} />
				</div>
			</section>
			<section className='mt-2 mb-8'>
				<h3 className='mb-4 text-lg font-bold text-gray-900 md:text-center'>
					Edit Restaurant details
				</h3>
				<div className='mx-auto max-w-lg'>
					{error && (
						<div className='my-4'>
							<Alert variant='danger' text='Please enter valid details' />
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className='mb-4'>
							<div className='mb-1'>
								<Label id='name' text='Restaurant name' />
							</div>
							<TextField
								value={formData.name}
								onChange={handleChange}
								type='text'
								name='name'
								id='name'
								placeholder='Restaurant name'
								required={true}
							/>
						</div>
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
						<Button variant='fit' text='Edit details' />
					</form>
				</div>
			</section>
		</AppLayout>
	);
}
