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

  return <div></div>;
}
