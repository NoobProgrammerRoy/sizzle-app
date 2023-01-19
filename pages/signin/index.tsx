import { Form } from '@/components/form/Form';
import { Button } from '@/components/form/Button';
import { Label } from '@/components/form/Label';
import { TextField } from '@/components/form/TextField';
import { Alert } from '@/components/ui/Alert';
import { Inter } from '@next/font/google';
import { useError } from '@/utils/hooks/use-error';
import { z } from 'zod';
import { useForm } from '@/utils/hooks/use-form';
import { SyntheticEvent, useState } from 'react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

// Schema for sign in data
const schema = z.object({
	email: z.string().email(),
	password: z.string().regex(/^[a-zA-Z0-9]{6,18}$/),
});

export default function signin() {
	const [formData, setFormData] = useForm({
		email: '',
		password: '',
	});
	const [error, setError] = useError();

	// Function to handle change in input
	function handleChange(e: SyntheticEvent) {
		const { value, id } = e.target as HTMLInputElement;

		if (id === 'email') {
			setFormData({ ...formData, email: value });
			return;
		}
		setFormData({ ...formData, password: value });
	}

	// Function to handle form submission and sign in the user
	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		if (!schema.safeParse(formData).success) {
			setError(true);
			return;
		}
	}

	return (
		<main
			className={`${inter.className} flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-green-200 to-green-50`}
		>
			<h1 className='flex flex-row items-start justify-center space-x-1 text-gray-700'>
				<span className='text-xl font-bold'>Sizzle</span>
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
			</h1>
			<p className='mt-2 text-lg text-gray-700'>Sign in to your account</p>
			<div className='my-4'>
				{error && (
					<Alert variant='danger' text='Invalid email address or password' />
				)}
			</div>
			<Form onSubmit={handleSubmit}>
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
						<Label id='password' text='Password' />
					</div>
					<TextField
						value={formData.password}
						onChange={handleChange}
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						required={true}
					/>
				</div>
				<Button text='Sign in to your account' variant='full' />
			</Form>
			<p className='mt-4 text-gray-700'>
				Don't have an account?{' '}
				<Link
					className='text-indigo-600 hover:text-indigo-800'
					href={'/signup'}
				>
					Click here to sign up
				</Link>
			</p>
		</main>
	);
}
