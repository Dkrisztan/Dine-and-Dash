import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import Stripe from 'stripe';
import { OrderDto } from '../types/dtos/order.dto';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK } from '../utils/configurations';

@Injectable()
export class PaymentService {
  constructor(private readonly orderService: OrderService) {}

  private stripe = new Stripe(STRIPE_SECRET_KEY, { typescript: true, apiVersion: '2024-11-20.acacia' });

  async createIntent(order: OrderDto): Promise<{ clientSecret: string }> {
    const amount = await this.orderService.getOrderById(order.id).then((o) => o.total);
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'huf',
      payment_method_types: ['card'],
      metadata: { orderId: order.id },
    });
    return { clientSecret: paymentIntent.client_secret };
  }

  async handleWebhook(req: Request, body: any): Promise<void> {
    const sig = req.headers['stripe-signature'];
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK);
    } catch (e) {
      throw new BadRequestException();
    }
    switch (event.type) {
      case 'charge.succeeded':
        const succeededOrderId = event.data.object.metadata.orderId;
        await this.orderService.updateOrderStatus(succeededOrderId, 'PAID');
        break;
      case 'charge.failed':
        const failedOrderId = event.data.object.metadata.orderId;
        await this.orderService.updateOrderStatus(failedOrderId, 'FAILED');
        break;
    }
    return;
  }
}
