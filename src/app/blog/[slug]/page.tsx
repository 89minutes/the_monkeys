'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import {
  EditorBlockSkeleton,
  PublishedBlogSkeleton,
} from '@/components/skeletons/blogSkeleton';
import { ProfileInfoCard } from '@/components/user/cards/ProfileInfoCard';
import { UserInfoCardBlogPage } from '@/components/user/userInfo';
import useGetPublishedBlogDetailByBlogId from '@/hooks/blog/useGetPublishedBlogDetailByBlogId';
import { purifyHTMLString } from '@/utils/purifyHTML';

import { BlogReactionsContainer } from '../components/BlogReactions';
import { BlogRecommendations } from '../components/BlogRecommendations';
import { BlogTopics, BlogTopicsCompact } from '../components/BlogTopics';

const Editor = dynamic(() => import('@/components/editor/preview'), {
  ssr: false,
  loading: () => <EditorBlockSkeleton />,
});

const BlogPage = () => {
  const params = useParams();

  // Assuming route is `/blog/[slug]`, `params.slug` will contain the full slug.
  const fullSlug = params?.slug || '';
  const blogId = typeof fullSlug === 'string' ? fullSlug.split('-').pop() : ''; // Extract the blog ID from the slug

  const { blog, isError, isLoading } =
    useGetPublishedBlogDetailByBlogId(blogId);

  if (isLoading) {
    return <PublishedBlogSkeleton />;
  }

  if (isError || !blog) {
    return (
      <div className='col-span-3 min-h-screen'>
        <p className='py-4 text-sm text-alert-red text-center'>
          Error fetching blog content. Try again.
        </p>
      </div>
    );
  }

  const blogIdfromAPI = blog?.blog_id;
  const authorId = blog?.owner_account_id;
  const date = blog?.published_time || blog?.blog?.time;
  const tags = blog?.tags;

  const blogTitle = blog?.blog.blocks[0].data.text;
  const blogDataWithoutHeading = {
    ...blog.blog,
    blocks: blog?.blog.blocks.slice(1),
  };

  return (
    <>
      <div className='relative col-span-3 lg:col-span-2'>
        <div className='mb-6'>
          <UserInfoCardBlogPage id={authorId} date={date} />
        </div>

        <div className='space-y-2'>
          <h1
            dangerouslySetInnerHTML={{
              __html: purifyHTMLString(blogTitle),
            }}
            className='font-dm_sans font-bold text-[30px] md:text-[34px] leading-[1.3]'
          ></h1>

          <BlogTopicsCompact topics={blog?.tags} />
        </div>

        <div className='pb-10 min-h-screen overflow-hidden'>
          <Editor key={blogId} data={blogDataWithoutHeading} />
        </div>

        <BlogReactionsContainer blogURL={fullSlug} blogId={blogIdfromAPI} />

        <div className='mt-[50px]'>
          <BlogTopics topics={tags || []} />
        </div>
      </div>

      <div className='col-span-3 lg:col-span-1 space-y-8'>
        <div className='space-y-1'>
          <h4 className='px-1 font-dm_sans font-medium'>Author Spotlight</h4>

          <ProfileInfoCard userId={authorId} className='max-w-[500px]' />
        </div>

        <BlogRecommendations blogId={blogIdfromAPI} />
      </div>
    </>
  );
};

export default BlogPage;
