import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
//import { POSTS } from "../../utils/db/dummy";
import { useQuery } from '@tanstack/react-query';
import { useEffect } from "react";

const Posts = ({feedType, username, userId}) => {

	const getPostEndpoint = () => {
		switch(feedType){
			case "forYou":
				return "/api/posts/all";
			case "following":
				return "/api/posts/following";
			case "mealprep":
				return "/api/posts/mealprep";
			case "workout":
				return "/api/posts/workout";
			case "posts":
				return `/api/posts/user/${username}`;
			case "likes":
				return `/api/posts/likes/${userId}`;
			case "userMealprep":
				return `/api/posts/category/mealprep/user/${username}`;
			case "userWorkout":
				return `/api/posts/category/workout/user/${username}`;
			default :
				return "/api/posts/all";
		}
	};

	const POST_ENDPOINT = getPostEndpoint();

	const {data:posts, isLoading, refetch, isRefetching} = useQuery({
		queryKey: ["posts", feedType, username, userId],
		queryFn: async () => {
			try {

				const res = await fetch(POST_ENDPOINT);
				const data = await res.json();

				if(!res.ok){
					throw new Error(data.error || "Something went wrong");
				}

				return data;
			
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	useEffect(() => {
		refetch();

	}, [feedType, refetch, username]);

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;