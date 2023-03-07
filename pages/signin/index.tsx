import { Form } from '@/components/form/Form';
import { Button } from '@/components/form/Button';
import { Label } from '@/components/form/Label';
import { TextField } from '@/components/form/TextField';
import { Alert } from '@/components/ui/Alert';
import { Inter } from '@next/font/google';
import { useError } from '@/utils/hooks/use-error';
import { z } from 'zod';
import { useForm } from '@/utils/hooks/use-form';
import { SyntheticEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/supbase-client';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/context/user-context';
import Head from 'next/head';
import { AuthError } from '@supabase/supabase-js';

const inter = Inter({ subsets: ['latin'] });

// Schema for sign in data
const schema = z.object({
	email: z.string().email(),
	password: z.string().regex(/^[a-zA-Z0-9]{6,18}$/),
});

export default function Signin() {
	const [formData, setFormData] = useForm({
		email: '',
		password: '',
	});
	const [error, setError] = useError();
	const router = useRouter();
	const context = useUser();

	// Check if user is logged in, if yes, then redirect to app
	useEffect(() => {
		async function isUserLoggedIn() {
			try {
				const {
					data: { session },
					error: sessionError,
				} = await supabase.auth.getSession();

				if (sessionError) throw sessionError;

				if (session) {
					if (session.user.role === 'authenticated') {
						const { data, error: dataError } = await supabase
							.from('restaurants')
							.select('name')
							.eq('user_id', session.user.id)
							.single();

						if (dataError) throw dataError;

						context?.setUser({
							user: true,
							name: data.name,
							id: session.user.id,
						});
						router.push('/app');
					}
				}
			} catch (err: any) {
				console.log(err.message);
			}
		}

		isUserLoggedIn();
	}, []);

	// Function to handle change in input
	function handleChange(e: SyntheticEvent) {
		const { value, id } = e.target as HTMLInputElement;

		if (id === 'email') {
			setFormData({ ...formData, email: value });
		} else if (id === 'password') {
			setFormData({ ...formData, password: value });
		}
	}

	// Function to handle form submission and sign in the user
	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		if (!schema.safeParse(formData).success) {
			setError({
				error: true,
				message: 'Please enter valid details',
			});
			return;
		}

		// Send data to the server and sign in existing user
		try {
			const {
				data: { user },
				error,
			} = await supabase.auth.signInWithPassword({
				email: formData.email,
				password: formData.password,
			});

			if (error) throw error;

			const { data, error: dataError } = await supabase
				.from('restaurants')
				.select('name')
				.eq('user_id', user?.id)
				.single();

			if (dataError) throw dataError;

			context?.setUser({ user: true, name: data.name, id: user?.id });

			// Redirect user to app
			router.push('/app');
		} catch (err: any) {
			if (err instanceof AuthError) {
				setError({
					error: true,
					message: 'Invalid email address and/or password',
				});
			} else {
				setError({
					error: true,
					message: 'An error has occured. Please try again later',
				});
			}
		}
	}

	return (
		<main
			className={`${inter.className} flex min-h-full w-full flex-col items-center justify-center bg-gradient-to-b from-green-300 to-green-100 p-4`}
		>
			<Head>
				<title>Sizzle - Sign In</title>
				<meta
					name='description'
					content='Sizzle allows you to supercharge your restaurant using the power
							of data. Collect reviews from your customers through our platform
							and analyze customer sentiment and data to grow your business.'
				/>
				<link rel='shortcut icon' href='logo.svg' type='image/x-icon' />
			</Head>
			<div className='flex flex-row items-start justify-center space-x-1 text-gray-700'>
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
			<p className='mt-2 text-base text-gray-700'>Sign in to your account</p>
			<div className='my-4'>
				{error.error && <Alert variant='danger' text={error.message} />}
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
			<p className='mt-4 text-sm text-gray-700 md:text-base'>
				Don{"'"}t have an account?
				<Link
					className='ml-1 text-indigo-600 hover:text-indigo-800'
					href={'/signup'}
				>
					Click here to sign up
				</Link>
			</p>
		</main>
	);
}
