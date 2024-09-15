import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { AdminFoodController } from './admin-food.controller';

@Module({
  controllers: [FoodController, AdminFoodController],
  providers: [FoodService],
})
export class FoodModule {}
