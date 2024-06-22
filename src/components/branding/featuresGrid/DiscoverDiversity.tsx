import Image from 'next/image';

import Icon from '@/components/icon';

import { GridContainer, GridHeading, GridSubHeading } from './gridLayout';

const DiscoverDiversity = () => {
  return (
    <GridContainer className='group'>
      <Icon
        name='RiCompass3'
        className='mb-2 text-secondary-darkGrey dark:text-secondary-white'
        size={24}
      />

      <GridHeading>Discover your interests with confidence</GridHeading>

      <GridSubHeading>
        Navigate through a diverse array of categories tailored to your
        interests.
      </GridSubHeading>

      <div className='mt-4 flex justify-center gap-1 h-44 overflow-hidden'>
        <div className='-mt-2 group-hover:-mt-16 w-fit space-y-1 transition-all hidden sm:block'>
          <div className='w-32 sm:w-36 h-10 bg-secondary-darkGrey/10 dark:bg-secondary-white/10 rounded-full' />
          <div className='w-32 sm:w-36 h-10 flex items-center justify-center font-jost text-sm sm:text-base text-secondary-white dark:text-secondary-darkGrey bg-primary-monkeyBlack dark:bg-primary-monkeyWhite rounded-full'>
            Technology
          </div>
          <div className='w-32 sm:w-36 h-10 bg-secondary-darkGrey/10 dark:bg-secondary-white/10 rounded-full' />
          <div className='w-32 sm:w-36 h-10 flex items-center justify-center font-jost text-sm sm:text-base text-secondary-white dark:text-secondary-darkGrey bg-primary-monkeyBlack dark:bg-primary-monkeyWhite rounded-full'>
            Music
          </div>
          <div className='w-32 sm:w-36 h-10 bg-secondary-darkGrey/10 dark:bg-secondary-white/10 rounded-full' />
          <div className='w-32 sm:w-36 h-10 bg-secondary-darkGrey/10 dark:bg-secondary-white/10 rounded-full' />
        </div>

        <div className='-mt-16 group-hover:-mt-2 mr-4 w-fit space-y-1 transition-all hidden sm:block'>
          <div className='w-32 sm:w-36 h-10 bg-secondary-darkGrey/10 dark:bg-secondary-white/10 rounded-full' />
          <div className='w-32 sm:w-36 h-10 flex items-center justify-center font-jost text-sm sm:text-base text-secondary-white dark:text-secondary-darkGrey bg-primary-monkeyBlack dark:bg-primary-monkeyWhite rounded-full'>
            Science
          </div>
          <div className='w-32 sm:w-36 h-10 bg-secondary-darkGrey/10 dark:bg-secondary-white/10 rounded-full' />
          <div className='w-32 sm:w-36 h-10 flex items-center justify-center font-jost text-sm sm:text-base text-secondary-white dark:text-secondary-darkGrey bg-primary-monkeyBlack dark:bg-primary-monkeyWhite rounded-full'>
            Health
          </div>
          <div className='w-32 sm:w-36 h-10 bg-secondary-darkGrey/10 dark:bg-secondary-white/10 rounded-full' />
          <div className='w-32 sm:w-36 h-10 flex items-center justify-center font-jost text-sm sm:text-base text-secondary-white dark:text-secondary-darkGrey bg-primary-monkeyBlack dark:bg-primary-monkeyWhite rounded-full'>
            Lifestyle
          </div>
        </div>

        <div className='flex-1 block md:hidden lg:block'>
          <Image
            src='./topics.svg'
            width='300'
            height='300'
            alt='Topics'
            className='mx-auto object-fill'
          />
        </div>
      </div>
    </GridContainer>
  );
};

export default DiscoverDiversity;
