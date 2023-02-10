import { Form } from '@/components/form/Form';
import { Button } from '@/components/form/Button';
import { Label } from '@/components/form/Label';
import { TextField } from '@/components/form/TextField';
import { Alert } from '@/components/ui/Alert';
import { Inter } from '@next/font/google';
import { useError } from '@/utils/hooks/use-error';
import { z } from 'zod';
import { useForm } from '@/utils/hooks/use-form';
import { SyntheticEvent, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/supbase-client';
import { useRouter } from 'next/router';
import { Info } from '@/components/form/Info';
import { useUser } from '@/utils/context/user-context';

const inter = Inter({ subsets: ['latin'] });

// Schema for sign up data
const schema = z.object({
	name: z.string().regex(/^[a-zA-Z0-9\s]{1,100}$/),
	contact: z.string().regex(/^[0-9]{10}$/),
	email: z.string().email(),
	password: z.string().regex(/^[a-zA-Z0-9]{6,18}$/),
	confirmPassword: z.string().regex(/^[a-zA-Z0-9]{6,18}$/),
});

// Regex for contact
const contactRegex = /^[0-9]{0,10}$/;

export default function signup() {
	const [formData, setFormData] = useForm({
		name: '',
		contact: '',
		email: '',
		password: '',
		confirmPassword: '',
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

						// Redirect user to app
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

		if (id === 'name') {
			setFormData({ ...formData, name: value });
		} else if (id === 'contact') {
			if (contactRegex.test(value)) {
				setFormData({ ...formData, contact: value });
			}
		} else if (id === 'email') {
			setFormData({ ...formData, email: value });
		} else if (id === 'password') {
			setFormData({ ...formData, password: value });
		} else if (id === 'confirm-password') {
			setFormData({ ...formData, confirmPassword: value });
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

		if (formData.password !== formData.confirmPassword) {
			setError({
				error: true,
				message: 'Passwords do not match',
			});
			return;
		}

		// Send data to the server and sign up new user
		// Create new user in supabase
		try {
			const {
				data: { user },
				error: signupError,
			} = await supabase.auth.signUp({
				email: formData.email,
				password: formData.password,
			});

			if (signupError) throw signupError;

			// Add details to newly created user
			const { error: updateError } = await supabase
				.from('restaurants')
				.update({
					name: formData.name.trim(),
					contact: formData.contact,
				})
				.eq('user_id', user?.id);

			if (updateError) throw updateError;

			context?.setUser({
				user: true,
				name: formData.name.trim(),
				id: user?.id,
			});

			// Redirect user to app
			router.push('/app');
		} catch (err: any) {
			setError({
				error: true,
				message: err.message,
			});
		}
	}

	return (
		<main
			className={`${inter.className} flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-green-300 to-green-100 p-4`}
		>
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
			<p className='mt-2 text-base text-gray-700'>
				Sign up to create an account
			</p>
			<div className='my-4'>
				{error.error && <Alert variant='danger' text={error.message} />}
			</div>
			<Form onSubmit={handleSubmit}>
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
					<Info text='Password must contain only alphanumeric characters.' />
					<Info text='Password must be 6-18 characters in length.' />
				</div>
				<div className='mb-4'>
					<div className='mb-1'>
						<Label id='confirm-password' text='Confirm password' />
					</div>
					<TextField
						value={formData.confirmPassword}
						onChange={handleChange}
						type='password'
						name='confirm-password'
						id='confirm-password'
						placeholder='Confirm password'
						required={true}
					/>
				</div>
				<Button text='Create an account' variant='full' />
			</Form>
			<p className='mt-4 text-gray-700'>
				Already have an account?{' '}
				<Link
					className='text-indigo-600 hover:text-indigo-800'
					href={'/signin'}
				>
					Click here to sign in
				</Link>
			</p>
		</main>
	);
}
