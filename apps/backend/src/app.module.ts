import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RemoveUnusedFiles } from './utils/RemoveUnusedFiles';
import { UserService } from './user/user.service';
import { RestaurantService } from './restaurant/restaurant.service';
import { FoodService } from './food/food.service';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    FoodModule,
    CartModule,
    OrderModule,
    RestaurantModule,
    PaymentModule,
    PrismaModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, RemoveUnusedFiles, UserService, FoodService, RestaurantService],
})
export class AppModule {}
