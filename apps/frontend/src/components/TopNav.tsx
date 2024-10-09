import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

import Logo from '@/components/Logo';
import { ModeToggle } from '@/components/ui/mode-toggle';

export function TopNav() {
  return (
    <nav className='flex w-full justify-between border-b p-3 text-2xl font-semibold mb-2'>
      <div className='flex flex-row items-center gap-5'>
        <Link href='/' className=''>
          <Logo width='64' height='64' />
        </Link>
        <div>Dine & Dash</div>
      </div>
      <div className='flex flex-row items-center gap-6 px-2'>
        <Link href='/admin'>Admin</Link>
        <div>Account</div>
        <Link href='/cart'>
          <IoCartOutline />
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
