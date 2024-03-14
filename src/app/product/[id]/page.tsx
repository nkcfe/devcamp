import { getProduct } from '@/utils/fetch';
import prisma from '@/db';
import { notFound } from 'next/navigation';
import DetailPage from '../../../components/detail/DetailPage';
export const dynamic = 'force-dynamic';

interface ProductProps {
  params: { id: string };
}

export const generateStaticParams = async () => {
  const response = await prisma.product.findMany({
    select: {
      productId: true,
    },
  });
  return response.map(({ productId }) => ({
    params: { id: productId.toString() },
  }));
};

export default async function Product({ params }: ProductProps) {
  const product = await getProduct(params.id);
  if (!product) return notFound();
  return <DetailPage product={product} />;
}
