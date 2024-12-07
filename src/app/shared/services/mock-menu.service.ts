import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Drink } from '../models/drink-model.interface';
import { MOCK_MENU } from '../mock-menu';

@Injectable({
  providedIn: 'root',
})
export class MockMenuService {
  private menu = new BehaviorSubject<Drink[]>(MOCK_MENU);

  private drinks: Drink[] = [

    { id: '1', name: 'Latte', description: 'A delicious latte', price: 3.5 },

    { id: '2', name: 'Espresso', description: 'Strong and bold', price: 2.5 },

  ];

  getDrinks(): Observable<Drink[]> {
    return this.menu.asObservable();
  }

  addDrink(drink: Drink): Promise<void> {
    return new Promise((resolve) => {
        const currentMenu = this.menu.getValue();
        const id = (currentMenu.length + 1).toString();
        this.menu.next([...currentMenu, { ...drink, id }]);
        resolve();
    });
  }

  updateDrink(updatedDrink: Drink): Promise<void> {
    return new Promise((resolve) => {
        const currentMenu = this.menu.getValue();
        const menu = currentMenu.map((drink) =>
            drink.id === updatedDrink.id ? updatedDrink : drink
        );
        this.menu.next(menu);
        resolve();
    });
  }

  deleteDrink(id: string): void {
    const currentMenu = this.menu.getValue();
    this.menu.next(currentMenu.filter((drink) => drink.id !== id));
  }

  updateMenu(updatedMenu: Drink[]): Promise<void> {

    this.drinks = updatedMenu;

    return Promise.resolve();

  }
}
