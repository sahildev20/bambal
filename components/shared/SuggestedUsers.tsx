import { fetch_user, fetch_users } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';
import UserCard from '../cards/UserCard';

const SuggestedUsers = async () => {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetch_user(user.id);

	if (!userInfo.onboarded) redirect('/onboarding');
	//Fetch users

	const result = await fetch_users({
		userId: user.id,
		page_number: 1,
		page_size: 20,
	});

	return (
		<section className='flex flex-col gap-3 mt-8'>
			{result.users.map((userchild) => (
				<UserCard
					key={userchild.username}
					id={userchild.userId}
					username={userchild.username}
					name={userchild.name}
					image={userchild.image}
					userType='User'
				/>
			))}
		</section>
	);
};

export default SuggestedUsers;
