import PayPage from '@/components/pay/PayPage';
import { getCartItems } from '../utils/fetch';

export default async function Pay() {
  const cartItems = await getCartItems();
  if (!cartItems) return null;

  return <PayPage cartItems={cartItems} />;
}
