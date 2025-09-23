
export default function Authayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-teal-600">
      <div className="bg-white p-8 rounded shadow-md">{children}</div>
    </div>
  );
}
