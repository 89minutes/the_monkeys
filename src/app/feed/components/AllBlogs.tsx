import { FeedBlogCard } from '@/components/blog/cards/FeedBlogCard';
import { FeedListCardSkeleton } from '@/components/skeletons/blogSkeleton';
import useGetLatest100Blogs from '@/hooks/blog/useGetLatest100Blogs';

export const AllBlogs = ({
  status,
}: {
  status: 'authenticated' | 'loading' | 'unauthenticated';
}) => {
  const { blogs, isLoading, isError } = useGetLatest100Blogs();

  return (
    <div className='flex flex-col gap-6 sm:gap-8'>
      {isLoading ? (
        <div className='w-full space-y-6'>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <FeedListCardSkeleton key={index} />
            ))}
        </div>
      ) : !blogs?.the_blogs || blogs?.the_blogs?.length === 0 ? (
        <p className='font-roboto text-sm opacity-80'>No blogs available.</p>
      ) : (
        blogs?.the_blogs.map((blog) => {
          return blog.blog.blocks.length < 5 ? null : (
            <FeedBlogCard key={blog.blog_id} blog={blog} status={status} />
          );
        })
      )}
    </div>
  );
};
