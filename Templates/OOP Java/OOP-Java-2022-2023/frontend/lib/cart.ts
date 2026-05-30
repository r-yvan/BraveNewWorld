import api from './api';
import { CartItem } from '@/types';

export const checkout = async (items: CartItem[]) => {
  const checkoutData = {
    items: items.map(item => ({
      productCode: item.product.code,
      quantity: item.quantity
    }))
  };
  const response = await api.post('/purchases/checkout', checkoutData);
  return response.data;
};
