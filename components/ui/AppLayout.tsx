import { useModal } from '@/utils/hooks/use-modal';
import { supabase } from '@/utils/supabase/supbase-client';
import { Inter } from '@next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Modal } from './Modal';
import { useUser } from '@/utils/context/user-context';

const inter = Inter({ subsets: ['latin'] });

const routes = [
	{
		route: '/app',
		name: 'Home',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='h-6 w-6'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
				/>
			</svg>
		),
	},
	{
		route: '/app/reviews',
		name: 'Reviews',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='h-6 w-6'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5'
				/>
			</svg>
		),
	},
	{
		route: '/app/charts',
		name: 'Charts',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				className='h-6 w-6'
			>
				<path d='M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z' />
			</svg>
		),
	},
	{
		route: '/app/settings',
		name: 'Settings',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				className='h-6 w-6'
			>
				<path
					fillRule='evenodd'
					d='M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z'
					clipRule='evenodd'
				/>
			</svg>
		),
	},
];

type appLayout = {
	title: string;
	children: any;
};

export function AppLayout({ title, children }: appLayout) {
	const router = useRouter();
	const { error, setError } = useModal();
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

				if (!session) {
					router.push('/');
					return;
				}

				// Set user context
				const { data, error: dataError } = await supabase
					.from('restaurants')
					.select('name')
					.eq('user_id', session.user.id)
					.single();

				if (dataError) throw dataError;

				context?.setUser({ user: true, name: data.name, id: session.user.id });
			} catch (err) {
				router.push('/');
			}
		}

		isUserLoggedIn();
	}, []);

	// Function to sign out logged in user
	async function handleClick() {
		try {
			const { error } = await supabase.auth.signOut();

			if (error) throw error;

			// Redirect user to home page
			router.push('/');
			context?.setUser({ user: false });
		} catch (err) {
			setError(true);
		}
	}

	// Editing here
	return (
		<main
			className={`${inter.className} flex h-screen w-full flex-row items-center justify-start`}
		>
			<nav className='absolute left-0 bottom-0 flex w-full flex-row items-center justify-between border-t border-gray-300 bg-gray-50 py-0 md:static md:h-screen md:w-80 md:flex-col md:justify-start md:border-r md:py-4'>
				<div className='hidden w-full flex-row items-center justify-start space-x-4 px-2 md:flex md:px-4'>
					<div className='grid h-12 w-12 content-center justify-items-center rounded-full bg-gradient-to-r from-green-600 to-green-400'>
						<span className='text-2xl font-medium text-gray-50'>
							{context?.user.name ? context?.user.name[0] : ''}
						</span>
					</div>
					<h1 className='hidden w-fit truncate text-xl font-bold md:block'>
						{context?.user.name ? context?.user.name : ''}
					</h1>
				</div>
				<ul className='flex w-full flex-row items-center justify-between md:mt-8 md:block'>
					{routes.map((route) => (
						<li key={route.name} className='w-full'>
							<Link
								className={`${
									router.pathname === route.route
										? 'bg-green-100 text-green-700'
										: 'text-gray-700'
								} my-0 flex flex-col items-center justify-center p-2 font-medium transition-colors hover:bg-green-200 hover:text-green-800 md:flex-row md:justify-start md:space-x-2 md:p-4  `}
								href={route.route}
							>
								<span>{route.icon}</span>
								<span className='text-xs md:block md:text-base'>
									{route.name}
								</span>
							</Link>
						</li>
					))}
				</ul>
				<div className='mt-auto hidden w-full px-2 md:block md:px-4'>
					<h2 className='flex flex-row items-center justify-center space-x-1 text-sm text-gray-700'>
						<span className='hidden font-medium md:block'>Powered by </span>
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
					</h2>
				</div>
			</nav>
			<section className='flex h-screen w-full flex-col items-center justify-start bg-gray-100'>
				<div className='z-10 flex w-full flex-row items-center justify-between space-x-2 bg-gray-100 p-4 shadow-md '>
					<h2 className='text-lg font-medium text-gray-900'>{title}</h2>
					<button
						onClick={handleClick}
						className='flex flex-row items-center justify-center space-x-1 font-medium text-gray-900'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='h-6 w-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
							/>
						</svg>
						<span className='hidden text-sm  md:block'> Sign out</span>
					</button>
				</div>
				<div className='h-full w-full overflow-auto px-4 pt-4 pb-16 md:p-4'>
					{children}
				</div>
			</section>
			{error && (
				<Modal
					status='error'
					message='An error has occured. Please try again later.'
				/>
			)}
		</main>
	);
}
