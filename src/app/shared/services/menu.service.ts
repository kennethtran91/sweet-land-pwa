import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Drink } from '../models/drink-model.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuCollection = this.firestore.collection<Drink>('menu');

  constructor(private firestore: AngularFirestore) {}

  getDrinks(): Observable<Drink[]> {
    return this.menuCollection.valueChanges({ idField: 'id' });
  }

  addDrink(drink: Drink): Promise<void> {
    const id = this.firestore.createId();
    return this.menuCollection.doc(id).set({ ...drink, id });
  }

  updateDrink(drink: Drink): Promise<void> {
    return this.menuCollection.doc(drink.id).update(drink);
  }

  deleteDrink(id: string): Promise<void> {
    return this.menuCollection.doc(id).delete();
  }
}
