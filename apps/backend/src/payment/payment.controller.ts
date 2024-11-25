import { BadRequestException, Controller, Param, Post, RawBodyRequest, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { OrderService } from '../order/order.service';
import { ApiTags } from '@nestjs/swagger';
import { PaymentStatus } from '../types/dtos/payment-status.dto';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService
  ) {}

  @Post('intent/:id')
  async createPaymentIntent(@Param('id') id: string): Promise<{ clientSecret: string }> {
    const order = await this.orderService.getOrderById(id);
    if (order.paymentStatus === PaymentStatus.PAID) throw new BadRequestException('Order already paid');
    return this.paymentService.createIntent(order);
  }

  @Post('webhook')
  async handleWebhook(@Req() req: RawBodyRequest<Request>): Promise<void> {
    return this.paymentService.handleWebhook(req, req.rawBody);
  }
}
