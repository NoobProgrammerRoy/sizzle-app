import { reviewSchema } from '@/utils/types/review';
import { SyntheticEvent, useState } from 'react';
import { z } from 'zod';

export default function ReviewPage() {
	const [review, setReview] = useState<z.infer<typeof reviewSchema>>({
		name: '',
		contact: '',
		taste: 0,
		service: 0,
		ambience: 0,
		pricing: 0,
		recommend: 0,
		info: '',
		feedback: '',
	});
	const [error, setError] = useState<boolean>(false);

	// Function to handle input change
	function handleChange(e: SyntheticEvent) {
		const { value, id, name } = e.target as HTMLInputElement;

		if (id === 'name') {
			setReview({ ...review, name: value });
		} else if (id === 'contact') {
			setReview({ ...review, contact: value });
		} else if (name === 'taste') {
			setReview({ ...review, taste: +value });
		} else if (name === 'service') {
			setReview({ ...review, service: +value });
		} else if (name === 'ambience') {
			setReview({ ...review, ambience: +value });
		} else if (name === 'pricing') {
			setReview({ ...review, pricing: +value });
		} else if (name === 'recommend') {
			setReview({ ...review, recommend: +value });
		} else if (id === 'info') {
			setReview({ ...review, info: value });
		} else if (id === 'feedback') {
			setReview({ ...review, feedback: value });
		}
	}

	// Function to handle review submission
	function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();
		const result = reviewSchema.safeParse(review);
		if (result.success) {
		} else {
			setError(true);
		}
	}

	return (
		<main className='min-h-screen w-full bg-gradient-to-b from-red-600 to-red-100 p-4 md:p-8'>
			<p className='flex flex-row items-center justify-center space-x-1  text-2xl font-bold text-white'>
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
			</p>
			{/* Details section */}
			<section className='mx-auto my-4 max-w-2xl rounded bg-gray-50 p-4 shadow md:p-8'>
				<div className='flex w-full flex-row items-center justify-start space-x-4'>
					<div className='aspect-square h-16 w-16 rounded-full bg-gray-300'>
						{/* Image */}
					</div>
					<div>
						<h1 className='text-2xl font-bold text-gray-700 '>
							Restaurant name
						</h1>
						<p className='text-base text-gray-500'>Restaurant description</p>
					</div>
				</div>
			</section>

			{/* Form section */}
			<section className='mx-auto my-4 max-w-2xl rounded bg-gray-50 p-4 shadow md:p-8'>
				<h2 className='mb-1 text-lg font-bold text-gray-700'>Add a review</h2>
				<p className='mb-4  text-sm text-gray-500'>
					<span className='mr-1 text-red-600'>*</span>
					Required
				</p>
				<form onSubmit={handleSubmit}>
					<label className='mb-1 block text-sm ' htmlFor='name'>
						Name<span className='pl-1 text-red-600'>*</span>
					</label>
					<input
						value={review.name}
						onChange={handleChange}
						className='mb-4 block w-full rounded border border-gray-300 p-2 text-sm outline-none valid:border-green-500 focus:valid:border-green-500 focus:invalid:border-red-600'
						type='text'
						id='name'
						placeholder='Name'
						required
					/>
					<label className='mb-1 block text-sm ' htmlFor='contact'>
						Contact<span className='pl-1 text-red-600'>*</span>
					</label>
					<input
						value={review.contact}
						onChange={handleChange}
						className='mb-4 block w-full rounded border border-gray-300 p-2 text-sm outline-none valid:border-green-500 focus:valid:border-green-500 focus:invalid:border-red-600'
						type='text'
						id='contact'
						placeholder='Contact number'
						required
					/>

					{/* Taste */}
					<label className='mb-1 block text-sm ' htmlFor='taste'>
						Taste<span className='pl-1 text-red-600'>*</span>
					</label>
					<div className='mb-4 flex flex-row items-center justify-center space-x-1 md:space-x-2'>
						<span className='text-xs text-gray-700'>Poor</span>
						{[1, 2, 3, 4, 5].map((value, index) => {
							return (
								<label htmlFor={'taste' + value} key={'taste' + value}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className={`h-8 w-8 cursor-pointer stroke-gray-500 md:h-10 md:w-10 ${
											review.taste >= value ? 'fill-yellow-300' : ''
										}`}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
										/>
									</svg>
									<input
										value={value}
										onChange={handleChange}
										className='hidden'
										type='radio'
										name='taste'
										id={'taste' + value}
									/>
								</label>
							);
						})}
						<span className='text-xs  text-gray-700'>Excellent</span>
					</div>

					{/* Service */}
					<label className='mb-1 block text-sm ' htmlFor='service'>
						Service<span className='pl-1 text-red-600'>*</span>
					</label>
					<div className='mb-4 flex flex-row items-center justify-center space-x-1 md:space-x-2'>
						<span className='text-xs text-gray-700'>Poor</span>
						{[1, 2, 3, 4, 5].map((value, index) => {
							return (
								<label htmlFor={'service' + value} key={'service' + value}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className={`h-8 w-8 cursor-pointer stroke-gray-500 md:h-10 md:w-10 ${
											review.service >= value ? 'fill-yellow-300' : ''
										}`}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
										/>
									</svg>
									<input
										value={value}
										onChange={handleChange}
										className='hidden'
										type='radio'
										name='service'
										id={'service' + value}
									/>
								</label>
							);
						})}
						<span className='text-xs  text-gray-700'>Excellent</span>
					</div>

					{/* Ambience */}
					<label className='mb-1 block text-sm ' htmlFor='ambience'>
						Ambience<span className='pl-1 text-red-600'>*</span>
					</label>
					<div className='mb-4 flex flex-row items-center justify-center space-x-1 md:space-x-2'>
						<span className='text-xs text-gray-700'>Poor</span>
						{[1, 2, 3, 4, 5].map((value, index) => {
							return (
								<label htmlFor={'ambience' + value} key={'ambience' + value}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className={`h-8 w-8 cursor-pointer stroke-gray-500 md:h-10 md:w-10 ${
											review.ambience >= value ? 'fill-yellow-300' : ''
										}`}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
										/>
									</svg>
									<input
										value={value}
										onChange={handleChange}
										className='hidden'
										type='radio'
										name='ambience'
										id={'ambience' + value}
									/>
								</label>
							);
						})}
						<span className='text-xs  text-gray-700'>Excellent</span>
					</div>

					{/* pricing */}
					<label className='mb-1 block text-sm ' htmlFor='pricing'>
						Pricing<span className='pl-1 text-red-600'>*</span>
					</label>
					<div className='mb-4 flex flex-row items-center justify-center space-x-1 md:space-x-2'>
						<span className='text-xs text-gray-700'>Poor</span>
						{[1, 2, 3, 4, 5].map((value, index) => {
							return (
								<label htmlFor={'pricing' + value} key={'pricing' + value}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className={`h-8 w-8 cursor-pointer stroke-gray-500 md:h-10 md:w-10 ${
											review.pricing >= value ? 'fill-yellow-300' : ''
										}`}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
										/>
									</svg>
									<input
										value={value}
										onChange={handleChange}
										className='hidden'
										type='radio'
										name='pricing'
										id={'pricing' + value}
									/>
								</label>
							);
						})}
						<span className='text-xs  text-gray-700'>Excellent</span>
					</div>

					{/* Recommend*/}
					<label className='mb-1 block text-sm ' htmlFor='recommend'>
						How much would you recommend this place to others ?
						<span className='pl-1 text-red-600'>*</span>
					</label>
					<div className='mb-4 flex flex-row items-center justify-center space-x-1 md:space-x-2'>
						<span className='text-xs text-gray-700'>Poor</span>
						{[1, 2, 3, 4, 5].map((value, index) => {
							return (
								<label htmlFor={'recommend' + value} key={'recommend' + value}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className={`h-8 w-8 cursor-pointer stroke-gray-500 md:h-10 md:w-10 ${
											review.recommend >= value ? 'fill-yellow-300' : ''
										}`}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
										/>
									</svg>
									<input
										value={value}
										onChange={handleChange}
										className='hidden'
										type='radio'
										name='recommend'
										id={'recommend' + value}
									/>
								</label>
							);
						})}
						<span className='text-xs  text-gray-700'>Excellent</span>
					</div>

					<span className='mb-1 block text-sm '>
						How did you find out about this place ?
						<span className='pl-1 text-red-600'>*</span>
					</span>
					<div className='mb-4'>
						<div className='mb-1 flex flex-row items-center justify-start'>
							<input
								value={'Regular customer'}
								onChange={handleChange}
								type='radio'
								name='info'
								id='info-1'
							/>
							<label className='block pl-2 text-sm ' htmlFor='info-1'>
								Regular customer
							</label>
						</div>
						<div className='mb-1 flex flex-row items-center justify-start'>
							<input
								value={'Social media'}
								onChange={handleChange}
								type='radio'
								name='info'
								id='info-2'
							/>
							<label className='block pl-2 text-sm ' htmlFor='info-2'>
								Social media
							</label>
						</div>
						<div className='mb-1 flex flex-row items-center justify-start'>
							<input
								value={'Advertisement'}
								onChange={handleChange}
								type='radio'
								name='info'
								id='info-3'
							/>
							<label className='block pl-2 text-sm ' htmlFor='info-3'>
								Advertisement
							</label>
						</div>
						<div className=' flex flex-row items-center justify-start'>
							<input
								value={'Recommendation'}
								onChange={handleChange}
								type='radio'
								name='info'
								id='info-4'
							/>
							<label className='block pl-2 text-sm ' htmlFor='info-4'>
								Recommendation
							</label>
						</div>
						<div className=' flex flex-row items-center justify-start'>
							<input
								value={'Wanted to try a new place'}
								onChange={handleChange}
								type='radio'
								name='info'
								id='info-5'
							/>
							<label className='block pl-2 text-sm ' htmlFor='info-5'>
								Wanted to try a new place
							</label>
						</div>
					</div>
					<label className='mb-1 block text-sm ' htmlFor='feedback'>
						Feedback<span className='pl-1 text-red-600'>*</span>
					</label>
					<input
						value={review.feedback}
						onChange={handleChange}
						className='mb-4 block w-full rounded border border-gray-300 p-2 text-sm outline-none valid:border-green-500 focus:valid:border-green-500 focus:invalid:border-red-600'
						type='text'
						id='feedback'
						placeholder='Feedback'
						required
					/>
					{error && (
						<p className='mb-4 text-xs font-bold text-red-600'>
							Please fill out all the required details
						</p>
					)}
					<button className='block w-full rounded bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-600'>
						Submit review
					</button>
				</form>
			</section>
			<footer>
				<p className='flex flex-row items-center justify-center text-lg text-black md:space-x-1'>
					<span className=''>Powered by Sizzle</span>
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
				</p>
			</footer>
		</main>
	);
}
