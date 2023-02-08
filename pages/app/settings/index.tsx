import { Button } from '@/components/form/Button';
import { Label } from '@/components/form/Label';
import { TextField } from '@/components/form/TextField';
import { Alert } from '@/components/ui/Alert';
import { AppLayout } from '@/components/ui/AppLayout';
import { useError } from '@/utils/hooks/use-error';
import { useForm } from '@/utils/hooks/use-form';
import { SyntheticEvent, useEffect, useRef } from 'react';
import { z } from 'zod';
import QRCode from 'qrcode';
import { supabase } from '@/utils/supabase/supbase-client';
import { Modal } from '@/components/ui/Modal';
import { useModal } from '@/utils/hooks/use-modal';
import { useUser } from '@/utils/context/user-context';
import { Loader } from '@/components/ui/Loader';
import Link from 'next/link';

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
	const ref = useRef<HTMLCanvasElement>(null);
	const {
		loading,
		setLoading,
		error: modalError,
		setError: setModalError,
	} = useModal();
	const context = useUser();
	const id = useRef<string>('');

	// Fetch data from the server to draw QR code and set form data
	useEffect(() => {
		// Function to fetch data from the server
		async function fetchData() {
			const { data, error } = await supabase
				.from('restaurants')
				.select('name, contact, review_id')
				.eq('user_id', context?.user.id)
				.single();

			if (error) throw error;

			return { ...data };
		}

		// Function to draw QR code and set form data
		async function drawAndUpdate() {
			try {
				const { name, contact, review_id: reviewId } = await fetchData();

				// Clear the canvas and draw QR code
				console.log(ref.current);
				if (ref.current) {
					clear(ref.current);
					draw(ref.current, reviewId);
				}

				// Set review Id to be used for redraws on form submission
				id.current = reviewId;

				setLoading(false);
				setFormData({
					name,
					contact,
				});
			} catch (err: any) {
				// Display error using modal
				setLoading(false);
				setModalError(true);
			}
		}

		setLoading(true);
		if (context?.user.user) {
			drawAndUpdate();
		}

		// Clear QR code drawn on the client
		return () => {
			if (ref.current) {
				clear(ref.current);
			}
			setLoading(false);
			setModalError(false);
		};
	}, []);

	// Function to draw QR on canvas
	function draw(canvas: HTMLCanvasElement, reviewId: string) {
		if (canvas) {
			QRCode.toCanvas(
				canvas,
				'www.sizzle.com/review/' + reviewId,
				{
					errorCorrectionLevel: 'L',
					margin: 2,
					scale: 6,
					version: 4,
				},
				(err) => {
					if (err) throw err;
				}
			);
		}
	}

	// Function to clear canvas
	function clear(canvas: HTMLCanvasElement) {
		const ctx = canvas?.getContext('2d');
		ctx?.clearRect(0, 0, canvas.width, canvas.height);
	}

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
			setError({
				error: true,
				message: 'Please enter valid details',
			});
			return;
		}

		// Send data to the server and update the restaurant details
		// setLoading(true);

		try {
			const { error } = await supabase
				.from('restaurants')
				.update({
					name: formData.name.trim(),
					contact: formData.contact,
				})
				.eq('user_id', context?.user.id);

			if (error) throw error;

			// setLoading(false);

			// Clear and redraw canvas
			if (ref.current) {
				clear(ref.current);
				draw(ref.current, id.current);
			}

			context?.setUser({ ...context?.user, name: formData.name.trim() });
		} catch (err: any) {
			setError({
				error: true,
				message: err.message,
			});
		}
	}

	return (
		<AppLayout title='Settings'>
			{loading ? (
				<Loader />
			) : (
				<>
					<section className='mt-2 mb-8'>
						<h3 className='mb-4 text-lg font-bold text-gray-900 md:text-center'>
							Restaurant QR Code
						</h3>
						<div id='qrcode' className='mx-auto w-fit border border-gray-300'>
							<canvas ref={ref}></canvas>
						</div>
						<p className='mt-2 mb-4 text-gray-600 md:text-center'>
							The QR code above is unique to your restaurant. Download the QR
							code or Scan it to open the review portal for your restaurant.
						</p>
						<div className='mx-auto max-w-lg'>
							<Link
								href={`/app/qr/${id.current}`}
								download={'QR Code'}
								className='block w-fit rounded bg-gradient-to-r from-green-600 to-green-400 px-4 py-2 text-sm text-gray-50'
							>
								View QR code template
							</Link>
						</div>
					</section>
					<section className='mt-2 mb-8'>
						<h3 className='mb-4 text-lg font-bold text-gray-900 md:text-center'>
							Edit Restaurant details
						</h3>
						<div className='mx-auto max-w-lg'>
							{error.error && (
								<div className='my-4'>
									<Alert variant='danger' text={error.message} />
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
					{modalError && (
						<Modal
							status='error'
							message='An error has occured. Please try again later.'
						/>
					)}
				</>
			)}
		</AppLayout>
	);
}
