import UserCard from '@/components/cards/UserCard';
import SearchBar from '@/components/shared/SearchBar';
import { fetch_user, fetch_users } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetch_user(user.id);

    if (!userInfo.onboarded) redirect('/onboarding');
    //Fetch users

    const result = await fetch_users({
        userId: user.id,
        search_string: searchParams.q,
        page_number: searchParams?.page ? +searchParams.page : 1,
        page_size: 20
    });

    return (
        <section className='flex flex-col gap-8'>
            <h1 className='head-text'>Search</h1>
            {/* TODO : render a search bar */}

            <SearchBar routeType='search' />

            <div className='flex flex-col gap-6'>
                {result.users.length === 0 ? (
                    <p className='no-result'>No Users Found</p>
                ) : (
                    <>
                        {result.users.map((singleUser) => (
                            <UserCard
                                key={singleUser.username}
                                id={singleUser.userId}
                                username={singleUser.username}
                                name={singleUser.name}
                                image={singleUser.image}
                                userType='User'
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}
