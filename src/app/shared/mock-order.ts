import { Order } from './models/order.interface';

export const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    customerName: 'John Doe',
    items: [
      { drinkName: 'Espresso', quantity: 2, price: 6.0 },
      { drinkName: 'Latte', quantity: 1, price: 4.5 },
    ],
    status: 'Pending',
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    items: [
      { drinkName: 'Cappuccino', quantity: 3, price: 12.0 },
    ],
    status: 'Preparing',
  },
];