import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.interface';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
  export class OrderService {
    private apiUrl = `${environment.apiUrl}/orders`;
    private ordersSubject = new BehaviorSubject<Order[]>([]);
    orders$ = this.ordersSubject.asObservable();

    constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
    }

    submitOrder(order: Order): Observable<void> {
        return this.http.post<void>(this.apiUrl, order);
    }
    updateOrderStatus(orderId: string, status: 'Pending' | 'Cancelled' | 'Completed'): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/${orderId}`, { status })
        .pipe(
          tap(() => {
            // Update local state after successful API call
            const currentOrders = this.ordersSubject.getValue();
            const updatedOrders = currentOrders.map(order => 
              order.id === orderId 
                ? { ...order, status } 
                : order
            );
            this.ordersSubject.next(updatedOrders);
          }),
          catchError((error) => {
            console.error('Error updating order status:', error);
            return throwError(() => error);
          })
        );
    }

    deleteOrder(orderId: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${orderId}`).pipe(
        tap(() => {
          // Remove order from local state
          const currentOrders = this.ordersSubject.getValue();
          const updatedOrders = currentOrders.filter(order => order.id !== orderId);
          this.ordersSubject.next(updatedOrders);
        }),
        catchError((error) => {
          console.error('Error deleting order:', error);
          return throwError(() => error);
        })
      );
    }
  }

