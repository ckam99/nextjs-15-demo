import { useFetchUserQuery } from "@/features/users/hooks/data/use-user-hook";


export default async function BlogPostPage({params}: {
  params: Promise<{ userId: string }>;
}) {
    
  const { userId } = await params;
  
  const {data: user} = useFetchUserQuery(userId);

  return (
    <div>
      <h1>{user?.email}</h1>
      <p>{user?.phone}</p>
    </div>
  );
}