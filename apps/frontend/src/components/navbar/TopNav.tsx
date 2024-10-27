'use client';

import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { LuLogIn } from 'react-icons/lu';

import { UserDto } from '@/api';
import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { userApi } from '@/network/api';

export function TopNav() {
  const router = useRouter();
  const [user, setUser] = useState<UserDto | null>(null);

  const fetchUser = async () => {
    const token = Cookies.get('accessToken');

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const { data: userData } = await userApi.userControllerMe();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener('auth-changed', handleAuthChange);

    return () => {
      window.removeEventListener('auth-changed', handleAuthChange);
    };
  }, []);

  const signIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`;
  };

  const signOut = async () => {
    Cookies.remove('accessToken');
    setUser(null);
    window.dispatchEvent(new Event('auth-changed'));
    router.push('/');
  };

  const redirectToProfile = () => {
    router.push('/users/me');
  };

  return (
    <nav className='flex w-full justify-between border-b p-3 text-2xl font-semibold mb-2'>
      <div className='flex flex-row items-center gap-5'>
        <Link href='/'>
          <Logo width='64' height='64' />
        </Link>
        <div>Dine & Dash</div>
      </div>
      <div className='flex flex-row items-center gap-4 px-2'>
        <Link href='/admin'>Admin</Link>

        <Link href='/cart'>
          <IoCartOutline />
        </Link>

        <ModeToggle />

        {user ? (
          <div className='flex items-center gap-3'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='rounded-full'>
                  <Image src={user.image} alt='user' width={40} height={40} className='rounded-full' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={redirectToProfile}>My Account</DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button variant='outline' size='icon' onClick={signIn}>
            <LuLogIn />
          </Button>
        )}
      </div>
    </nav>
  );
}
