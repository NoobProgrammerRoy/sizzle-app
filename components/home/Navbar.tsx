import Link from 'next/link';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

const routes = [
	{
		route: '#about',
		name: 'About',
	},
	{
		route: '#features',
		name: 'Features',
	},
	{
		route: '#pricing',
		name: 'Pricing',
	},
	{
		route: '#contact',
		name: 'Contact',
	},
	{
		route: '/signin',
		name: 'Sign in',
	},
];

export function Navbar() {
	return (
		<header
			className={`${inter.className} fixed top-0 left-0 z-10 w-full bg-gradient-to-b from-gray-50 to-white p-4 shadow-md`}
		>
			<nav className='container mx-auto flex flex-row justify-between'>
				<div className='flex flex-row items-start justify-start space-x-1 text-gray-700'>
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
					<p className='text-xl font-bold'>Sizzle</p>
				</div>
				<ul className='flex flex-row items-center justify-center space-x-4 text-base'>
					{routes.map((route) => (
						<li key={route.name}>
							<Link
								scroll={false}
								className={`${
									route.name === 'Sign in'
										? 'rounded-sm bg-gradient-to-r from-green-600 to-green-400 px-4 py-2 text-sm text-gray-100 hover:text-gray-100 md:text-base'
										: 'hidden text-gray-600 hover:text-gray-900 md:block'
								} font-medium transition-colors`}
								href={route.route}
							>
								{route.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
