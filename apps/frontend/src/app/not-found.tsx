import Image from 'next/image';

import notFoundImage from '../assets/undraw_not_found.svg';

export default function NotFoundPage() {
  return (
    <div className='flex flex-col gap-10 flex-grow items-center justify-center'>
      <Image src={notFoundImage} alt='404' width={450} height={450} />
      <h1 className='text-5xl font-bold'>Page not found</h1>
    </div>
  );
}
