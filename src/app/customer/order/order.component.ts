import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockOrderService } from '../../shared/services/mock-order.service';
import { MOCK_ORDERS } from '../../shared/mock-order';
import { Order } from '../../shared/models/order.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  cart: { drinkName: string; quantity: number; price: number }[] = [];
  totalCost = 0;
  customerName = '';
  constructor(private orderService: MockOrderService, private router: Router) {}
  ngOnInit(): void {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
      this.calculateTotalCost();
    }
  }

  calculateTotalCost(): void {
    this.totalCost = this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  submitOrder(): void {
    if (!this.customerName) {
      alert('Please enter your name.');
      return;
    }

    const order: Order = {
      id: '', // Mock service will generate ID
      customerName: this.customerName,
      items: this.cart,
      status: 'Pending',
    };

    this.orderService.addOrder(order);
    localStorage.removeItem('cart'); // Clear cart after submission
    alert('Order submitted successfully!');
    this.router.navigate(['/']); // Navigate back to the menu
  }

  backToMenu(): void {
    this.router.navigate(['/']);
  }
}
