import PayPage from '@/components/pay/PayPage';
import { getCartItems } from '../../utils/fetch';
export const dynamic = 'force-dynamic';

export default async function Pay() {
  const cartItems = await getCartItems();
  if (!cartItems) return null;

  return <PayPage cartItems={cartItems} />;
}
