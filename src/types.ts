export interface PizzaPrices {
  S: number;
  M: number;
  L: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number | PizzaPrices; // Flat number or PizzaPrices object
  image: string;
  popular?: boolean;
}

export interface CartItem {
  cartId: string; // Unique id for cart entry (e.g., item_id + size + extra)
  menuItem: MenuItem;
  selectedSize?: 'S' | 'M' | 'L';
  selectedPrice: number;
  quantity: number;
  notes?: string;
  addExtraMeatCheese?: boolean;
  addExtraToppings?: boolean;
}

export interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
