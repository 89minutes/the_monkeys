'use client';

import dynamic from 'next/dynamic';

import { ContributeAndSponsorCard } from '@/components/branding/sponsor/ContributeAndSponsorCard';
import Container from '@/components/layout/Container';
import {
  EditorBlockSkeleton,
  PublishedBlogSkeleton,
} from '@/components/skeletons/blogSkeleton';
import { Separator } from '@/components/ui/separator';
import { ProfileInfoCard } from '@/components/user/cards/ProfileInfoCard';
import useGetPublishedBlogDetailByBlogId from '@/hooks/blog/useGetPublishedBlogDetailByBlogId';

import { BlogInfoSection } from './components/blog/BlogInfoSection';
import { BlogReactions } from './components/blog/BlogReactions';
import { BlogRecommendations } from './components/blog/BlogRecommendations';
import { BlogTopics } from './components/blog/BlogTopics';

const Editor = dynamic(() => import('@/components/editor/preview'), {
  ssr: false,
  loading: () => <EditorBlockSkeleton />,
});

const BlogPage = ({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) => {
  const { blog, isError, isLoading } = useGetPublishedBlogDetailByBlogId(
    searchParams.id
  );

  if (isLoading) {
    return <PublishedBlogSkeleton />;
  }

  if (isError)
    return (
      <Container className='min-h-screen'>
        <p className='py-4 font-roboto text-sm text-alert-red text-center'>
          Error fetching blog. Try again.
        </p>
      </Container>
    );

  return (
    <Container className='pb-12 min-h-screen grid grid-cols-3'>
      <div className='p-4 col-span-3 lg:col-span-2'>
        <BlogInfoSection blog={blog} />

        <Separator className='mt-2' />

        <Editor key={blog?.blog_id} data={blog?.blog} />

        <Separator className='mt-10 mb-4' />

        <BlogReactions blogId={blog?.blog_id} />
      </div>

      <div className='p-4 col-span-3 lg:col-span-1 space-y-6'>
        <div>
          <h4 className='px-1 font-dm_sans font-medium text-sm md:text-base'>
            About author
          </h4>

          <Separator className='mt-1 mb-2' />

          <ProfileInfoCard userId={blog?.owner_account_id} />
        </div>

        <BlogTopics topics={blog?.tags || []} />

        <ContributeAndSponsorCard className='mb-6' />

        <BlogRecommendations />
      </div>
    </Container>
  );
};

export default BlogPage;
