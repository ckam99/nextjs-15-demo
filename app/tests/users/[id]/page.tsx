

import { getUser } from '@/lib/test/users/actions/user-fetch-actions';
import { notFound } from 'next/navigation';

interface UserPageProps {
  params: {
    id: string; 
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = params;

  if (isNaN(Number(id)) || Number(id) < 1 || Number(id) > 10) {
      // Use Next.js's notFound utility for a 404 page
      notFound();
  }

  try {
    const user = await getUser(id);

    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h1>User Profile: {user.name}</h1>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
        
        <h2>Address</h2>
        <p>
          {user.address.street}, {user.address.suite}<br />
          {user.address.city}, {user.address.zipcode}
        </p>

        <h2>Company</h2>
        <p><strong>Name:</strong> {user.company.name}</p>
        <p><strong>Catchphrase:</strong> *"{user.company.catchPhrase}"*</p>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound(); 
  }
}