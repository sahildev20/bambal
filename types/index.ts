export interface ThreadProps {
    id: string;
    current_user_id: string;
    // parent: string;
    content: string;
    // createdAt: string;
    // community: {
    //     id: string;
    //     name: string;
    //     image: string;
    // } | null;

    author: {
        name: string;
        username: string;
        image: string;
        userId: string;
    }

    comments: {
        author: {
            image: string;
        }
    }[]

    username: string

    isComment?: boolean


}

export interface LikeButtonProps {
    thread_id: string;
    user_id: string;
}

export interface UserCardProps{
    id:string;
    username: string;
    name: string;
    image: string;
    userType: string;
}


export interface ProfileHeaderProps {
    authId:string
    son_id: string;
    dad_id: string;
    name: string;
    username: string;
    imageUrl: string;
    bio: string;
    same_user?: boolean,
  }