'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Icon from '@/components/icon';
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
import useGetAuthUserProfile from '@/hooks/useGetAuthUserProfile';
import { updateProfileSchema } from '@/lib/schema/settings';
import { axiosInstance } from '@/services/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Section from './Section';

const Profile = () => {
  const { data } = useSession();
  const { user, isLoading, isError } = useGetAuthUserProfile(
    data?.user.user_name
  );

  useEffect(() => {
    console.log('User:', user);
    console.log('Loading:', isLoading);
    console.log('Error:', isError);
  }, [user, isLoading, isError]);
  const navigate = useRouter();
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      address: user?.address,
      contact_number: user?.contact_number,
      bio: user?.bio,
      date_of_birth: user?.date_of_birth,
      twitter: user?.twitter,
      linkedin: user?.linkedin,
      instagram: user?.instagram,
      github: user?.github,
    },
  });

  function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    console.log(values);
    axiosInstance
      .patch(
        `/user/${data?.user.user_name}`,
        { values },
        {
          headers: {
            Authorization: `Bearer ${data?.user.token}`,
          },
        }
      )
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Your profile has been updated successfully',
        });
      })
      .catch((err) => {
        console.log(err);

        toast({
          variant: 'error',
          title: 'Error',
          description: err.message,
        });
      });
  }

  return (
    <div className='mt-5 p-5'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto space-y-10'
        >
          <Section sectionTitle='Basic'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='col-span-1 sm:col-span-2 flex flex-wrap items-end gap-2'>
                <p className='w-full col-span-1 sm:col-span-2 font-josefin_Sans text-sm'>
                  Profile Image
                </p>

                <div className='rounded-lg size-32 flex border-1 border-secondary-lightGrey/25 bg-secondary-lightGrey/15 items-center justify-center'></div>

                <div className='space-x-2'>
                  <Button size='icon' type='button' variant='destructive'>
                    <Icon name='RiDeleteBin' />
                  </Button>

                  <Button size='icon' type='button' variant='secondary'>
                    <Icon name='RiRefresh' />
                  </Button>
                </div>
              </div>

              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem className='mr-4'>
                    <FormLabel className='font-josefin_Sans text-sm'>
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        {...field}
                        placeholder='Enter first name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='last_name'
                render={({ field }) => (
                  <FormItem className='mr-4'>
                    <FormLabel className='font-josefin_Sans text-sm'>
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        {...field}
                        placeholder='Enter last name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem className='mr-4'>
                    <FormLabel className='font-josefin_Sans text-sm'>
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        {...field}
                        placeholder='Enter location'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='contact_number'
                render={({ field }) => (
                  <FormItem className='mr-4'>
                    <FormLabel className='font-josefin_Sans text-sm'>
                      Contact Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        {...field}
                        placeholder='Enter contact number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='bio'
                render={({ field }) => (
                  <FormItem className='mr-4'>
                    <FormLabel className='font-josefin_Sans text-sm'>
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        {...field}
                        placeholder='Enter bio'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='date_of_birth'
                render={({ field }) => (
                  <FormItem className='mr-4'>
                    <FormLabel className='font-josefin_Sans text-sm'>
                      Birth Date
                    </FormLabel>
                    <FormControl>
                      <Input className='w-full' type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Section>

          <Section sectionTitle='Social'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='twitter'
                render={({ field }) => (
                  <FormItem className='mr-4'>
                    <FormLabel className='font-josefin_Sans text-sm'>
                      Twitter
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        type='url'
                        {...field}
                        placeholder='Enter username'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='linkedin'
                render={({ field }) => (
                  <FormItem className='mr-4'>
                    <FormLabel className='font-josefin_Sans text-sm'>
                      LinkedIn
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        type='url'
                        {...field}
                        placeholder='Enter username'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='instagram'
                render={({ field }) => (
                  <FormItem className='mr-4'>
                    <FormLabel className='font-josefin_Sans text-sm'>
                      Instagram
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        type='url'
                        {...field}
                        placeholder='Enter username'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='github'
                render={({ field }) => (
                  <FormItem className='mr-4'>
                    <FormLabel className='font-josefin_Sans text-sm'>
                      GitHub
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        type='url'
                        {...field}
                        placeholder='Enter username'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Section>

          <Section sectionTitle='Topics'>
            <div>
              <Button variant='secondary'>Add Topic</Button>
            </div>
          </Section>

          <div className='pt-8 flex justify-center items-center'>
            <Button size='lg' type='submit'>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
