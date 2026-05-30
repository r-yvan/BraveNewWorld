export interface Product {
  code: number;
  name: string;
  productType: string;
  price: number;
  inDate: string;
  image: string;
  availableQuantity: number;
}

export interface Customer {
  firstname: string;
  phone: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  firstname: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PurchaseReport {
  no: number;
  customerName: string;
  date: string;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
