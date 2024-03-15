import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { format } from 'date-fns';
import { Button } from '../../ui/button';
import Link from 'next/link';

interface OrderDetailPageProps {
  orderId: string;
  createdAt: Date;
  receiptUrl: string | null;
}

const Summary = (props: OrderDetailPageProps) => {
  const { orderId, createdAt, receiptUrl } = props;
  return (
    <Card className="rounded-none">
      <CardContent className="flex justify-between p-4">
        <div className="flex flex-col justify-center">
          <div className="font-semibold"># {orderId}</div>
          <div>{format(new Date(createdAt), 'yyyy-MM-dd')}</div>
        </div>
        <Link href={receiptUrl!!}>
          <Button variant="outline">영수증 조회</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Summary;
