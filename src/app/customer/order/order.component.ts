import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../shared/models/order.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private _snackBar = inject(MatSnackBar);
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

    this.showMessageBox('Order submitted successfully');
    this.orderService.submitOrder(order).subscribe(() => {
      localStorage.removeItem('cart');
      this.router.navigate(['/']);
    });
  }


  backToMenu(): void {
    this.router.navigate(['/']);
  }

  showMessageBox(message: string): void {
    this._snackBar.open(message, '', { duration: 1 * 1000 });
  }
}
