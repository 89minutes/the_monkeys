'use client';

import { useParams } from 'next/navigation';

import { useSession } from '@/app/session-store-provider';
import { BlogCard } from '@/components/blog/cards/BlogCard';
import { BlogCardListSkeleton } from '@/components/skeletons/blogSkeleton';
import useGetPublishedBlogByUsername from '@/hooks/blog/useGetPublishedBlogByUsername';

export const Blogs = () => {
  const { data: session, status } = useSession();
  const params = useParams<{ username: string }>();
  const { blogs, isLoading, isError } = useGetPublishedBlogByUsername(
    params.username
  );

  if (isError)
    return (
      <div className='min-h-screen'>
        <p className='w-full text-sm opacity-80 text-center'>
          No blogs published yet.
        </p>
      </div>
    );

  return (
    <div className='min-h-screen'>
      <div className='flex flex-col gap-8 lg:gap-10'>
        {isLoading ? (
          <BlogCardListSkeleton />
        ) : !blogs?.blogs || blogs?.blogs?.length === 0 ? (
          <p className='w-full text-sm opacity-80 text-center'>
            No blogs published yet.
          </p>
        ) : (
          blogs?.blogs &&
          blogs?.blogs.map((blog) => {
            return (
              <BlogCard
                key={blog?.blog_id}
                blog={blog}
                status={status}
                modificationEnable={session?.user?.username === params.username}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
