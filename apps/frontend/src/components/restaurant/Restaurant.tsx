import Image from 'next/image';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { RestaurantDtoTagsEnum, UserDto } from '@/api';
import CustomUploadButton from '@/components/custom-upload-button/CustomUploadButton';
import Spinner from '@/components/Spinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FancyMultiSelect, RestaurantTag } from '@/components/ui/fancy-multi-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Ratings from '@/components/ui/ratings';
import { useCreateRestaurant } from '@/hooks/user/useCreateRestaurant';

export default function Restaurant({ user }: { user: UserDto }) {
  const [open, setOpen] = useState(false);
  const createRestaurant = useCreateRestaurant();
  const restaurant = user.ownerOf;
  const rating = restaurant?.rating && restaurant?.rating.length > 0 ? restaurant.rating.reduce((a, b) => a + b, 0) / restaurant.rating.length : 0;

  // Add form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    addresses: '',
    tags: [
      {
        value: Object.values(RestaurantDtoTagsEnum)[0],
        label: Object.values(RestaurantDtoTagsEnum)[0].charAt(0).toUpperCase() + Object.values(RestaurantDtoTagsEnum)[0].slice(1).toLowerCase(),
      },
    ],
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (newTags: { value: RestaurantTag; label: string }[]) => {
    setFormData((prev) => ({
      ...prev,
      tags: newTags,
    }));
  };

  const handleSubmit = async () => {
    await createRestaurant.trigger({
      name: formData.name,
      description: formData.description,
      addresses: [formData.addresses],
      tags: formData.tags.map((tag) => tag.value),
      image: formData.image,
    });
  };

  return (
    <div className='flex flex-col items-center justify-center gap-8'>
      {restaurant ? (
        <div className='container mx-auto py-3'>
          <Card>
            <CardHeader className='p-0 mb-2'>
              <Image src={restaurant.image} width={400} height={400} alt='Picture of a restaurant' className='rounded-t-xl w-full h-auto object-cover aspect-video' />
            </CardHeader>
            <CardContent>
              <CardTitle className='text-2xl font-semibold'>{restaurant.name}</CardTitle>
              <p className='text-gray-500 dark:text-gray-400'>{restaurant.description}</p>
              <div className='flex items-center gap-2 flex-wrap pt-2'>
                {restaurant.tags.map((tag, index) => (
                  <Badge key={index} variant={'secondary'}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className='pb-3'>
              <Ratings value={rating} size={15} variant='yellow' />
            </CardFooter>
          </Card>
        </div>
      ) : (
        <>
          <span className='text-2xl font-bold'>You don&apos;t have a restaurant yet.</span>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant='outline' className='w-1/2 gap-2'>
                <FaPlus />
                Create Restaurant
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Create a restaurant</DialogTitle>
                <DialogDescription>Make sure to fill every field.</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Name
                  </Label>
                  <Input id='name' name='name' value={formData.name} onChange={handleInputChange} className='col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='description' className='text-right'>
                    Description
                  </Label>
                  <Input id='description' name='description' value={formData.description} onChange={handleInputChange} className='col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='addresses' className='text-right'>
                    Addresses
                  </Label>
                  <Input id='addresses' name='addresses' value={formData.addresses} onChange={handleInputChange} className='col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='tags' className='text-right'>
                    Tags
                  </Label>
                  <div className='col-span-3'>
                    <FancyMultiSelect selected={formData.tags} onSelectedChange={handleTagsChange} />
                  </div>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='image' className='text-right'>
                    Image
                  </Label>
                  <CustomUploadButton
                    onComplete={(url: string) => {
                      setFormData((prevProfile) => ({
                        ...prevProfile,
                        image: url,
                      }));
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type='submit' onClick={handleSubmit}>
                  {createRestaurant.isMutating ? <Spinner /> : 'Save changes'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
