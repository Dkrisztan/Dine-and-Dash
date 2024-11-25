'use client';

import { TbCircleCheckFilled } from 'react-icons/tb';

export default function PaymentSuccessPage() {
  return (
    <main className='flex items-center justify-center flex-1'>
      <div>Sikeres fizetés</div>
      <div className='flex flex-col items-center gap-5'>
        <TbCircleCheckFilled size={50} className='text-green-500' />
        <div className='text-center'>
          <h1>Sikeres fizetés</h1>
        </div>
      </div>
    </main>
  );
}
