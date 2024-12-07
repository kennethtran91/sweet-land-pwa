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
    const currentOrders = this.orders.getValue();
    const id = (currentOrders.length + 1).toString();
    this.orders.next([...currentOrders, { ...order, id }]);
  }

  updateOrderStatus(id: string, status: 'Pending' | 'Preparing' | 'Completed'): void {
    const currentOrders = this.orders.getValue();
    const updatedOrders = currentOrders.map((order) =>
      order.id === id ? { ...order, status } : order
    );
    this.orders.next(updatedOrders);
  }
}
