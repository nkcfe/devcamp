import Homepage from './Homepage';
import getCurrentUser from './actions/getUser';

export default async function Home() {
  const user = await getCurrentUser();
  return <Homepage user={user} />;
}
