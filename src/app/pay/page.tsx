import PayPage from '@/components/pay/PayPage';
import { getCartItems } from '../utils/fetch';
import { authOptions } from '../utils/authOptions';
import { getServerSession } from 'next-auth';

export default async function Pay() {
  const cartItems = await getCartItems();
  if (!cartItems) return null;

  return <PayPage cartItems={cartItems} />;
}
