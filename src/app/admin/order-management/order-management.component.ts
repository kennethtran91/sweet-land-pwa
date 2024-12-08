import { Component, OnInit } from '@angular/core';
import { MockOrderService } from '../../shared/services/mock-order.service';
import { Order } from '../../shared/models/order.interface';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: MockOrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  updateOrderStatus(orderId: string, status: 'Pending' | 'Preparing' | 'Completed'): void {
    this.orderService.updateOrderStatus(orderId, status);
  }

  calculateTotal(order: any): number {

    return order.items.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0);

  }
}
