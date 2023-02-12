import { ReactNode } from 'react';

type featureCard = {
	icon: ReactNode;
	title: string;
	text: string;
};

export function FeatureCard({ icon, title, text }: featureCard) {
	return (
		<div className='mx-auto flex max-w-sm flex-col items-center justify-start rounded bg-white p-4 shadow-md md:p-8'>
			<span className=''>{icon}</span>
			<h3 className='mt-4 mb-2 w-full text-center text-base font-bold text-gray-800 md:text-xl'>
				{title}
			</h3>
			<p className='w-full text-sm font-medium text-gray-600 md:text-base'>
				{text}
			</p>
		</div>
	);
}
