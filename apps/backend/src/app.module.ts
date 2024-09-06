import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [UserModule, FoodModule, CartModule, OrderModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
