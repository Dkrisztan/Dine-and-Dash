import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { UserService } from '../user/user.service';
import { FoodService } from '../food/food.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UTApi } from 'uploadthing/server';

@Injectable()
export class RemoveUnusedFiles {
  constructor(
    private readonly userService: UserService,
    private readonly foodService: FoodService,
    private readonly restaurantService: RestaurantService
  ) {}

  @Interval(60000 * 60 * 12)
  async handleInterval() {
    const utapi = new UTApi();

    const things = await utapi.listFiles();
    const keys = new Set(things.files.map((thing) => thing.key));
    const uploadthingImages = new Set();
    for (const key of keys) {
      uploadthingImages.add(`https://utfs.io/f/${key}`);
    }

    const userImageIds = await this.userService.findAll();
    const restaurantImageIds = await this.restaurantService.findAll();
    const foodImageIds = await this.foodService.findAll();

    const usedImageIds = new Set();
    userImageIds.forEach((user) => {
      usedImageIds.add(user.image);
    });
    restaurantImageIds.forEach((restaurant) => {
      usedImageIds.add(restaurant.image);
    });
    foodImageIds.forEach((food) => {
      usedImageIds.add(food.image);
    });

    const unusedImages = Array.from(uploadthingImages).filter((image): image is string => !usedImageIds.has(image));
    const deletedImages = await utapi.deleteFiles(unusedImages.map((image) => image.split('/f/').pop()));

    if (deletedImages.deletedCount > 0) Logger.debug(`Deleted images: ${deletedImages}`);
  }
}
