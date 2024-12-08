import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.interface';
import { MOCK_ORDERS } from '../mock-order';

@Injectable({
  providedIn: 'root',
})
export class MockOrderService {
  private orders = new BehaviorSubject<Order[]>(MOCK_ORDERS);

  getOrders(): Observable<Order[]> {
    return this.orders.asObservable();
  }

  addOrder(order: Order): void {
    order.id = this.generateId(); // Simulate database ID
    const currentOrders = this.orders.getValue();
    currentOrders.push(order);
    this.orders.next(currentOrders);
  }

  updateOrderStatus(orderId: string, status: 'Pending' | 'Preparing' | 'Completed'): void {
    const currentOrders = this.orders.getValue();
    const order = currentOrders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      this.orders.next(currentOrders);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
