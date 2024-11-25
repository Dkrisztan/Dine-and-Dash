import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrderModule } from '../order/order.module';
import { OrderService } from '../order/order.service';

@Module({
  imports: [OrderModule],
  controllers: [PaymentController],
  providers: [PaymentService, OrderService],
})
export class PaymentModule {}
