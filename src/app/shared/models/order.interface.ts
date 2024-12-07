export interface Order {
  id: string;
  customerName: string;
  items: { drinkName: string; quantity: number; price: number }[];
  status: 'Pending' | 'Preparing' | 'Completed';
}

