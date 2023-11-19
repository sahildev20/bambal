import { Suspense } from 'react';
import SuggestedUsers from './SuggestedUsers';
import UsersSkeleton from '../skeleton/UsersSkeleton';

export default function RightSideBar() {
	return (
		<section className='custom-scrollbar rightsidebar'>
			<div className='flex flex-col'>
				<p className='head-text text-light-1'>Suggested Users</p>
				<Suspense key='rightsidebar' fallback={<UsersSkeleton />}>
					<SuggestedUsers />
				</Suspense>
			</div>
		</section>
	);
}
