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
  filteredOrders: Order[] = [];

  constructor(private mockOrderService: MockOrderService) {}

  ngOnInit(): void {
    this.mockOrderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      this.filteredOrders = orders;
    });
  }

  updateOrderStatus(orderId: string, status: 'Pending' | 'Preparing' | 'Completed'): void {
    this.mockOrderService.updateOrderStatus(orderId, status);
  }

  applyFilter(filterValue: string): void {
    const lowerCaseFilter = filterValue.toLowerCase();
    this.filteredOrders = this.orders.filter(order =>
      order.customerName.toLowerCase().includes(lowerCaseFilter) ||
      order.id.toLowerCase().includes(lowerCaseFilter) ||
      order.items.some(item => item.drinkName.toLowerCase().includes(lowerCaseFilter))
    );
  }

  calculateTotal(order: any): number {

    return order.items.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0);

  }
}
