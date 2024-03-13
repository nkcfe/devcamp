import { getCategories, getProducts } from '../../utils/fetch';
import Homepage from './Homepage';
import getCurrentUser from './actions/getUser';

export default async function Home() {
  const user = await getCurrentUser();
  const products = await getProducts();
  const categories = await getCategories();

  return <Homepage user={user} products={products} categories={categories} />;
}
