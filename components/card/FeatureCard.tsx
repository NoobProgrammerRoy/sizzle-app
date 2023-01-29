import { ReactNode } from 'react';

type featureCard = {
	icon: ReactNode;
	text: string;
};

export function FeatureCard({ icon, text }: featureCard) {
	return (
		<div className='mx-auto flex max-w-sm flex-col items-center justify-start rounded bg-white p-4 shadow md:p-8'>
			<span className=''>{icon}</span>
			<p className='mt-4 w-full text-sm text-gray-600 md:text-base'>{text}</p>
		</div>
	);
}
