'use client';

import { Loader } from '@/components/loader';
import useGetLatest100Blogs from '@/hooks/useGetLatest100Blogs';
import useGetPublishedBlogByAccountId from '@/hooks/useGetPublishedBlogByAccountId';
import { useSession } from 'next-auth/react';

import BlogCard from './BlogCard';

const Blogs = () => {
  const { data: session } = useSession();
  const { blogs, isLoading } = useGetPublishedBlogByAccountId(
    session?.user.account_id
  );

  return (
    <div className='min-h-screen'>
      <div className='flex flex-col items-center'>
        {isLoading ? (
          <Loader />
        ) : !blogs?.blogs || blogs?.blogs?.length === 0 ? (
          <p className='font-jost italic opacity-75'>No blogs available</p>
        ) : (
          blogs?.blogs &&
          blogs?.blogs.map((blog) => {
            return (
              <BlogCard
                key={blog?.blog_id}
                title={blog?.blog?.blocks[0]?.data?.text}
                description={blog?.blog?.blocks[0]?.data?.text}
                author={session?.user.username as string}
                date={blog?.blog?.time}
                tags={blog?.tags}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Blogs;
