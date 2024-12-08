'use client';

import React, { useState } from 'react';

import Icon from '@/components/icon';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { updateEmailSchema } from '@/lib/schema/settings';
import axiosInstance from '@/services/api/axiosInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Email = () => {
  const { data: session, update } = useSession();

  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof updateEmailSchema>>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const updateUserSession = async (token: string) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        token: token,
        email: form.getValues('email'),
      },
    });
  };

  async function reqVerification() {
    setVerifyLoading(true);

    try {
      const response = await axiosInstance.post(
        `/auth/req-email-verification`,
        {
          email: session?.user?.email,
        }
      );

      if (response.status === 200) {
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Email verification request has been sent successfully.',
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          variant: 'error',
          title: 'Error',
          description: err.message || 'Failed to send verification request.',
        });
      } else {
        toast({
          variant: 'error',
          title: 'Error',
          description: 'An unknown error occured.',
        });
      }
    } finally {
      setVerifyLoading(false);
    }
  }

  const onSubmit = async (values: z.infer<typeof updateEmailSchema>) => {
    setUpdateLoading(true);

    try {
      const response = await axiosInstance.put(
        `/auth/settings/email/${session?.user.username}`,
        {
          email: values.email,
        }
      );

      if (response.status === 200) {
        console.log(response, 'this api');

        updateUserSession(response.data.token);
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Your email address has been updated successfully.',
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          variant: 'error',
          title: 'Error',
          description: err.message || 'Failed to update your email address.',
        });
      } else {
        toast({
          variant: 'error',
          title: 'Error',
          description: 'An unknown error occured.',
        });
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className='p-1 space-y-2'>
      <p className='font-roboto text-sm opacity-80'>
        Registered Email: {session?.user?.email}
      </p>

      {!session?.user?.email_verification_status ||
      session?.user?.email_verification_status !== 'Verified' ? (
        <Button
          type='button'
          size='lg'
          className='mt-4'
          onClick={reqVerification}
          disabled={verifyLoading ? true : false}
        >
          {verifyLoading && <Loader />} Verify Email
        </Button>
      ) : (
        <div className='mt-4 flex items-center gap-2'>
          <Icon
            name='RiVerifiedBadge'
            type='Fill'
            className='text-brand-orange'
          />

          <p className='font-roboto'>Email Verified</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='flex items-end flex-wrap gap-2'>
            <div className='w-full sm:w-1/2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-roboto text-sm'>
                      Change Email
                    </FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        placeholder={
                          `eg. ${session?.user?.email}` ||
                          'eg. yourmail@monkeys.xyz'
                        }
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              size='lg'
              type='submit'
              disabled={updateLoading ? true : false}
            >
              {updateLoading && <Loader />} Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
