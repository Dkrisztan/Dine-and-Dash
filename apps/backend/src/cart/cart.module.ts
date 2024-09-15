import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { AdminCartController } from './admin-cart.controller';

@Module({
  controllers: [CartController, AdminCartController],
  providers: [CartService],
})
export class CartModule {}
