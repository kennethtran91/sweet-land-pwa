import { Component, OnInit } from '@angular/core';
// import { MockOrderService } from '../../shared/services/mock-order.service';
import { Order } from '../../shared/models/order.interface';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders.map(order => ({
        ...order,
        // Parse items if they're coming as string
        items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
      }));
      this.filteredOrders = this.orders;
    });
  }

  updateOrderStatus(orderId: string, status: 'Pending' | 'Cancelled' | 'Completed'): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        console.log('Status updated successfully');
      },
      error: (error) => {
        console.error('Error updating status:', error);
        // Revert status on error
        const order = this.filteredOrders.find(o => o.id === orderId);
        if (order) {
          order.status = order.status; // Reset to previous value
        }
      }
    });
  }

  applyFilter(filterValue: string): void {
    const lowerCaseFilter = filterValue.toLowerCase();
    this.filteredOrders = this.orders.filter(order =>
      order.customerName.toLowerCase().includes(lowerCaseFilter) ||
      order.id.toString().includes(lowerCaseFilter) || // Convert ID to string, remove toLowerCase
      order.items.some(item => item.drinkName.toLowerCase().includes(lowerCaseFilter))
    );
  }

  calculateTotal(order: any): number {

    return order.items.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0);

  }
}
