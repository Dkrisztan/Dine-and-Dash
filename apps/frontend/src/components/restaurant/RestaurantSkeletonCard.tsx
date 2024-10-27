import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function RestaurantSkeletonCard() {
  return (
    <div className='container mx-auto py-3'>
      <Card>
        <CardHeader className='p-0 mb-2'>
          <Skeleton className='rounded-t-xl w-full h-auto object-cover aspect-video' />
        </CardHeader>
        <CardContent>
          <CardTitle className='text-2xl font-semibold'>
            <Skeleton className='w-4/5 h-4 mt-2' />
          </CardTitle>
          <div className='flex items-center gap-2 flex-wrap pt-2'>
            <Skeleton className='w-2/3 h-4' />
            <Skeleton className='w-1/2 h-4' />
          </div>
        </CardContent>
        <CardFooter className='pb-3'>
          <Skeleton className='w-1/4 h-4' />
        </CardFooter>
      </Card>
    </div>
  );
}
