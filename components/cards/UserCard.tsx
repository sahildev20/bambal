'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { UserCardProps } from '@/types';

export default function UserCard({
	id,
	username,
	name,
	image,
	userType,
}: UserCardProps) {
	const router = useRouter();
	return (
		<article
			className='user-card cursor-pointer'
			onClick={() => router.push(`/profile/${id}`)}
		>
			<div className='user-card_avatar'>
				<div className='relative rounded-full w-11 h-11'>
					<Image
						src={image}
						alt='Profile pic'
						fill
						className='rounded-full object-cover'
					/>
				</div>
				<div className='flex-1 text-ellipsis'>
					<h4 className='text-small-semibold text-light-1'>{name}</h4>
					<p className='text-small-medium text-gray-1'>@{username}</p>
				</div>
			</div>
		</article>
	);
}
