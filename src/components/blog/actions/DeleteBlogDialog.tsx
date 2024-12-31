'use client';

import React from 'react';

import Icon from '@/components/icon';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { useSession } from '@/lib/store/useSession';
import axiosInstance from '@/services/api/axiosInstance';
import { mutate } from 'swr';

export const DeleteBlogDialog = ({
  blogId,
  isDraft,
}: {
  blogId: string;
  isDraft?: boolean;
}) => {
  const { data: session } = useSession();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const accountId = session?.user.account_id;

  async function deleteBlogById(blogId?: string) {
    setLoading(true);

    try {
      const response = await axiosInstance.delete(`/blog/${blogId}`);

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Deleted successfully',
        });

        setOpen(false);
      }

      {
        isDraft
          ? mutate(`/blog/all/drafts/${accountId}`, undefined, {
              revalidate: true,
            })
          : mutate(`/blog/all/publishes/${accountId}`, undefined, {
              revalidate: true,
            });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          variant: 'error',
          title: 'Error',
          description: err.message || 'Failed to delete blog.',
        });
      } else {
        toast({
          variant: 'error',
          title: 'Error',
          description: 'An unknown error occured.',
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className='p-1 flex items-center justify-center cursor-pointer hover:opacity-80'
          title='Delete Blog'
        >
          <Icon name='RiDeleteBin6' size={18} className='text-alert-red' />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>{isDraft ? 'Remove Draft' : 'Delete Blog'}</DialogTitle>

        <DialogDescription className='hidden'></DialogDescription>

        <p className='opacity-80'>
          Are you sure you want to delete this blog? This action cannot be
          undone.
        </p>

        <div className='pt-4'>
          <Button
            type='button'
            variant='destructive'
            className='w-fit float-right'
            onClick={() => deleteBlogById(blogId)}
            disabled={isLoading}
          >
            {isLoading && <Loader />}
            Yes, {isDraft ? 'Remove' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
