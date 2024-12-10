export interface Order {
  id: string;
  customerName: string;
  items: { drinkName: string; quantity: number; price: number }[];
  status?: 'Pending' | 'Cancelled' | 'Completed';
  totalPrice: number;  // Add required total cost
  customerNote?: string;     // Optional notes field
  orderDate?: Date;   // Add order date
}

