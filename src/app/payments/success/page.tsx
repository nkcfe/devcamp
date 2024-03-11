export default async function Page({ searchParams }: any) {
  const secretKey = process.env.TOSS_SECRET_KEY;
  const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString('base64');

  const payments = await fetch(
    `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`,
    {
      headers: {
        Authorization: `Basic ${basicToken}`,
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => res.json());

  const { card } = payments;
  return (
    <div className="mt-20">
      <h1>결제가 완료되었습니다</h1>
      <ul>
        <li>결제 상품 {payments.orderName}</li>
        <li>주문번호 {payments.orderId} </li>
        <li>카드회사 {card.company}</li>
        <li>카드번호 {card.number}</li>
        <li>결제금액 {card.amount}</li>
        <li>
          결제승인날짜{' '}
          {Intl.DateTimeFormat().format(new Date(payments.approvedAt))}
        </li>
      </ul>
    </div>
  );
}
