import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Drink } from '../models/drink-model.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = `${environment.apiUrl}/drinks`;
  private menuCollection = this.firestore.collection<Drink>('menu');
  drinks: Drink[] = [];
  constructor(private firestore: AngularFirestore, private http: HttpClient) { }

  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.apiUrl);
  }

  addDrink(drink: Drink): Observable<void> {
    return this.http.post<void>(this.apiUrl, drink);
  }

  // Update an existing drink
  updateDrink(drink: Drink): Observable<void> {
    if (!drink.id) {
      throw new Error('Drink ID is required to update a drink');
    }
    return this.http.put<void>(`${this.apiUrl}/${drink.id}`, drink);
  }

  // Delete a drink
  deleteDrink(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateMenu(updatedMenu: Drink[]): Promise<void> {

    this.drinks = updatedMenu;

    return Promise.resolve();

  }
}
