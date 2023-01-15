import { Inter } from '@next/font/google';
import { SyntheticEvent, useState } from 'react';
import { authSchema } from '@/utils/types/auth';
import { z } from 'zod/lib';
import { supabase } from '@/supabase/supabaseClient';
import { useUser } from '@/utils/context/userContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function SignupPage() {
	const [signup, setSignup] = useState<z.infer<typeof authSchema>>({
		email: '',
		password: '',
	});
	const [error, setError] = useState<{ error: boolean; message: string }>({
		error: false,
		message: '',
	});
	const router = useRouter();
	const { signupUser } = useUser();

	// Function to handle form input change
	function handleChange(e: SyntheticEvent) {
		const { value, id } = e.target as HTMLInputElement;

		if (id === 'email') setSignup({ ...signup, email: value });
		else if (id === 'password') setSignup({ ...signup, password: value });
	}

	// Function to handle form submission
	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();
		const result = authSchema.safeParse(signup);

		if (result.success) {
			setError({ error: false, message: '' });

			// Submit data to server
			const user = await signupUser!(signup.email, signup.password);

			if (user) {
				console.log(user.data);
				router.push('/app');
				setSignup({ email: '', password: '' });
			} else {
				setError({
					error: true,
					message: 'An account with this email address already exists!',
				});
			}
		} else {
			// Display error to the user
			setError({
				error: true,
				message: 'Please enter a valid email address and password!',
			});
		}
	}

	return (
		<main
			className={`flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-red-600 to-red-100 p-4 md:p-8 ${inter.className}`}
		>
			<h1 className='flex flex-row items-center justify-center space-x-1 pb-4 text-2xl font-bold text-white'>
				<span>Sizzle</span>
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
			<p className='pb-4 text-lg text-gray-100'>Sign up to create an account</p>
			<div className='w-full max-w-md rounded bg-gray-50 p-4 shadow md:p-6'>
				<form onSubmit={handleSubmit}>
					<label className='mb-1 block text-sm ' htmlFor='email'>
						Email Address<span className='pl-1 text-red-600'>*</span>
					</label>
					<input
						className='mb-4 block w-full rounded border border-gray-300 p-2 text-sm outline-none valid:border-green-500 focus:valid:border-green-500 focus:invalid:border-red-600'
						type='email'
						value={signup.email}
						onChange={handleChange}
						id='email'
						placeholder='Email Address'
						required
					/>
					<label className='mb-1 block text-sm' htmlFor='password'>
						Password<span className='pl-1 text-red-600'>*</span>
					</label>
					<input
						className='mb-2 block w-full rounded border border-gray-300 p-2 text-sm outline-none valid:border-green-500 focus:valid:border-green-500 focus:invalid:border-red-600'
						type='password'
						value={signup.password}
						onChange={handleChange}
						id='password'
						placeholder='Password'
						required
					/>
					<p className='mb-1 text-xs text-gray-700'>
						- Password must contain alpha-numeric characters only
					</p>
					<p className='mb-4 text-xs text-gray-700'>
						- Password must be 6-18 characters in length
					</p>
					<button className='block w-full rounded bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-600'>
						Create an account
					</button>
					{error.error && (
						<p className='mt-3 text-xs font-bold text-red-600'>
							{error.message}
						</p>
					)}
				</form>
			</div>
			<p className='mt-2 text-gray-700 md:mt-4'>
				Already have an account?
				<Link
					className='text-indigo-700 transition-colors hover:text-indigo-800'
					href='/signin'
				>
					{' '}
					Click here to sign in
				</Link>
			</p>
		</main>
	);
}
