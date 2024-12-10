import { Component, OnInit, inject } from '@angular/core';
import { Order } from '../../shared/models/order.interface';
import { OrderService } from '../../shared/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  private _snackBar = inject(MatSnackBar);
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
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
        this.showMessageBox('Status updated successfully');
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

  deleteOrder(orderId: string) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.showMessageBox('Order deleted successfully');
          this.loadOrders();
        },
        error: (error) => console.error('Error deleting order:', error)
      });
    }
  }

  showMessageBox(message: string): void {
    this._snackBar.open(message, '', { duration: 1 * 1000 });
  }
}
