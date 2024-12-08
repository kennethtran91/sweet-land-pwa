import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MockMenuService } from '../../shared/services/mock-menu.service';
import { Drink } from '../../shared/models/drink-model.interface';
interface CartItem {
  drink: Drink;
  quantity: number;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  drinks: Drink[] = [];
  cart: CartItem[] = [];
  constructor(private menuService: MockMenuService, private router: Router) {}

  ngOnInit(): void {
    this.menuService.getDrinks().subscribe((menu) => {
      this.drinks = menu;
    });
  }

  addToCart(drink: Drink): void {
    const existingItem = this.cart.find((item) => item.drink.id === drink.id);
  
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ drink, quantity: 1 });
    }
  
    // Store cart data in localStorage
    const cartData = this.cart.map((item) => ({
      drinkName: item.drink.name,
      quantity: item.quantity,
      price: item.drink.price,
    }));
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  get totalCost(): number {
    return this.cart.reduce((total, item) => total + item.drink.price * item.quantity, 0);
  }

clearCart() {
    this.cart = [];
}

decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        this.cart = this.cart.filter(cartItem => cartItem !== item);
    }
}

proceedToOrder(): void {
  this.router.navigate(['/order']);
}

}
