'use client';

import { Loader } from '@/components/loader';
import useGetActivities from '@/hooks/user/useGetActivities';

import { ActivityCard } from './components/ActivityCard';

const ActivityPage = ({ searchParams }: { searchParams: { user: string } }) => {
  const { activities, isError, isLoading } = useGetActivities(
    searchParams.user
  );

  if (isLoading) {
    return (
      <div className='flex flex-col items-center space-y-2'>
        <Loader />
        <p className='font-jost'>Fetching all activity</p>
      </div>
    );
  }

  if (isError) {
    return (
      <p className='mb-4 font-jost text-sm text-alert-red text-center'>
        Activity info not available
      </p>
    );
  }

  return (
    <div className='mx-auto w-full sm:w-4/5 md:w-3/5 px-4'>
      {activities?.response.length ? (
        activities?.response.slice(0, 15).map((activity) => {
          return (
            <div key={activity?.timestamp.toString()}>
              <ActivityCard activity={activity} />
              <div className='h-4 mx-auto w-[4px] bg-secondary-lightGrey/25' />
            </div>
          );
        })
      ) : (
        <p className='col-span-2 sm:col-span-3 font-jost text-center opacity-75'>
          No activity available at this moment.
        </p>
      )}
    </div>
  );
};

export default ActivityPage;
