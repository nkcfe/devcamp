import { getProduct } from '@/app/utils/fetch';
import prisma from '@/db';
import { notFound } from 'next/navigation';
import DetailPage from '../../../components/detail/DetailPage';

interface ProcuctProps {
  params: { id: string };
}

export const generateStaticParams = async () => {
  const response = await prisma.product.findMany({
    select: {
      id: true,
    },
  });
  return response.map(({ id }) => ({ params: { id: id.toString() } }));
};

export default async function Product({ params }: ProcuctProps) {
  const product = await getProduct(params.id);
  if (!product) return notFound();
  return <DetailPage {...product} />;
}
