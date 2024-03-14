import OrderPage from '@/components/order/OrderPage';
import { getOrderItems } from '@/utils/fetch';

export default async function Page() {
  const orders = await getOrderItems();
  
  if (!orders) return null;

  return <OrderPage orders={orders} />;
}
