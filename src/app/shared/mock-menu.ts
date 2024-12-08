import { Drink } from './models/drink-model.interface';

export const MOCK_MENU: Drink[] = [
  { id: '1', name: 'Espresso', description: 'Strong black coffee', price: 3.0, image: 'https://dummyimage.com/300x150/000/fff&text=drink' },
  { id: '2', name: 'Cappuccino', description: 'Espresso with steamed milk', price: 4.0, image: 'https://dummyimage.com/300x150/000/fff&text=drink' },
  { id: '3', name: 'Latte', description: 'Espresso with lots of milk', price: 4.5, image: 'https://dummyimage.com/300x150/000/fff&text=drink' },
  { id: '4', name: 'Mocha', description: 'Chocolate-flavored coffee', price: 5.0, image: 'https://dummyimage.com/300x150/000/fff&text=drink' },
];
