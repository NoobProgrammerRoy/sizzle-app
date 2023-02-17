import { useError } from '@/utils/hooks/use-error';
import { useState } from 'react';

type modal = {
	status?: 'loading' | 'success' | 'error' | undefined;
	message: string;
};

export function Modal({ status = undefined, message }: modal) {
	return (
		<div className='fixed top-0 left-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.7)] p-4'>
			<div className='w-full max-w-sm rounded bg-gray-50 p-4 shadow md:p-8'>
				{status === 'loading' && (
					<span className='mx-auto mb-4 block w-fit'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='h-12 w-12 animate-spin stroke-green-600'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
							/>
						</svg>
					</span>
				)}
				{status === 'success' && (
					<span className='mx-auto mb-4 block w-fit'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='h-12 w-12 fill-green-100 stroke-green-600'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					</span>
				)}
				{status === 'error' && (
					<span className='mx-auto mb-4 block w-fit'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='h-12 w-12 fill-red-200 stroke-red-600'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					</span>
				)}
				<p className='text-center font-bold text-gray-700'>{message}</p>
			</div>
		</div>
	);
}
