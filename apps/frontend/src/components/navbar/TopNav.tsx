'use client';

import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { LuLogIn, LuLogOut, LuUser } from 'react-icons/lu';

import { CartDto, UserDto } from '@/api';
import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cartApi, userApi } from '@/network/api';

export function TopNav() {
  const router = useRouter();
  const [user, setUser] = useState<UserDto | null>(null);
  const [cart, setCart] = useState<CartDto | null>(null);

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

  const getCartForMe = async () => {
    const { data: cart } = await cartApi.cartControllerGetCart();
    setCart(cart);
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

        <Sheet key={user?.id}>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' onClick={getCartForMe}>
              <IoCartOutline fontSize={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side='right'>
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
              <SheetDescription>Items in your cart.</SheetDescription>
            </SheetHeader>
            <div className='grid gap-4 py-4'>
              {cart?.items?.map((item) => {
                return (
                  <div key={item.id} className='flex items-center gap-4'>
                    <Image src={item.food.image} alt={item.food.name} width={64} height={64} className='rounded-xl' />
                    <div>
                      <div className='text-lg font-bold'>{item.food.name}</div>
                      <div>{item.food.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type='submit'>Order</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

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
                <DropdownMenuItem onClick={redirectToProfile} className='gap-1'>
                  <LuUser fontSize={18} />
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className='gap-1'>
                  <LuLogOut fontSize={18} />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button variant='outline' size='icon' onClick={signIn}>
            <LuLogIn fontSize={18} />
          </Button>
        )}
      </div>
    </nav>
  );
}
