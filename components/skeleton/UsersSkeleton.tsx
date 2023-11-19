import React from 'react';

const UsersSkeleton = () => {
	function Skeleton() {
		return (
			<div className='flex items-center gap-3'>
				<div className='md:h-8 md:w-8 rounded-full bg-gray-500 h-6 w-6 mb-2.5'></div>
				<div className='w-fit'>
					<div className='md:h-3 h-2 bg-gray-300 rounded-full w-16 mb-2'></div>
					<div className='w-6 h-1.5 bg-gray-500 rounded-full '></div>
				</div>
			</div>
		);
	}
	return (
		<div
			role='status'
			className='space-y-4  divide-gray-700 shadow animate-pulse mt-6'
		>
			{[...Array(2)].map((_, index) => (
				<Skeleton key={index} />
			))}
			<span className='sr-only'>Loading...</span>
		</div>
	);
};

export default UsersSkeleton;
