'use client';
import { sidebar_links } from '@/constants';
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function LeftSideBar() {
	const router = useRouter();
	const pathname = usePathname();
	const { userId } = useAuth();
	return (
		<section className='custom-scrollbar leftsidebar'>
			<div className='flex w-full flex-col flex-1 gap-3 px-6'>
				<Link href='/' className='flex items-center gap-3 mb-4'>
					<Image src='/logo.png' alt='logo' width={32} height={32} priority />
					<p className='text-heading3-bold text-light-1 max-xs:hidden'>Bambal</p>
				</Link>
				{sidebar_links.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 1) ||
						pathname === link.route;

					if (link.route === '/profile') link.route = `${link.route}/${userId}`;
					return (
						<Link
							href={link.route}
							key={link.label}
							className={`leftsidebar_link ${isActive && 'bg-secondary-500'}`}
						>
							<Image src={link.imgURL} alt={link.label} width={24} height={24} />
							<p className='text-light-1 max-lg:hidden'>{link.label}</p>
						</Link>
					);
				})}
			</div>
			<div className='mt-10 px-6'>
				<SignedIn>
					<SignOutButton
						signOutCallback={() => {
							router.push('/sign-in');
						}}
					>
						<div className='flex cursor-pointer p-4 gap-4'>
							<Image src='/assets/logout.svg' alt='logout' width={24} height={24} />
							<p className='text-light-2 max-lg:hidden'>Logout</p>
						</div>
					</SignOutButton>
				</SignedIn>
			</div>
		</section>
	);
}
