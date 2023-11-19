'use client';

import { follow_user, is_follower } from '@/lib/actions/user.actions';
import React, { useEffect, useState } from 'react';

const FollowCard = ({ son_id, dad_id }: { son_id: string; dad_id: string }) => {
	const [following, setFollowing] = useState<boolean>();

	useEffect(() => {
		const fetch_status = async () => {
			const is_following = await is_follower(son_id, dad_id);
			setFollowing(is_following);
		};
		fetch_status();
	}, [dad_id]);
	const toggleFollow = async () => {
		const result = await follow_user(son_id, dad_id);
		if (result == 'follow') {
			setFollowing(true);
		} else if (result == 'unfollow') {
			setFollowing(false);
		}
		return;
	};
	return (
		<div>
			{following ? (
				<button
					onClick={toggleFollow}
					className='outline outline-2 outline-slate-500 text-white font-bold px-6 rounded-full'
				>
					Following..
				</button>
			) : (
				<button
					onClick={toggleFollow}
					className='bg-white text-black font-bold px-6 rounded-full'
				>
					Follow
				</button>
			)}
		</div>
	);
};

export default FollowCard;
