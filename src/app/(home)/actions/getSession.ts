import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';

export default async function getSession() {
  return await getServerSession(authOptions);
}
