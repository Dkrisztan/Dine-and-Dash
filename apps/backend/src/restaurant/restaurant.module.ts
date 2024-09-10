import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { AdminRestaurantController } from './admin-restaurant.controller';

@Module({
  controllers: [RestaurantController, AdminRestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
