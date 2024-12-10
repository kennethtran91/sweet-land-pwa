import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
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
  customerNote = '';
  constructor(private orderService: OrderService, private router: Router) {}
  
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

  submitOrder() {
    const order: Order = {
      id: '',
      items: this.cart,
      customerName: this.customerName,
      status: 'Pending',
      totalPrice: this.totalCost,
      customerNote: this.customerNote || ''
    };

    console.log(order);
    alert('Order submitted successfully');
    this.orderService.submitOrder(order).subscribe(() => {
      localStorage.removeItem('cart');
      this.router.navigate(['/']);
    });
  }


  backToMenu(): void {
    this.router.navigate(['/']);
  }
}
