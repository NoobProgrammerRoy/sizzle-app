import Link from 'next/link';

const features = [
	'Unlimited reviews',
	'Unlimited access to all portals',
	'Free QR code kit',
	'100 notifications per month (Coming soon)',
];

export function PricingCard() {
	return (
		<div className='mx-auto w-full max-w-md rounded bg-white p-4 shadow shadow-green-600 md:p-8'>
			<h3 className='text-xl font-bold text-gray-900 md:text-3xl'>
				&#8377;499{' '}
				<span className='text-base text-gray-700 md:text-lg'>/ month</span>
			</h3>
			<ul className='mt-6'>
				{features.map((feature) => (
					<li
						key={feature}
						className='flex flex-row items-center justify-start space-x-2 pt-2'
					>
						<span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'
								className='h-6 w-6 fill-white stroke-green-600'
							>
								<path
									fillRule='evenodd'
									d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
									clipRule='evenodd'
								/>
							</svg>
						</span>
						<span className='text-sm font-medium text-gray-700 md:text-base'>
							{feature}
						</span>
					</li>
				))}
			</ul>
			<Link
				href={'signup'}
				className='mt-8 block w-fit rounded bg-gradient-to-r from-green-600 to-green-400 px-4 py-2 text-sm font-medium text-gray-100'
			>
				Get started
			</Link>
		</div>
	);
}
