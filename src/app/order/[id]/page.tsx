import OrderDetailPage from '@/components/order/detail';
import { getOrderItem } from '@/utils/fetch';
import React from 'react';

export default async function page({ params }: { params: { id: string } }) {
  const order = await getOrderItem(params.id);
  if (!order) return null;

  return <OrderDetailPage order={order} />;
}
